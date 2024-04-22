"use client";
import { TokenType } from "@/utils/types";
import { TokenState, zustandStore } from "@/utils/zustandStore";

export default function ChooseToken() {
  const [token, setToken] = zustandStore((state: TokenState) => [
    state.token,
    state.setToken,
  ]);

  return (
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
      {token && <p>Selected Token: {token}</p>}
    </div>
  );
}
