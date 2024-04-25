import { CdpInfoFormatted } from "@/utils/types";
import Link from "next/link";

export default function CdpInfoList({
  cdpInfoArray,
}: {
  cdpInfoArray: CdpInfoFormatted[];
}) {
  return (
    <div className="flex flex-col">
      {cdpInfoArray.map((cdpInfo) => (
        <Link href={"/" + cdpInfo.id} key={cdpInfo.id}>
          ID : {cdpInfo.id} | COLLATERAL : {Number(cdpInfo.collateral)}{" "}
          {cdpInfo.ilk} | DEBT : {Number(cdpInfo.debt)} DAI
        </Link>
      ))}
    </div>
  );
}
