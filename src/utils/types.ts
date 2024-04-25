import { Address, Bytes } from "web3";

export type TokenType = "ETH" | "WBTC" | "WSTETH";

export type CdpResponse = {
  urn: Address;
  owner: Address;
  userAddr: Address;
  ilk: Bytes;
  collateral: BigInt;
  debt: BigInt;
};

export type CdpInfoFormatted = {
  id: number;
  urn: Address;
  owner: Address;
  userAddr: Address;
  ilk: TokenType;
  collateral: number;
  debt: number;
};

export type IlksResponse = {
  Art: BigInt;
  dust: BigInt;
  line: BigInt;
  rate: BigInt;
  spot: BigInt;
};

export type TokenStore = {
  token: TokenType;
  setToken: (to: TokenType) => void;
};

export type CdpInfoStore = {
  cdpInfoArray: CdpResponse[];
  setCdpInfoArray: (cdpInfoArray: CdpResponse[]) => void;
};
