import { TokenType } from "./types";

export const TOKENS: TokenType[] = ["ETH-A", "WBTC-A", "WSTETH-A"];
export const DECIMAL_PLACES = 4;

export const VAULT_ADDRESS = "0x68C61AF097b834c68eA6EA5e46aF6c04E8945B2d";
export const RATE_CONTRACT_ADDRESS =
  "0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B";

export const ETH_PRICE = 3131;
export const ETH_LIQUIDATION_RATIO = 145;

export const BTC_PRICE = 64357;
export const BTC_LIQUIDATION_RATIO = 145;

export const WSTETH_PRICE = 2139;
// Minimal ratio 150% ->  https://maker.defiexplore.com/cdp/31039
export const WSTETH_LIQUIDATION_RATIO = 150;

export const USDC_PRICE = 1;
export const USDC_LIQUIDATION_RATIO = 101;
