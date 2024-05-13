import { bytesToString } from "@defisaver/tokens/esm/utils";
import { CdpInfoFormatted, CdpResponse, IlksResponse } from "./types";
import { Contract } from "web3";
import { rateContractAbi } from "./abi";
import {
  DECIMAL_PLACES,
  btcLiquidationRatio,
  btcPrice,
  ethLiquidationRatio,
  ethPrice,
  rateContractAddress,
  usdcLiquidationRatio,
  usdcPrice,
  wstethLiquidationRatio,
  wstethPrice,
} from "./consts";

export async function formatCdpInfo(id: number, cdpInfo: CdpResponse) {
  try {
    const rateContract: Contract<typeof rateContractAbi> =
      new window.web3.eth.Contract(rateContractAbi, rateContractAddress);
    const newCollateral = Number(cdpInfo.collateral) / 1e18;
    const debtRate: IlksResponse = await rateContract.methods
      .ilks(cdpInfo.ilk)
      .call();
    // 1e18 -> 18 decimals for debt, 1e27 -> 27 decimals for debt rate
    const newDebt =
      (Number(cdpInfo.debt) * Number(debtRate.rate)) / 1e18 / 1e27;
    // Transforming bytes into ETH/WBTC/WSTETH string
    const newIlk = bytesToString(cdpInfo.ilk);

    const formattedCdpInfo: CdpInfoFormatted = {
      ...cdpInfo,
      id,
      debt: newDebt,
      ilk: newIlk,
      collateral: newCollateral,
    };

    return formattedCdpInfo;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export function collateralizationRatio(cdpInfo: CdpInfoFormatted) {
  if (cdpInfo.debt <= 0) return 0;
  return (
    (cdpInfo.collateral * getPrice(cdpInfo.ilk) * 100) /
    cdpInfo.debt
  ).toFixed(DECIMAL_PLACES);
}

export function getPrice(token: string) {
  return token === "ETH-A"
    ? ethPrice
    : token === "WBTC-A"
    ? btcPrice
    : token === "WSTETH-A"
    ? wstethPrice
    : usdcPrice;
}

export function getLiquidationRatio(token: string) {
  return token === "ETH-A"
    ? ethLiquidationRatio
    : token === "WBTC-A"
    ? btcLiquidationRatio
    : token === "WSTETH-A"
    ? wstethLiquidationRatio
    : usdcLiquidationRatio;
}

export function maxCollateralValueToExtractInUSD(cdpInfo: CdpInfoFormatted) {
  const totalValue = cdpInfo.collateral * getPrice(cdpInfo.ilk);
  const minimumValue = (cdpInfo.debt * getLiquidationRatio(cdpInfo.ilk)) / 100;
  return totalValue - minimumValue;
}

export function maxCollateralValueToExtract(cdpInfo: CdpInfoFormatted) {
  const totalValue = cdpInfo.collateral;
  const minimumValue =
    (cdpInfo.debt * getLiquidationRatio(cdpInfo.ilk)) /
    100 /
    getPrice(cdpInfo.ilk);
  return totalValue - minimumValue;
}

export function maxDebtPossibleWIthoutLiquidation(cdpInfo: CdpInfoFormatted) {
  return (
    ((cdpInfo.collateral * getPrice(cdpInfo.ilk)) /
      getLiquidationRatio(cdpInfo.ilk)) *
    100
  );
}
