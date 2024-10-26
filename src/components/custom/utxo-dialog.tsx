import * as React from "react";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AmountSelectDialog({
  utxos,
  open,
  setOpen,
  setAmount,
  amount: InitialAmount,
  setUtxo,
}: {
  utxos: { hash: string; amount: number }[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAmount: React.Dispatch<React.SetStateAction<number | null>>;
  amount: number | null;
  setUtxo: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="pt-3">Withdraw Amount</DialogTitle>
        </DialogHeader>

        <div className="max-h-72 rounded-md py-0.5 overflow-y-scroll">
          <div className="flex flex-col gap-2">
            {utxos.length > 0 ? (
              utxos.map(
                (
                  { amount, hash }: { hash: string; amount: number },
                  id: number
                ) => {
                  return (
                    <div
                      key={id}
                      onClick={() => {
                        setAmount(amount);
                        setOpen(false);
                        setUtxo(hash);
                      }}
                      className="px-3 py-3 hover:bg-border/80 cursor-pointer border rounded-sm"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{amount} tADA </span>
                        {amount === InitialAmount && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <>Empty</>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
