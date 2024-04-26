"use client";

import { initWeb3 } from "@/utils/web3";
import { useEffect } from "react";
import ChooseToken from "../components/choose-token";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between p-4 border-b-2 border-b-primary">
        <h1 className="text-center text-5xl font-semibold">
          <span className="text-primary">Decenter Challenge</span> - Milos
          Djurica
        </h1>
        <ModeToggle />
      </div>
      <ChooseToken />
    </div>
  );
}
