import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/lib/store";

import { getAddress, getBalance } from "@/lib/web3";
import { useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { connected } = useWallet();

  const { user, setUser } = useStore();

  const [balance, setBalance] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [withdrawBalance, setWithdrawBalance] = useState<number>(0);

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddress();
      setAddress(address);
    };

    connected && fetchAddress();
  }, [connected]);

  useEffect(() => {
    const fetchBalance = async () => {
      const balance: any = await getBalance();
      setBalance(balance[0].quantity);
    };
    fetchBalance();
  }, [address]);

  function formatNumber(number: string) {
    return new Intl.NumberFormat("en-US").format(Number(number));
  }

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddress();
      setAddress(address);
    };

    connected && fetchAddress();
  }, [connected]);

  useEffect(() => {
    const fetchUSer = async () => {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: address,
        }),
      });

      if (response.ok) {
        setUser((await response.json())?.data);
      }
    };
    address && fetchUSer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

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
    <div className="flex flex-col gap-24">
      {connected ? (
        <div className="flex flex-col gap-12">
          <div className="flex gap-4 ">
            <Avatar>
              <AvatarImage src={"https://github.com/shadcn.png"} alt="avatar" />
              <AvatarFallback>
                {address?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="w-full flex flex-col gap-1 justify-center text-sm">
              <p className="border w-16 text-center text-sm border-primary rounded-sm text-textPrimary">
                MAIN
              </p>
              <p className="font-bold">
                WELCOME !,
                <span className="ps-2">
                  {address?.slice(0, 4) + "..." + address?.slice(-4)}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">Total Wallet Value</p>
            {balance !== null && balance >= 0 ? (
              <p className="text-md">
                <span className="text-textPrimary">{balance / 1e6}</span> - tADA
              </p>
            ) : (
              <Skeleton className="h-6 w-32" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">Total Staked</p>
            {withdrawBalance !== null ? (
              <p className="text-md">
                {formatNumber(withdrawBalance.toFixed(2))} - tADA
              </p>
            ) : withdrawBalance === 0 ? (
              "0.00"
            ) : (
              <Skeleton className="h-6 w-32" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">Total Points</p>
            {user.points !== undefined ? (
              <p className="text-md">
                {formatNumber(user.points.toFixed(2))} - points
              </p>
            ) : (
              <Skeleton className="h-6 w-32" />
            )}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm text-muted-foreground">
            Connect your wallet to view your wallet value
          </p>
        </div>
      )}
    </div>
  );
}
