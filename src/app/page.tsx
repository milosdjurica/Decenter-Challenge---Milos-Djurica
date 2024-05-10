"use client";

import { initWeb3 } from "@/utils/web3";
import { useEffect } from "react";
import MainPage from "../components/main-page";

export default function Home() {
  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <div className="pt-10">
      <MainPage />
    </div>
  );
}
