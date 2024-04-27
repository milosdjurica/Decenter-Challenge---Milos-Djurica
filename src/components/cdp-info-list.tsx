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
import { DECIMAL_PLACES } from "@/utils/consts";

export default function CdpInfoList({
  cdpInfoArray,
  token,
}: {
  cdpInfoArray: CdpInfoFormatted[];
  token: TokenType;
}) {
  return (
    <div className="flex flex-col">
      <Table className="md:w-[90%] m-auto border-2 md:text-lg border-primary">
        <TableCaption>
          A list of 20 CDPs closest to the selected ID that have same collateral
          type - {token}.
        </TableCaption>

        <TableHeader>
          <TableRow className="border-b-primary">
            <TableHead className="w-1/5">CDP ID</TableHead>
            <TableHead className="w-2/5">Collateral in {token}</TableHead>
            <TableHead className="w-2/5">Debt in DAI</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cdpInfoArray.map((cdpInfo) => (
            <Link href={"/" + cdpInfo.id} key={cdpInfo.id} legacyBehavior>
              <TableRow key={cdpInfo.id} className="hover:cursor-pointer">
                <TableCell className="font-medium text-primary">
                  {cdpInfo.id}
                </TableCell>
                <TableCell>
                  {Number(cdpInfo.collateral).toFixed(DECIMAL_PLACES)}
                </TableCell>
                <TableCell>
                  {Number(cdpInfo.debt).toFixed(DECIMAL_PLACES)} DAI
                </TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
