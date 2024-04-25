import { Address, Bytes } from "web3";

export type TokenType = "ETH" | "WBTC" | "WSTETH";

export type CdpResponse = {
  id: number;
  urn: Address;
  owner: Address;
  userAddr: Address;
  ilk: Bytes;
  collateral: BigInt;
  debt: BigInt | number;
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
