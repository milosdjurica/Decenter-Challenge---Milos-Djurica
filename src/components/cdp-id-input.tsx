import React from "react";
import { Input } from "./ui/input";
import { useRecoilState } from "recoil";
import { cdpIdState } from "@/utils/atoms";

export default function CdpIdInput() {
  const [cdpId, setCdpId] = useRecoilState(cdpIdState);

  return (
    <div className="flex items-center space-x-4 ">
      <label htmlFor="cdpId" className="text-nowrap">
        Insert CDP ID:
      </label>
      <Input
        id="cdpId"
        value={cdpId}
        onChange={(e) => setCdpId(Number(e.target.value))}
        className="w-[180px]"
      />
    </div>
  );
}
