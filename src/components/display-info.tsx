import { CdpInfoStore } from "@/utils/types";
import { cdpInfoArrayStore } from "@/utils/zustandStore";
import React from "react";

export default function DisplayInfo() {
  const [cdpInfoArray, setCdpInfoArray] = cdpInfoArrayStore(
    (state: CdpInfoStore) => [state.cdpInfoArray, state.setCdpInfoArray]
  );

  return (
    <>
      {cdpInfoArray && (
        <div>
          {cdpInfoArray.map((cdpInfo, index) => (
            <p key={index}>
              {Number(cdpInfo.collateral) / 1e18} {cdpInfo.ilk}
            </p>
          ))}
        </div>
      )}
    </>
  );
}
