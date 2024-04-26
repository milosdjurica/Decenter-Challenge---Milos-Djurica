"use client";

import { rateContractAbi } from "@/utils/abi/rate.abi";
import { vaultContractAbi } from "@/utils/abi/vault.abi";
import {
  btcLiquidationRatio,
  btcPrice,
  ethLiquidationRatio,
  ethPrice,
  rateContractAddress,
  usdcLiquidationRatio,
  usdcPrice,
  vaultAddress,
} from "@/utils/consts";
import {
  CdpInfoFormatted,
  CdpResponse,
  IlksResponse,
  TokenType,
} from "@/utils/types";
import React, { useEffect, useState } from "react";
import Web3, { Contract } from "web3";

export default function CdpPage({ params }: { params: { cdpId: number } }) {
  const [cdpInfo, setCdpInfo] = useState<CdpInfoFormatted>();

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    window.web3 = web3;
    fetchCDP();
  }, []);

  async function fetchCDP() {
    try {
      const vaultContract: Contract<typeof vaultContractAbi> =
        new window.web3.eth.Contract(vaultContractAbi, vaultAddress);
      let newCdpInfo: CdpResponse = await vaultContract.methods
        .getCdpInfo(params.cdpId)
        .call();
      const formattedCdpInfo = await formatCdpInfo(newCdpInfo);
      setCdpInfo(formattedCdpInfo);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async function formatCdpInfo(cdpInfo: CdpResponse) {
    try {
      const rateContract: Contract<typeof rateContractAbi> =
        new window.web3.eth.Contract(rateContractAbi, rateContractAddress);
      const newCollateral = Number(cdpInfo.collateral) / 1e18;
      const debtRate: IlksResponse = await rateContract.methods
        .ilks(cdpInfo.ilk)
        .call();
      const newDebt =
        (Number(cdpInfo.debt) * Number(debtRate.rate)) / 1e18 / 1e27;
      // Transforming bytes into ETH/WBTC/WSTETH string
      const newIlk = window.web3.utils
        .hexToAscii(cdpInfo.ilk) // "ETH-C\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000"
        .split("-")[0]; // "ETH"

      const formattedCdpInfo: CdpInfoFormatted = {
        ...cdpInfo,
        id: params.cdpId,
        debt: newDebt,
        ilk: newIlk,
        collateral: newCollateral,
      };

      return formattedCdpInfo;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  function collateralizationRatio(cdpInfo: CdpInfoFormatted) {
    return (
      (cdpInfo.collateral * getPrice(cdpInfo.ilk) * 100) /
      cdpInfo.debt
    ).toFixed(2);
  }

  function getPrice(token: TokenType) {
    return token === "ETH" ? ethPrice : token === "WBTC" ? btcPrice : usdcPrice;
  }

  function getLiquidationRatio(token: TokenType) {
    return token === "ETH"
      ? ethLiquidationRatio
      : token === "WBTC"
      ? btcLiquidationRatio
      : usdcLiquidationRatio;
  }

  function maxCollateralValueToExtract(cdpInfo: CdpInfoFormatted) {
    const totalValue = cdpInfo.collateral * getPrice(cdpInfo.ilk);
    const minimumValue =
      (cdpInfo.debt * getLiquidationRatio(cdpInfo.ilk)) / 100;
    return totalValue - minimumValue;
  }

  function maxDebtPossibleWIthoutLiquidation(cdpInfo: CdpInfoFormatted) {
    return (
      ((cdpInfo.collateral * getPrice(cdpInfo.ilk)) /
        getLiquidationRatio(cdpInfo.ilk)) *
      100
    );
  }

  return (
    <div>
      <h1>CDP PAGE {params.cdpId}</h1>
      {cdpInfo && (
        <>
          <div>
            ID : {cdpInfo?.id} | COLLATERAL : {Number(cdpInfo?.collateral)}{" "}
            {cdpInfo?.ilk} | DEBT : {Number(cdpInfo?.debt)} DAI
          </div>
          <p>
            Collateralization ratio : {collateralizationRatio(cdpInfo)}%.
            Minimum is {getLiquidationRatio(cdpInfo.ilk)}%
          </p>
          <p>
            Max collateral value to extract without getting liquidated :
            {maxCollateralValueToExtract(cdpInfo)}
          </p>
          <p>
            Max debt possible :{" "}
            {maxDebtPossibleWIthoutLiquidation(cdpInfo).toFixed(2)}. How much
            more can you take :{" "}
            {(
              maxDebtPossibleWIthoutLiquidation(cdpInfo) - cdpInfo.debt
            ).toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
}
