import { mainUnlock } from "@/components/aiken/unlock-assets";
import { Dispatch, SetStateAction, TransitionStartFunction } from "react";

export const withdrawERC20 = async ({
  hash,
  address,
  wallet,
  startTransition,
  toast,
  handleError,
  reFetchBalance,
  setOpenShow,
  setSuccess,
  setFailed,
  setHash,
}: {
  hash: string;
  wallet: any;
  address: string;
  startTransition: Dispatch<SetStateAction<boolean>>;
  handleError: any;
  toast: any;
  reFetchBalance: any;
  setOpenShow: Dispatch<SetStateAction<boolean>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<string>>;
  setHash: Dispatch<SetStateAction<string>>;
}) => {
  try {
    if (localStorage.getItem("walletprovider") === "nami") setOpenShow(true);
    startTransition(true);
    setSuccess(false);
    setFailed("");
    setHash("");
    const txHash = await mainUnlock(wallet, hash);

    if (txHash) {
      const response = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            address: address.toString(),
            hash: hash,
          },
        }),
      });

      if (response.ok) {
        toast.success("Withdraw successful");

        reFetchBalance();
        startTransition(false);
        setSuccess(true);

        setHash(txHash);
      }
    } else {
      toast.error(
        `Withdraw failed. Please try again. If the problem persists, please contact us.`
      );
    }
  } catch (err) {
    setFailed("An error occurred");
    handleError(err);
    startTransition(false);
  }
};
