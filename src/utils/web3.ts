import Web3 from "web3";

export function initWeb3() {
  if (window.ethereum) {
    try {
      const web3 = new Web3(window.ethereum);
      window.web3 = web3;
    } catch (error) {
      console.log("error -> \n", error);
      throw error;
    }
  } else {
    alert("Please download metamask");
  }
}
