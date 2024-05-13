"use client";

import React, { useEffect, useState } from "react";
import Web3, { Contract } from "web3";
import { Button } from "@/components/ui/button";
import { VAULT_CONTRACT_ABI } from "@/utils/abi/vault.abi";
import { DECIMAL_PLACES, VAULT_ADDRESS } from "@/utils/consts";
import {
  collateralizationRatio,
  formatCdpInfo,
  getLiquidationRatio,
  maxCollateralValueToExtract,
  maxCollateralValueToExtractInUSD,
  maxDebtPossibleWithoutLiquidation,
} from "@/utils/helper-functions";
import { CdpInfoFormatted, CdpResponse } from "@/utils/types";

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
      const vaultContract: Contract<typeof VAULT_CONTRACT_ABI> =
        new window.web3.eth.Contract(VAULT_CONTRACT_ABI, VAULT_ADDRESS);
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
            <span className="font-bold">
              {Number(cdpInfo.collateral).toFixed(DECIMAL_PLACES)}{" "}
              {cdpInfo?.ilk}
            </span>
          </p>

          <p>
            DEBT:{" "}
            <span className="font-bold">
              {Number(cdpInfo.debt).toFixed(DECIMAL_PLACES)} DAI
            </span>
          </p>
          <p>
            Collateralization ratio:{" "}
            <span className="font-bold">
              {collateralizationRatio(cdpInfo)}%
            </span>
            .
          </p>
          <p>
            Minimum ratio is:{" "}
            <span className="font-bold">
              {getLiquidationRatio(cdpInfo.ilk)}%.
            </span>{" "}
          </p>
          <p>
            Max collateral value to extract without getting liquidated:{" "}
            <span className="font-bold">
              {maxCollateralValueToExtract(cdpInfo).toFixed(DECIMAL_PLACES)}{" "}
              {cdpInfo.ilk} ($
              {maxCollateralValueToExtractInUSD(cdpInfo).toFixed(
                DECIMAL_PLACES
              )}{" "}
              DAI).
            </span>
          </p>
          <p>
            Max debt possible:{" "}
            <span className="font-bold">
              {maxDebtPossibleWithoutLiquidation(cdpInfo).toFixed(
                DECIMAL_PLACES
              )}{" "}
              DAI.
            </span>
          </p>
          <p>
            How much more can you take:{" "}
            <span className="font-bold">
              {(
                maxDebtPossibleWithoutLiquidation(cdpInfo) - cdpInfo.debt
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
