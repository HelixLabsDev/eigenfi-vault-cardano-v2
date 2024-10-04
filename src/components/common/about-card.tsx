"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";
import { totalFundBalance } from "@/services/point";
import { getAddress } from "@/services/web3";

export default function CardWithAbout({ refetch }: { refetch: boolean }) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddress();
      setAddress(address);
    };

    fetchAddress();
  }, []);
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      const res = await totalFundBalance();
      setBalance(res.totalBalance.toString());
    };
    fetch();
  }, [address, refetch]);

  return (
    <div className="flex flex-col gap-4 max-w-[500px] w-full">
      <Card className="max-w-[500px] w-full rounded-3xl">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-aquamarine-300 flex gap-2 justify-between">
            Total Staked Balance:{" "}
            {
              <div className="flex gap-0.5 text-[13px]">
                {balance.length > 0 ? (
                  formatNumber(Number(balance).toFixed(2))
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
