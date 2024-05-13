"use client";
import { useEffect } from "react";
import { Contract } from "web3";
import { useRecoilState } from "recoil";
import { cdpIdState, cdpInfoArrayState, tokenState } from "@/utils/atoms";
import { MAX_CDP_ARRAY_LENGTH, VAULT_ADDRESS } from "@/utils/consts";
import { VAULT_CONTRACT_ABI } from "@/utils/abi";
import { CdpInfoFormatted, CdpResponse } from "@/utils/types";
import { formatCdpInfo } from "@/utils/helper-functions";
import CdpInfoList from "./cdp-info-list";
import ChooseToken from "./choose-token";
import CdpIdInput from "./cdp-id-input";

export default function MainPage() {
  const [cdpInfoArray, setCdpInfoArray] = useRecoilState(cdpInfoArrayState);
  const [token] = useRecoilState(tokenState);
  const [cdpId] = useRecoilState(cdpIdState);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (
        cdpInfoArray.length > 0 &&
        cdpInfoArray.length < MAX_CDP_ARRAY_LENGTH
      ) {
        alert("Already loading data! Try again when loading is finished!");
      } else if (cdpId > 0) {
        setCdpInfoArray([]);
        fetchAll();
      }
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [cdpId, token]);

  async function fetchAll() {
    let arr: CdpInfoFormatted[] = [];
    let counter = 1;
    const first = await fetchCDP(cdpId);
    if (first) arr.push(first);
    while (arr.length < MAX_CDP_ARRAY_LENGTH) {
      const foundHigher = await fetchCDP(cdpId + counter);
      if (foundHigher) arr.push(foundHigher);
      if (arr.length === MAX_CDP_ARRAY_LENGTH) break;

      if (cdpId - counter > 0) {
        const foundLower = await fetchCDP(cdpId - counter);
        if (foundLower) arr.push(foundLower);
      }
      counter++;
    }
  }

  async function fetchCDP(id: number) {
    try {
      const vaultContract: Contract<typeof VAULT_CONTRACT_ABI> =
        new window.web3.eth.Contract(VAULT_CONTRACT_ABI, VAULT_ADDRESS);
      let newCdpInfo: CdpResponse = await vaultContract.methods
        .getCdpInfo(id)
        .call();
      const formattedCdpInfo = await formatCdpInfo(id, newCdpInfo);
      if (formattedCdpInfo.ilk === token) {
        setCdpInfoArray((prev: CdpInfoFormatted[]) => [
          ...prev,
          formattedCdpInfo,
        ]);
        return formattedCdpInfo;
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return (
    <div className="flex flex-col space-y-6 text-xl p-4">
      <div className="flex flex-col md:flex-row justify-evenly space-y-6 md:space-y-0">
        <ChooseToken />
        <CdpIdInput />
      </div>
      <CdpInfoList />
    </div>
  );
}
