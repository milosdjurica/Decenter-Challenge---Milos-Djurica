import { Address } from "web3";

export type TokenType = "ETH-A" | "WBTC-A" | "WSTETH-A";

export type CdpResponse = {
  urn: Address;
  owner: Address;
  userAddr: Address;
  ilk: string;
  collateral: BigInt;
  debt: BigInt;
};

export type CdpInfoFormatted = {
  id: number;
  urn: Address;
  owner: Address;
  userAddr: Address;
  ilk: string;
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
