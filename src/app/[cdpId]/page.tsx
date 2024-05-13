"use client";

import { Button } from "@/components/ui/button";
import { vaultContractAbi } from "@/utils/abi/vault.abi";
import { DECIMAL_PLACES, vaultAddress } from "@/utils/consts";
import {
  collateralizationRatio,
  formatCdpInfo,
  getLiquidationRatio,
  maxCollateralValueToExtract,
  maxCollateralValueToExtractInUSD,
  maxDebtPossibleWIthoutLiquidation,
} from "@/utils/helper-functions";
import { CdpInfoFormatted, CdpResponse } from "@/utils/types";
import React, { useEffect, useState } from "react";
import Web3, { Contract } from "web3";

export default function CdpPage({ params }: { params: { cdpId: number } }) {
  const [cdpInfo, setCdpInfo] = useState<CdpInfoFormatted>();
  const [message, setMessage] = useState();

  useEffect(() => {
    try {
      const web3 = new Web3(window.ethereum);
      window.web3 = web3;
      fetchCDP();
    } catch (error) {
      console.log("error:", error);
    }
  }, []);

  async function fetchCDP() {
    try {
      const vaultContract: Contract<typeof vaultContractAbi> =
        new window.web3.eth.Contract(vaultContractAbi, vaultAddress);
      let newCdpInfo: CdpResponse = await vaultContract.methods
        .getCdpInfo(params.cdpId)
        .call();
      const formattedCdpInfo = await formatCdpInfo(params.cdpId, newCdpInfo);
      setCdpInfo(formattedCdpInfo);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async function signMessage() {
    try {
      const accounts = await window.web3.eth.requestAccounts();
      const signature = await window.web3.eth.personal.sign(
        "Ovo je moj CDP",
        accounts[0],
        ""
      );
      setMessage(signature);
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  }

  return (
    <div className="mt-4 text-xl space-y-6 m-auto flex flex-col items-center w-[90%] max-w-[90%]">
      <h1 className="text-4xl font-semibold">CDP ID - {params.cdpId}</h1>
      {cdpInfo && (
        <div className="space-y-4">
          <p>
            COLLATERAL:{" "}
            <span className="underline font-semibold">
              {Number(cdpInfo?.collateral).toFixed(DECIMAL_PLACES)}{" "}
              {cdpInfo?.ilk}
            </span>
          </p>

          <p>
            DEBT:{" "}
            <span className="underline font-semibold">
              {Number(cdpInfo?.debt).toFixed(DECIMAL_PLACES)} DAI
            </span>
          </p>
          <p>
            Collateralization ratio:{" "}
            <span className="underline font-semibold">
              {collateralizationRatio(cdpInfo)}%
            </span>
            .
          </p>
          <p>
            Minimum ratio is:{" "}
            <span className="underline font-semibold">
              {getLiquidationRatio(cdpInfo.ilk)}%.
            </span>{" "}
          </p>
          <p>
            Max collateral value to extract without getting liquidated:{" "}
            <span className="underline font-semibold">
              {maxCollateralValueToExtract(cdpInfo).toFixed(DECIMAL_PLACES)}{" "}
              {cdpInfo.ilk} ($
              {maxCollateralValueToExtractInUSD(cdpInfo).toFixed(
                DECIMAL_PLACES
              )}{" "}
              USD).
            </span>
          </p>
          <p>
            Max debt possible:{" "}
            <span className="underline font-semibold">
              {maxDebtPossibleWIthoutLiquidation(cdpInfo).toFixed(
                DECIMAL_PLACES
              )}{" "}
              DAI.
            </span>
          </p>
          <p>
            How much more can you take:{" "}
            <span className="underline font-semibold">
              {(
                maxDebtPossibleWIthoutLiquidation(cdpInfo) - cdpInfo.debt
              ).toFixed(DECIMAL_PLACES)}{" "}
              DAI.
            </span>
          </p>
        </div>
      )}
      <Button variant="default" onClick={signMessage}>
        Sign message!
      </Button>
      <h4>Signature: </h4>
      <p className="text-wrap">{message}</p>
    </div>
  );
}
