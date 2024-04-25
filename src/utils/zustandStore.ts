import { create } from "zustand";
import { CdpInfoStore, CdpResponse, TokenType } from "./types";

export type TokenStore = {
  token: TokenType;
  setToken: (to: TokenType) => void;
};

export const tokenStore = create<TokenStore>((set) => ({
  token: "ETH",
  setToken: (token: TokenType) => set(() => ({ token })),
}));

export const cdpInfoArrayStore = create<CdpInfoStore>((set) => ({
  cdpInfoArray: [],
  setCdpInfoArray: (cdpInfoArray: CdpResponse[]) =>
    set(() => ({ cdpInfoArray })),
}));
