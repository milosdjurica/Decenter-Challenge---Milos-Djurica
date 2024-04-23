import { Address, Bytes } from "web3";

export type TokenType = "ETH" | "WBTC" | "WSTETH";

export type CdpResponse = {
  id: number;
  urn: Address;
  owner: Address;
  userAddr: Address;
  ilk: Bytes;
  collateral: BigInt;
  debt: BigInt;
};

export type TokenStore = {
  token: TokenType;
  setToken: (to: TokenType) => void;
};

export type CdpInfoStore = {
  cdpInfoArray: CdpResponse[];
  setCdpInfoArray: (cdpInfoArray: CdpResponse[]) => void;
};
