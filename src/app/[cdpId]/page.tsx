"use client";

import { rateContractAbi } from "@/utils/abi/rate.abi";
import { vaultContractAbi } from "@/utils/abi/vault.abi";
import { rateContractAddress, vaultAddress } from "@/utils/consts";
import { CdpInfoFormatted, CdpResponse, IlksResponse } from "@/utils/types";
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

  return (
    <div>
      <h1>CDP PAGE {params.cdpId}</h1>
      {
        <div>
          ID : {cdpInfo?.id} | COLLATERAL : {Number(cdpInfo?.collateral)}{" "}
          {cdpInfo?.ilk} | DEBT : {Number(cdpInfo?.debt)} DAI
        </div>
      }
    </div>
  );
}
