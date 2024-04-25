"use client";

import { initWeb3 } from "@/utils/web3";
import { useEffect } from "react";
import ChooseToken from "../components/choose-token";

export default function Home() {
  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-center text-5xl font-semibold">
        Decenter Challenge - Milos Djurica
      </h1>
      <ChooseToken />
    </div>
  );
}
