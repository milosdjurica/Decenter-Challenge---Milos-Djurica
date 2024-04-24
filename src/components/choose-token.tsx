"use client";
import { useEffect, useState } from "react";

import { vaultAbi } from "@/utils/abi/vault.abi";
import { vaultAddress } from "@/utils/consts";
import { CdpResponse, TokenType } from "@/utils/types";

export default function ChooseToken() {
  const [cdpInfoArray, setCdpInfoArray] = useState<CdpResponse[]>([]);
  const [token, setToken] = useState<TokenType>("ETH");
  const [cdpId, setCdpId] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCdpInfoArray([]);
      if (cdpId > 0) {
        fetchAll();
      }
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [cdpId, token]);

  async function fetchAll() {
    let arr: CdpResponse[] = [];
    let counter = 1;
    const first = await fetchCDP(cdpId);
    if (first) arr.push(first);
    while (arr.length < 20) {
      const foundHigher = await fetchCDP(cdpId + counter);
      if (foundHigher) arr.push(foundHigher);
      if (arr.length === 20) break;

      const foundLower = await fetchCDP(cdpId - counter);
      if (foundLower) arr.push(foundLower);
      counter++;
    }
  }

  async function fetchCDP(id: number) {
    try {
      const vault = new window.web3.eth.Contract(vaultAbi, vaultAddress);
      let newCdpInfo: CdpResponse = await vault.methods.getCdpInfo(id).call();

      newCdpInfo.id = id;
      // Transforming bytes into ETH/WBTC/WSTETH string
      newCdpInfo.ilk = window.web3.utils
        .hexToAscii(newCdpInfo.ilk) // "ETH-C\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000"
        .split("-")[0]; // "ETH"

      if (newCdpInfo.ilk === token) {
        setCdpInfoArray((prev: CdpResponse[]) => [...prev, newCdpInfo]);
        return newCdpInfo;
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return (
    <div className="flex justify-evenly">
      <div>
        <label htmlFor="tokenSelect">Select Token:</label>
        <select
          id="tokenSelect"
          value={token}
          onChange={(e) => setToken(e.target.value as TokenType)}
        >
          <option value="ETH">ETH</option>
          <option value="WBTC">WBTC</option>
          <option value="WSTETH">WSTETH</option>
        </select>
        <p>Selected Token: {token}</p>
      </div>
      <div>
        <label htmlFor="cdpId">Insert CDP ID:</label>
        <input
          id="cdpId"
          value={cdpId}
          onChange={(e) => setCdpId(Number(e.target.value))}
        />
        <p>Selected CDP ID:{cdpId}</p>
        {cdpInfoArray && (
          <div>
            {cdpInfoArray.map((cdpInfo, index) => (
              <p key={index}>
                ID : {cdpInfo.id} | VALUE : {Number(cdpInfo.collateral) / 1e18}{" "}
                {cdpInfo.ilk}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
