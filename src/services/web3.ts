// import { mainnet, sepolia } from "viem/chains";

import { BrowserWallet } from "@meshsdk/core";

export const getBalances = async ({ address }: { address: any }) => {
  // const balance = await getBalance(config, {
  //   address,
  //   chainId: sepolia.id,
  // });
  // return balance;
  return "010000";
};

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

export const getBalance = async () => {
  const iw = BrowserWallet?.getInstalledWallets();

  if (iw.length === 0) {
    return "No wallet installed";
  }
  const wallett = await BrowserWallet?.enable("nami");
  const balance = await wallett.getBalance();
  return balance;
};
