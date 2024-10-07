import { mainUnlock } from "@/components/aiken/unlock-assets";
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
    const txHash = await mainUnlock(
      wallet,
      // "mainnetITSkqaZbvB2CosVg0f2DnwPrXn444X5f"
      "dcc28f5da6761b19f22582edd7dce693990d2e5cedf6136a5a3b3d4744026f45"
    );

    // if (res.status === 201 || res.status === 200 || res.status === 204) {
    if (txHash) {
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

    // await withdrawPoint({
    //   address: address.toString(),
    //   // amount: Number(amount),
    // })
    //   .then((res) => {
    //     if (res.status === 201 || res.status === 200 || res.status === 204) {
    //       toast.success("Withdraw successful");

    //       reFetchBalance();
    //       startTransition(false);
    //       setSuccess(true);

    //       setHash(txHash);
    //     } else {
    //       toast.error(
    //         `Withdraw failed. Please try again. If the problem persists, please contact us.`
    //       );
    //     }
    //   })
    //   .catch((err) => {
    //     handleError(err);
    //     setFailed(
    //       err.reason || err.data?.message || err.message || "An error occurred"
    //     );
    //     startTransition(false);
    //   });
  } catch (err) {
    setFailed("An error occurred");
    handleError(err);
    startTransition(false);
  }
};
