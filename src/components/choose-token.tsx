"use client";
import { vaultAbi } from "@/abi/vault.abi";
import { vaultAddress } from "@/utils/consts";
import { TokenType } from "@/utils/types";
import { TokenState, zustandStore } from "@/utils/zustandStore";
import { useState } from "react";

export default function ChooseToken() {
  const [token, setToken] = zustandStore((state: TokenState) => [
    state.token,
    state.setToken,
  ]);

  const [cdpId, setCdpId] = useState(0);

  async function fetchCDP() {
    console.log("FETCHING");

    const vault = new window.web3.eth.Contract(vaultAbi, vaultAddress);
    console.log(vault);
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
      <button onClick={() => fetchCDP()}>Fetch data!</button>
    </div>
  );
}
