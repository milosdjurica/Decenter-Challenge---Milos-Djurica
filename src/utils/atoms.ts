import { atom } from "recoil";
import { CdpInfoFormatted, TokenType } from "./types";

export const tokenState = atom<TokenType>({
  key: "tokenState",
  default: "ETH-A",
});

export const cdpIdState = atom({
  key: "cdpIdState",
  default: 0,
});

export const cdpInfoArrayState = atom<CdpInfoFormatted[]>({
  key: "cdpInfoArrayState",
  default: [],
});
