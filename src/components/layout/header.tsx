import React, { useEffect } from "react";
import MobileNav from "./mobile-nav";
import { ModeToggle } from "../common/theme-toggle";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import ConnectionHandler from "../connect-button";
import { totalFundBalance } from "@/services/point";
import { formatNumber } from "@/lib/utils";

export default function Header() {
  const [balance, setBalance] = React.useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await totalFundBalance();
      setBalance(res.totalBalance);
    };

    fetchBalance();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-6 container py-6 items-center">
      <div className="block md:hidden col-span-1">
        <MobileNav />
      </div>
      <div className="md:block hidden relative cursor-pointer items-center justify-center font-michroma">
        <Link href="/">
          <span className="text-xl font-bold">EigenFi</span>
          <span className="text-sm font-bold text-primary">cardano</span>
        </Link>
      </div>
      <div className="col-span-5 flex justify-end md:justify-between gap-6 w-full items-center">
        <div className="hidden md:block min-w-[115px]">
          <p className="text-sm text-muted-foreground/60">Total Staked</p>
          <div className="text-sm text-foreground flex items-center gap-2">
            <span className="text-textPrimary">tADA -</span>
            {balance !== null ? (
              formatNumber(balance.toString())
            ) : (
              <Skeleton className="h-4 w-12" />
            )}
          </div>
        </div>
        <div className="hidden md:block">
          <p className="text-sm text-muted-foreground/60">
            Stakers are earning
          </p>
          <p className="text-sm text-foreground">
            Staking APR + Restaking APR + LRT points + Helix Points
          </p>
        </div>
        <div className="items-center gap-4 flex">
          <ConnectionHandler />

          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
