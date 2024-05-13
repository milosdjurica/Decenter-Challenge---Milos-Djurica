import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRecoilState } from "recoil";
import { tokenState } from "@/utils/atoms";
import { TokenType } from "@/utils/types";
import { tokens } from "@/utils/consts";

export default function ChooseToken() {
  const [token, setToken] = useRecoilState(tokenState);

  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="tokenSelect" className="text-nowrap">
        Select Token:
      </label>
      <Select onValueChange={(value) => setToken(value as TokenType)}>
        <SelectTrigger className="w-[180px]" id="tokenSelect">
          <SelectValue placeholder={token} />
        </SelectTrigger>

        <SelectContent defaultValue={token}>
          {tokens.map((tokenElement) => (
            <SelectItem key={tokenElement} value={tokenElement}>
              {tokenElement}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
