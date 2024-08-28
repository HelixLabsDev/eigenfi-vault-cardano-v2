import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
// import Lottie from "lottie-react";
// import animation from "@/assets/lottie/check.json";
// import animation2 from "@/assets/lottie/warn.json";
// import animation3 from "@/assets/lottie/loading.json";
import Link from "next/link";
import { CircleCheckBig, CircleX, Loader } from "lucide-react";

export default function ConfirmDialog({
  open,
  setOpen,
  isPending,
  amount,
  hash,
  success,
  failed,
  withdraw,
  history,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
  amount: number;
  hash: string;
  success: boolean;
  failed: string;
  withdraw: boolean;
  history?: number;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="py-6">
          <DialogTitle className="mx-auto ">
            {success ? (
              // <Lottie
              //   animationData={animation && animation}
              //   loop={false}
              //   style={{
              //     width: "92px",
              //     height: "92px",
              //   }}
              // />
              <div>
                <CircleCheckBig className="w-12 h-12 text-green-600" />
              </div>
            ) : failed.length > 0 ? (
              // <Lottie
              //   animationData={animation2 && animation2}
              //   loop={false}
              //   style={{
              //     width: "104px",
              //     height: "104px",
              //   }}
              // />
              <div>
                <CircleX className="w-12 h-12 text-destructive" />
              </div>
            ) : (
              // <Lottie
              //   animationData={animation3 && animation3}
              //   loop={true}
              //   style={{
              //     width: "104px",
              //     height: "104px",
              //   }}
              // />
              <div>
                <Loader className="animate-spin w-12 h-12" />
              </div>
            )}
          </DialogTitle>
          <DialogDescription className="text-center text-sm">
            {withdraw ? (
              success ? (
                <div>
                  <p className="font-bold text-base text-foreground mt-3.5">
                    Withdrawal request successfully sent
                  </p>
                  <p className="text-foreground/70 mt-1 font-thin">
                    Withdrawal request for {history} MTK has been sent.
                  </p>
                  <div className="text-foreground/70 font-thin">
                    View your transaction on
                    <Link
                      href={`https://cardanoscan.io/transaction/${hash}`}
                      target="_blank"
                      className="text-aquamarine-300 ps-1 font-light"
                    >
                      Cardanoscan
                    </Link>
                  </div>
                </div>
              ) : failed.length > 0 ? (
                <div>
                  <p className="font-bold text-base text-foreground mt-3.5">
                    Transaction Failed
                  </p>
                  <p className="text-foreground/70 mt-1 font-thin">{failed}</p>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-base text-foreground mt-3.5">
                    You are requesting withdrawal for {history} MTK.
                  </p>
                  <p className="text-foreground/70 mt-1 font-thin">
                    Requesting withdrawal for {history} Mock Token.
                  </p>
                </div>
              )
            ) : success ? (
              <div>
                <p className="font-bold text-base text-foreground mt-3.5">
                  Your new balance is {amount} MTK +
                </p>
                <p className="text-foreground/70 mt-1 font-thin">
                  Staking operation was successful.
                </p>
                <div className="text-foreground/70 font-thin">
                  Transaction can be viewed on
                  <Link
                    href={`https://cardanoscan.io/transaction/${hash}`}
                    target="_blank"
                    className="text-aquamarine-300 ps-1 font-light"
                  >
                    Cardanoscan
                  </Link>
                </div>
              </div>
            ) : failed.length > 0 ? (
              <div>
                <p className="font-bold text-base text-foreground mt-3.5">
                  Transaction Failed
                </p>
                <p className="text-foreground/70 mt-1 font-thin">{failed}</p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-base text-foreground mt-3.5">
                  You are staking {amount} MTK.
                </p>
                <p className="text-foreground/70 mt-1 font-thin">
                  You can withdraw anytime you want.
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        {isPending && (
          <p className="text-foreground/60 text-xs text-center">
            Confirm this transaction in your wallet
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
