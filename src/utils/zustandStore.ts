import { create } from "zustand";
import { TokenType } from "./types";

export type TokenState = {
  token: TokenType;
  setToken: (to: TokenType) => void;
};

export const zustandStore = create<TokenState>((set) => ({
  token: "ETH",
  setToken: (token: TokenType) => set(() => ({ token })),
}));
