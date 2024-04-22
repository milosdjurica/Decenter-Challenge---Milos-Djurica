"use client";

import { initWeb3 } from "@/utils/web3";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <div>
      <h1>Decenter Challenge - Milos Djurica</h1>
      <button
        onClick={async () => {
          console.log("window.web3", window.web3);
        }}
      >
        Click
      </button>
    </div>
  );
}

