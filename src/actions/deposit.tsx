import { lockTx } from "@/offchain/lockTx";
import { createPoint } from "@/services/point";
import { Dispatch, SetStateAction } from "react";

export async function depositERC20({
  amount,
  wallet,
  totalBalance,
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
  totalBalance: number;
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
    return toast.error("Please switch to the preprod network.");
  }

  try {
    setOpenShow(true);
    setSuccess(false);
    setFailed("");
    setHash("");
    startTransition(true);
    const txHash = await lockTx(
      wallet,
      "preprodIZeSqbpsa1CttYKvzSvZTDiEM0Ar4h35",
      amount
    );

    const res = await createPoint({
      address: address.toString(),
      amount: Number(amount || 0),
      total_balance: Number(totalBalance || 0),
    });

    if ([200, 201, 204].includes(res.status)) {
      toast.success(
        `tx submitted: https://preprod.cardanoscan.io/transaction/${txHash}`
      );

      // Re-fetch balance
      reFetchBalance();
      startTransition(false);
      setSuccess(true);
      setHash(txHash);
    }
  } catch (err: any) {
    handleError(err);
    setFailed(
      err.reason || err.data?.message || err.message || "An error occurred"
    );
    startTransition(false);
  }
}
