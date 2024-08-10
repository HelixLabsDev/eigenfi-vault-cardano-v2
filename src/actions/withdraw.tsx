import { unlockTx } from "@/offchain/unlockTx";
import { withdrawPoint } from "@/services/point";
import { Dispatch, SetStateAction, TransitionStartFunction } from "react";

export const withdrawERC20 = async ({
  address,
  history,
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
  wallet: any;
  history: number;
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
    startTransition(true);
    setOpenShow(true);
    setSuccess(false);
    setFailed("");
    setHash("");
    const txHash = await unlockTx(
      wallet,
      "preprodIZeSqbpsa1CttYKvzSvZTDiEM0Ar4h35"
    );

    await withdrawPoint({
      address: address.toString(),
      // amount: Number(amount),
    })
      .then((res) => {
        if (res.status === 201 || res.status === 200 || res.status === 204) {
          toast.success("Withdraw successful");

          reFetchBalance();
          startTransition(false);
          setSuccess(true);

          setHash(txHash);
        } else {
          toast.error(
            `Withdraw failed. Please try again. If the problem persists, please contact us.`
          );
        }
      })
      .catch((err) => {
        handleError(err);
        setFailed(
          err.reason || err.data?.message || err.message || "An error occurred"
        );
        startTransition(false);
      });
  } catch (err) {
    handleError(err);
    startTransition(false);
  }
};
