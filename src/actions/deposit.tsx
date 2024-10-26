import { mainLock } from "@/components/aiken/lock-assets";
// import { checkSignature, generateNonce } from "@meshsdk/core";
import { Dispatch, SetStateAction } from "react";

export async function depositERC20({
  amount,
  wallet,
  network,
  address,
  startTransition,
  toast,
  handleError,
  reFetchBalance,
  setOpenShow,
  setSuccess,
  setFailed,
  setHash,
}: {
  amount: number;
  wallet: any;
  network: number;
  address: string;
  startTransition: Dispatch<SetStateAction<boolean>>;
  handleError: any;
  toast: any;
  reFetchBalance: any;
  setOpenShow: Dispatch<SetStateAction<boolean>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<string>>;
  setHash: Dispatch<SetStateAction<string>>;
}) {
  if (amount === null) {
    return toast.error("Please enter an amount");
  }

  if (network === 1) {
    return toast.error("Please switch to the testnet network.");
  }

  // const userAddress = (await wallet.getRewardAddresses())[0];
  // const nonce = generateNonce("Sign to login in to Mesh:");
  // const signature = await wallet.signData(nonce, userAddress);
  // const result = checkSignature(nonce, signature);

  // if (!result) throw new Error("invalid signature");

  try {
    if (localStorage.getItem("walletprovider") === "nami") setOpenShow(true);
    setSuccess(false);
    setFailed("");
    setHash("");
    startTransition(true);
    const txHash = await mainLock(wallet, (amount * 1e6).toString());

    if (txHash) {
      const response = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            address: address.toString(),
            amount: Number(amount || 0),
            hash: txHash,
          },
        }),
      });

      if (response.ok) {
        toast.success(
          `tx submitted: https://cardanoscan.io/transaction/${txHash}`
        );

        reFetchBalance();
        startTransition(false);
        setSuccess(true);
        setHash(txHash);
      }
    }
  } catch (err: any) {
    handleError(err);
    setFailed(
      err.reason || err.data?.message || err.message || "An error occurred"
    );
    startTransition(false);
  }
}
