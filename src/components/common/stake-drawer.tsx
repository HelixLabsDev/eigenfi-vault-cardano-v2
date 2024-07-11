import React, { useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Loader2, X } from "lucide-react";

export default function StakeDrawer({
  withdraw,
  showDrawer,
  setShowDrawer,
  isPending,
  amount,
  setAmount,
  withdrawERC20,
  depositERC20,
  data,
  message,
  setMessage,
}: {
  withdraw: boolean | null;
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  amount: number | null;
  setAmount: React.Dispatch<React.SetStateAction<number | null>>;
  withdrawERC20: () => void;
  depositERC20: () => void;
  data: {
    protocol: string;
    deposit: string;
    asset: string;
    balance: string;
    other: string;
  };
  message: {
    desc: string;
    type: string;
    title?: string;
  } | null;
  setMessage: React.Dispatch<
    React.SetStateAction<{ desc: string; type: string; title?: string } | null>
  >;
}) {
  return (
    <Drawer
      open={showDrawer}
      onOpenChange={(e) => {
        setShowDrawer(e);
        e && setMessage(null);
      }}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {withdraw ? "Withdraw" : "Transaction Overview"}
            </DrawerTitle>
            <DrawerDescription>
              {withdraw ? (
                <>
                  When you withdraw all of your{" "}
                  {
                    <span className="font-bold text-foreground">
                      {data.protocol}
                    </span>
                  }{" "}
                  ,Helix Points earning will stop.
                </>
              ) : (
                `You can draw anytime you want.`
              )}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 flex gap-2 flex-col">
            <div className="flex items-center gap-4">
              <Input
                placeholder=""
                type="number"
                disabled={isPending}
                className="w-full"
                value={amount?.toString() || ""}
                onChange={(e) => {
                  e.target.value === ""
                    ? setAmount(null)
                    : setAmount(Number(e.target.value));
                }}
              />
              <div>{data.asset}</div>
            </div>
            {message?.type === "error" && (
              <div className="text-sm text-destructive">{message?.desc}</div>
            )}

            {message?.type === "success" && (
              <>
                {message?.title && (
                  <div className="text-base text-success">{message?.title}</div>
                )}
                <div className="text-sm text-success">{message?.desc}</div>
              </>
            )}
          </div>
          <DrawerFooter>
            <Button
              disabled={
                isPending || (!isPending && message?.type === "success")
              }
              onClick={() => {
                if (amount === null || amount === 0) {
                  setMessage({ desc: "Please enter an amount", type: "error" });
                } else {
                  setMessage(null);
                  withdraw ? withdrawERC20() : depositERC20();
                }
              }}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {!isPending && message?.type === "success" && (
                <Check className="mr-2 h-4 w-4 animate-pulse" />
              )}
              {withdraw ? "Withdraw" : "Deposit"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
