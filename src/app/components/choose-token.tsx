"use client";
import { useState } from "react";

export default function ChooseToken() {
  const [selectedToken, setSelectedToken] = useState("");

  const handleTokenChange = (e: any) => {
    setSelectedToken(e.target.value);
  };

  return (
    <div>
      <label htmlFor="tokenSelect">Select Token:</label>
      <select
        id="tokenSelect"
        value={selectedToken}
        onChange={(e) => setSelectedToken(e.target.value)}
      >
        <option value="">Select Token</option>
        <option value="ETH">ETH</option>
        <option value="WBTC">WBTC</option>
        <option value="WSTETH">WSTETH</option>
      </select>
      {selectedToken && <p>Selected Token: {selectedToken}</p>}
    </div>
  );
}
