import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import image from "@/assets/3d-assets/HoloStar4x.webp";

import { withdrawERC20 } from "@/actions/withdraw";
import { depositERC20 } from "@/actions/deposit";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { formatNumber } from "@/lib/utils";
import { calculatePoints, getPointsByAddress } from "@/services/point";
import { useNetwork, useWallet } from "@meshsdk/react";
import { getAddress, getBalance } from "@/services/web3";
import { getTotalStakedBalance } from "@/services/point";
import ConfirmDialog from "./confirm-dialog";
import ConnectionHandler from "../connect-button";

export function CardWithStack({ setRefetch }: { setRefetch: any }) {
  const { connected } = useWallet();
  const [address, setAddress] = useState("");

  const [withdraw, setWithdraw] = useState<boolean>(false);
  const [show, setOpenShow] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);
  const [failed, setFailed] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  const [balance, setBalance] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [isPending, startTransition] = useState(false);

  const [history, setHistory] = useState<number>(0);

  const { wallet } = useWallet();
  const network = useNetwork();

  const [totalBalance, setTotalBalance] = useState<number>(0);

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddress();
      setAddress(address);
    };

    fetchAddress();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const addressMy = await getAddress();
      if (!addressMy) return;
      const { points } = await getPointsByAddress({
        address: addressMy.toString(),
      });

      if (!points) return;
      setHistory(JSON.parse(points[0].history)[0]);
    };
    fetch();
  }, [address]);

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await getBalance();
      setTotalBalance(balance[0].quantity);
    };
    fetchBalance();
  }, [address]);

  useEffect(() => {
    const fetch = async () => {
      if (withdraw) {
        // EigenFiPool Staked Balance
        const amount = await getTotalStakedBalance({
          address: address.toString(),
        });
        amount?.points?.length
          ? setBalance(amount.points[0].amount)
          : setBalance("0");
      } else {
        setBalance((totalBalance / 1e6).toString());
      }
    };
    fetch();
  }, [address, amount, totalBalance, withdraw]);

  const max = async () => {
    setAmount(Number(balance));
  };

  const half = async () => {
    setAmount(Number(balance) / 2);
  };

  const quarter = async () => {
    setAmount(Number(balance) / 4);
  };

  const reFetchBalance = async () => {
    setRefetch(true);
    if (withdraw) {
      const amount = await getTotalStakedBalance({
        address: address.toString(),
      });
      amount?.points?.length
        ? setBalance(amount.points[0].amount)
        : setBalance("0");
    } else {
      // MockToken Balance
      const balance = await getBalance();
      setBalance((balance[0]?.quantity / 1e6).toString());
    }
  };

  const handleError = (err: any) => {
    const errorMessage =
      err.reason || err.data?.message || err.message || "An error occurred";
    toast.error(errorMessage);
  };

  useEffect(() => {
    calculatePoints({ address: address?.toString() || "" });
  }, [address]);

  return (
    <Card className="max-w-[500px] w-full rounded-3xl relative">
      <Image
        src={image}
        alt="bridge"
        width={1500}
        height={1500}
        priority
        className="-top-12 hidden md:block absolute -right-14 w-28 h-auto -hue-rotate-30 grayscale-[0.3]"
      />
      <CardHeader>
        <CardTitle className="text-sm">Stake</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Tabs
          defaultValue="stake"
          className="max-w-[500px] w-full"
          onValueChange={(e) => {
            if (e === "withdraw") {
              setBalance(null);
              setAmount(null);
              setWithdraw(true);
            } else {
              setBalance(null);
              setAmount(null);
              setWithdraw(false);
            }
          }}
        >
          <TabsList className="justify-between gap-4">
            <TabsTrigger value="stake">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
          <div className="mt-6 ">
            <TabsContent value="stake" className="w-full">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-3 w-full">
                  <div className="relative">
                    <div className="absolute top-2 left-3 text-sm text-muted-foreground/50">
                      Amount
                    </div>
                    <Input
                      id="pay"
                      placeholder="0"
                      disabled={isPending}
                      type="number"
                      value={amount?.toString() || ""}
                      typeof="number"
                      onChange={(e) => {
                        if (Number(e.target.value) <= 0) return setAmount(null);
                        if (Number(e.target.value) >= Number(balance))
                          return setAmount(Number(balance));
                        e.target.value === ""
                          ? setAmount(null)
                          : setAmount(Number(e.target.value));
                      }}
                      className="bg-white/5 border-0 focus-visible:ring-offset-0 focus-visible:ring-[0.2px] h-[120px] py-[40px] text-[32px] pe-[80px]"
                    />
                    <Select defaultValue="eth">
                      <SelectTrigger
                        id="framework"
                        className="absolute top-1/4 w-22 right-3"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="eth">tADA</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="absolute flex gap-1 bottom-3 left-3 text-sm text-muted-foreground">
                      {/* ${amount ? 3320.87 * amount : 0} */}
                      {balance ? (
                        formatNumber(Number(balance).toFixed(2))
                      ) : (
                        <Skeleton className="w-12 h-5 rounded-md" />
                      )}
                      {" MTK"}
                    </div>
                    <div className="absolute bottom-3 right-3 text-sm text-muted-foreground flex gap-2">
                      <Button size={"xs"} onClick={quarter}>
                        1/4
                      </Button>
                      <Button size={"xs"} onClick={half}>
                        1/2
                      </Button>
                      <Button size={"xs"} onClick={max}>
                        max
                      </Button>
                    </div>
                  </div>{" "}
                  {/* <div className="relative">
                    <div className="flex justify-center bg-black w-8 h-8 items-center rounded-sm absolute -top-5 left-[48%]">
                      <ArrowDown className="w-5 h-5 text-muted-foreground animate-pulse" />
                    </div>

                    <div className="absolute top-2 left-3 text-sm text-muted-foreground/50">
                      Recieve
                    </div>
                    <Input
                      id="pay"
                      placeholder="Earning Helix Points"
                      className="bg-white/5 border-0 focus-visible:ring-offset-0 focus-visible:ring-[0.2px] min-h-[100px] py-[40px] text-2xl md:text-[32px] pe-[90px]"
                      disabled
                    />
                    <Select defaultValue="mtk">
                      <SelectTrigger
                        id="mtk"
                        className="absolute top-1/3 w-22 right-3"
                        disabled
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="mtk">MTK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="withdraw" className="w-full">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-3 relative">
                  <div className="relative">
                    <div className="absolute top-2 left-3 text-sm text-muted-foreground/50">
                      Amount
                    </div>
                    <Input
                      id="pay"
                      placeholder="Your deposit queue"
                      type="number"
                      value={amount?.toString() || ""}
                      disabled
                      onChange={(e) => {
                        if (Number(e.target.value) <= 0) return setAmount(null);
                        if (Number(e.target.value) >= Number(balance))
                          return setAmount(Number(balance));
                        e.target.value === ""
                          ? setAmount(null)
                          : setAmount(Number(e.target.value));
                      }}
                      className="bg-white/5 border-0 focus-visible:ring-offset-0 focus-visible:ring-[0.2px] h-[120px] py-[40px] text-[32px] pe-[80px]"
                    />
                    <Select defaultValue="mtk">
                      <SelectTrigger
                        id="framework"
                        className="absolute top-1/4 w-22 right-3"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="mtk">MTK</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="absolute flex gap-1 bottom-3 left-3 text-sm text-muted-foreground">
                      {balance ? (
                        formatNumber(Number(balance).toFixed(2))
                      ) : (
                        <Skeleton className="w-12 h-5 rounded-md" />
                      )}
                      {" MTK"}
                    </div>
                    <div className="absolute bottom-3 right-3 text-sm text-muted-foreground flex gap-2">
                      <Button size={"xs"} onClick={quarter} disabled>
                        1/4
                      </Button>
                      <Button size={"xs"} onClick={half} disabled>
                        1/2
                      </Button>
                      <Button size={"xs"} onClick={max} disabled>
                        max
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          variant={"gradient"}
          size={"lg"}
          disabled={
            (connected && !withdraw && (amount === null || amount === 0)) ||
            isPending
          }
          className="w-full text-base"
          onClick={() =>
            connected
              ? withdraw
                ? history > 0 &&
                  withdrawERC20({
                    wallet,
                    history,
                    address: address || "",
                    startTransition,
                    handleError,
                    toast,
                    reFetchBalance,
                    setOpenShow,
                    setSuccess,
                    setFailed,
                    setHash,
                  })
                : depositERC20({
                    amount: Number(amount),
                    wallet,
                    totalBalance,
                    network: Number(network),
                    address: address || "",
                    startTransition,
                    handleError,
                    toast,
                    reFetchBalance,
                    setOpenShow,
                    setSuccess,
                    setFailed,
                    setHash,
                  })
              : setOpen(!open)
          }
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {connected
            ? !amount
              ? withdraw
                ? "Confirm"
                : "Enter Amount"
              : "Confirm"
            : "Connect Wallet"}
        </Button>
      </CardFooter>

      <ConnectionHandler isOpenProp={open} setIsOpenProp={setOpen} />

      <ConfirmDialog
        open={show}
        history={history}
        setOpen={setOpenShow}
        isPending={isPending}
        amount={amount || 0}
        success={success}
        failed={failed}
        hash={hash}
        withdraw={withdraw}
      />
    </Card>
  );
}
