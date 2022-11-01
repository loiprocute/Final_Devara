import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined")
  web3 = new Web3(window.web3.currentProvider);

else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.etherscan.io/tx/0xd12a62539ecf3149566397efa09c5b2944b804ab9ffb291ae2310a1e4f52b970"
  );

  web3 = new Web3(provider);
}

export default web3;
