import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";
import { useStore } from "@/lib/store";

export default function CardWithAbout() {
  const { user } = useStore();
  const [withdrawBalance, setWithdrawBalance] = useState<number>(0);

  useEffect(() => {
    if (user?.utxo) {
      const arr: Array<number> = [];
      user?.utxo?.map((utx: { amount: number; hash: string }) => {
        arr.push(Number(utx?.amount));
      });

      let sum = arr.reduce((a, b) => a + b, 0);
      setWithdrawBalance(sum);
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-4 max-w-[500px] w-full">
      <Card className="max-w-[500px] w-full rounded-3xl">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-aquamarine-300 flex gap-2 justify-between">
            Total Staked Balance:{" "}
            {
              <div className="flex gap-0.5 text-[13px]">
                {withdrawBalance ? (
                  formatNumber(Number(withdrawBalance).toFixed(2))
                ) : withdrawBalance === 0 ? (
                  "0.00"
                ) : (
                  <Skeleton className="w-16 h-5 rounded-md" />
                )}
                <span>tADA</span>
              </div>
            }
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="max-w-[500px] w-full rounded-3xl">
        <CardHeader>
          <CardTitle className="text-sm text-foreground/60">
            Stakers are earning
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col ">
          <div className="bg-white/10 font-medium text-foreground/80 py-2 px-3 rounded-md flex items-center justify-center">
            Staking APR + Restaking APR + LRT points + Helix Points
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
