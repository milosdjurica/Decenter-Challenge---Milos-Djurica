"use client";

import { initWeb3 } from "@/utils/web3";
import { useEffect } from "react";
import ChooseToken from "../components/choose-token";

export default function Home() {
  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <div className="pt-10">
      <ChooseToken />
    </div>
  );
}
