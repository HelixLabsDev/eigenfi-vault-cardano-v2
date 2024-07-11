"use client";
import SideBarContent from "@/components/layout/sidebar-content";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
// import { useAccount } from "wagmi";
// import { getMockTokenContract } from "@/contracts/MockTokenContractHelper";
// import { format18 } from "@/contracts/helpers";
// import genAddresses from "../../contracts/addresses.json";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  // const { address } = useAccount();

  const [balance, setBalance] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const { mockTokenReadContract } = await getMockTokenContract();
  //     const amount = await mockTokenReadContract?.balanceOf(
  //       genAddresses.eigenFiPool
  //     );
  //     setBalance(format18(amount));
  //   };
  //   fetch();
  // }, [address]);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="px-12 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold">EigenFi</h3>
              <SideBarContent setOpen={setOpen} />
            </div>
            <div className="flex flex-col gap-4 col-span-1 py-12">
              <div className=" min-w-[115px]">
                <p className="text-sm text-muted-foreground">Total Staked</p>

                <div className="text-sm text-foreground flex items-center gap-2">
                  <span className="text-textPrimary">tADA -</span>
                  {balance ? balance : <Skeleton className="h-4 w-12" />}
                </div>
              </div>
              <div className="">
                <p className="text-sm text-muted-foreground">
                  Stakers are earning
                </p>
                <p className="text-sm">
                  Staking APR + Restaking APR + LRT points + Helix Points
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
