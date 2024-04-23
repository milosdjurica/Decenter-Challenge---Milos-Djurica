"use client";
import { useEffect, useState } from "react";

import { vaultAbi } from "@/utils/abi/vault.abi";
import { vaultAddress } from "@/utils/consts";
import {
  CdpInfoStore,
  CdpResponse,
  TokenStore,
  TokenType,
} from "@/utils/types";
import { cdpInfoArrayStore, tokenStore } from "@/utils/zustandStore";

export default function ChooseToken() {
  const [token, setToken] = tokenStore((state: TokenStore) => [
    state.token,
    state.setToken,
  ]);

  const [cdpInfoArray, setCdpInfoArray] = cdpInfoArrayStore(
    (state: CdpInfoStore) => [state.cdpInfoArray, state.setCdpInfoArray]
  );

  const [cdpId, setCdpId] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchCDP();
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [cdpId, token]);

  // TODO call multiple times until gets 20 closest
  async function fetchCDP() {
    try {
      const vault = new window.web3.eth.Contract(vaultAbi, vaultAddress);
      let newCdpInfo: CdpResponse = await vault.methods
        .getCdpInfo(cdpId)
        .call();
      // Transforming bytes into ETH/WBTC/WSTETH string
      newCdpInfo.ilk = window.web3.utils
        .hexToAscii(newCdpInfo.ilk) // "ETH-C\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000"
        .split("-")[0]; // "ETH"

      if (newCdpInfo.ilk === token)
        setCdpInfoArray([...cdpInfoArray, newCdpInfo]);
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
      </div>
    </div>
  );
}
