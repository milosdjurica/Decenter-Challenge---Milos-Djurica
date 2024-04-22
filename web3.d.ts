import { MetaMaskProvider } from "web3";

declare global {
  interface Window {
    // TODO fix typings
    ethereum?: MetaMaskProvider;
    web3?: any;
  }
}
