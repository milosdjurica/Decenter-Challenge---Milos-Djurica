import { CdpInfoFormatted } from "@/utils/types";
import Link from "next/link";

export default function CdpInfoList({
  cdpInfoArray,
}: {
  cdpInfoArray: CdpInfoFormatted[];
}) {
  return (
    <div className="flex flex-col">
      {cdpInfoArray.map((cdpInfo, index) => (
        <Link href={"/" + cdpInfo.id} key={index}>
          ID : {cdpInfo.id} | COLLATERAL : {Number(cdpInfo.collateral)}{" "}
          {cdpInfo.ilk} | DEBT : {Number(cdpInfo.debt)} DAI
        </Link>
      ))}
    </div>
  );
}
