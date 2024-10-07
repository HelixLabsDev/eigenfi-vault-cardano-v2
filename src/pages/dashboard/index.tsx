import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  calculatePoints,
  getPointsByAddress,
  getTotalStakedBalance,
} from "@/services/point";
import { getAddress, getBalance } from "@/lib/web3";
import { useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [points, setPoints] = useState<number>();
  const [twoMin, setTwoMin] = useState<boolean>(true);
  const [totalBalance, setTotalBalance] = useState<number | null>(null);

  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddress();
      setAddress(address);
    };

    connected && fetchAddress();
  }, [connected]);

  useEffect(() => {
    if (!address) {
      return;
    }
    const fetchTotalBalance = async () => {
      const amount = await getTotalStakedBalance({
        address: address.toString(),
      });
      amount?.points?.length
        ? setTotalBalance(amount.points[0].amount)
        : setTotalBalance(0);
    };
    fetchTotalBalance();
  }, [address]);

  useEffect(() => {
    const fetchPoints = async () => {
      if (!address) {
        return;
      }
      const pointData = await getPointsByAddress({
        address: address?.toString() ?? "",
      });

      if (
        pointData.points &&
        pointData.points.length > 0 &&
        pointData.points[0].point
      ) {
        setPoints(pointData.points[0].point);
      } else {
        setPoints(0);
      }
    };
    fetchPoints();
  }, [address, twoMin]);

  useEffect(() => {
    const fetchBalance = async () => {
      const balance: any = await getBalance();
      setBalance(balance[0].quantity);
    };
    fetchBalance();
  }, [address]);

  const intervalId = setInterval(min, 5000);

  function min() {
    setTwoMin(!twoMin);
    clearInterval(intervalId);
  }

  useEffect(() => {
    calculatePoints({ address: address?.toString() ?? "" });
  }, [address, twoMin]);

  function formatNumber(number: string) {
    return new Intl.NumberFormat("en-US").format(Number(number));
  }

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
            {totalBalance !== null && totalBalance >= 0 ? (
              <p className="text-md">
                {formatNumber(totalBalance.toFixed(2))} - tADA
              </p>
            ) : (
              <Skeleton className="h-6 w-32" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">Total Points</p>
            {points !== undefined && points >= 0 ? (
              <p className="text-md">
                {formatNumber(points.toFixed(2))} - points
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
