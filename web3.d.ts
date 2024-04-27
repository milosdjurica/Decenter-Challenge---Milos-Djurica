import { MetaMaskProvider } from "web3";

declare global {
  interface Window {
    ethereum?: MetaMaskProvider;
    web3?: any;
  }
}
