// import { mainnet, sepolia } from "viem/chains";

import { BrowserWallet } from "@meshsdk/core";

export const getAddress = async () => {
  const iw = BrowserWallet?.getInstalledWallets();

  const enabledWallet = localStorage.getItem("walletprovider") ?? "nami";

  if (iw.length === 0) {
    return "No wallet installed";
  }
  const wallett = await BrowserWallet?.enable(enabledWallet);
  const changeAddress = await wallett.getChangeAddress();

  return changeAddress;
};

export const getInstalled = async () => {
  const iw = BrowserWallet?.getInstalledWallets();
  return iw;
};

export const getAvailableWallets = async () => {
  const iw = BrowserWallet?.getAvailableWallets();
  return iw;
};

export const getBalance = async () => {
  const iw = BrowserWallet?.getInstalledWallets();

  if (iw.length === 0) {
    return "No wallet installed";
  }
  const enabledWallet = localStorage.getItem("walletprovider") ?? "nami";

  const wallett = await BrowserWallet?.enable(enabledWallet);
  const balance = await wallett.getBalance();

  return balance;
};
