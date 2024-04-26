import Link from "next/link";
import { CdpInfoFormatted, TokenType } from "@/utils/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CdpInfoList({
  cdpInfoArray,
  token,
}: {
  cdpInfoArray: CdpInfoFormatted[];
  token: TokenType;
}) {
  return (
    <div className="flex flex-col">
      <Table className="md:w-[90%] m-auto border md:text-lg border-ring">
        <TableCaption>
          A list of 20 CDPs closest to the selected ID that have same collateral
          type - {token}.
        </TableCaption>

        <TableHeader>
          <TableRow className="border-b-primary">
            <TableHead className="">CDP ID</TableHead>
            <TableHead>Collateral in {token}</TableHead>
            <TableHead>Debt in DAI</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cdpInfoArray.map((cdpInfo) => (
            <Link href={"/" + cdpInfo.id} key={cdpInfo.id} legacyBehavior>
              <TableRow key={cdpInfo.id} className="hover:cursor-pointer">
                <TableCell className="font-medium text-primary">
                  {cdpInfo.id}
                </TableCell>
                <TableCell>{Number(cdpInfo.collateral)}</TableCell>
                <TableCell>{Number(cdpInfo.debt)} DAI</TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
