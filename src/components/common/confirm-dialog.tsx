import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import LottiePlayer from "lottie-react";
import animation from "@/assets/lottie/check.json";
import animation2 from "@/assets/lottie/warn.json";
import animation3 from "@/assets/lottie/loading.json";
import Link from "next/link";

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
              <LottiePlayer
                animationData={animation}
                loop={false}
                style={{
                  width: "92px",
                  height: "92px",
                }}
              />
            ) : failed.length > 0 ? (
              <LottiePlayer
                animationData={animation2}
                loop={false}
                style={{
                  width: "104px",
                  height: "104px",
                }}
              />
            ) : (
              <LottiePlayer
                animationData={animation3}
                loop={true}
                style={{
                  width: "104px",
                  height: "104px",
                }}
              />
            )}
          </DialogTitle>
          <DialogDescription className="text-center text-sm">
            {withdraw ? (
              success ? (
                <div>
                  <h4 className="font-bold text-base text-foreground mt-3.5">
                    Withdrawal request successfully sent
                  </h4>
                  <p className="text-foreground/70 mt-1 font-thin">
                    Withdrawal request for {history} MTK has been sent.
                  </p>
                  <div className="text-foreground/70 font-thin">
                    View your transaction on
                    <Link
                      href={`https://preprod.cardanoscan.io/transaction/${hash}`}
                      target="_blank"
                      className="text-aquamarine-300 ps-1 font-light"
                    >
                      Cardanoscan
                    </Link>
                  </div>
                </div>
              ) : failed.length > 0 ? (
                <div>
                  <h4 className="font-bold text-base text-foreground mt-3.5">
                    Transaction Failed
                  </h4>
                  <p className="text-foreground/70 mt-1 font-thin">{failed}</p>
                </div>
              ) : (
                <div>
                  <h4 className="font-bold text-base text-foreground mt-3.5">
                    You are requesting withdrawal for {history} MTK.
                  </h4>
                  <p className="text-foreground/70 mt-1 font-thin">
                    Requesting withdrawal for {history} Mock Token.
                  </p>
                </div>
              )
            ) : success ? (
              <div>
                <h4 className="font-bold text-base text-foreground mt-3.5">
                  Your new balance is {amount} MTK +
                </h4>
                <p className="text-foreground/70 mt-1 font-thin">
                  Staking operation was successful.
                </p>
                <div className="text-foreground/70 font-thin">
                  Transaction can be viewed on
                  <Link
                    href={`https://preprod.cardanoscan.io/transaction/${hash}`}
                    target="_blank"
                    className="text-aquamarine-300 ps-1 font-light"
                  >
                    Cardanoscan
                  </Link>
                </div>
              </div>
            ) : failed.length > 0 ? (
              <div>
                <h4 className="font-bold text-base text-foreground mt-3.5">
                  Transaction Failed
                </h4>
                <p className="text-foreground/70 mt-1 font-thin">{failed}</p>
              </div>
            ) : (
              <div>
                <h4 className="font-bold text-base text-foreground mt-3.5">
                  You are staking {amount} MTK.
                </h4>
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
