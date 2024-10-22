// import { mainnet, sepolia } from "viem/chains";

import { BrowserWallet } from "@meshsdk/core";

export const getAddress = async () => {
  const iw = BrowserWallet?.getInstalledWallets();

  if (iw.length === 0) {
    return "No wallet installed";
  }
  const wallett = await BrowserWallet?.enable("nami");
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
  const wallett = await BrowserWallet?.enable("nami");

  console.log("wallett", wallett);
  const balance = await wallett.getBalance();
  console.log("balance", balance);

  return balance;
};

export const getBalanceWallet = async ({
  wallet,
}: {
  wallet: BrowserWallet;
}) => {
  const balance = await wallet.getBalance();
  console.log("balance", balance);

  return balance;
};
