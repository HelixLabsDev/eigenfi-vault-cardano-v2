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
import { useNetwork, useWallet } from "@meshsdk/react";
import { getAddress, getBalance } from "@/lib/web3";
import ConfirmDialog from "../custom/confirm-dialog";
import ConnectionHandler from "../custom/connect-button";
import AmountSelectDialog from "../custom/utxo-dialog";
import { useStore } from "@/lib/store";

export function CardWithStack() {
  const { connected, connecting } = useWallet();
  const { wallet } = useWallet();
  const network = useNetwork();

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

  const { setUser, user } = useStore();

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddress();
      setAddress(address);
    };

    connected && fetchAddress();
  }, [connected]);

  useEffect(() => {
    const fetch = async () => {
      const balance: any = await getBalance();
      setBalance((balance[0].quantity / 1e6).toString());
    };
    connected && fetch();
  }, [address, amount, withdraw, connected]);

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

  const handleError = (err: any) => {
    const errorMessage =
      err.reason || err.data?.message || err.message || "An error occurred";
    toast.error(errorMessage);
  };

  const [utxo, setUtxo] = useState<string>("");
  const [withdrawBalance, setWithdrawBalance] = useState<number>(0);
  const [openAmount, setOpenAmount] = useState<boolean>(false);

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
        <CardTitle className="text-sm">Helix Vault</CardTitle>
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
                        <SelectItem value="eth">$tADA</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="absolute flex gap-1 bottom-3 left-3 text-sm text-muted-foreground">
                      {/* ${amount ? 3320.87 * amount : 0} */}
                      {balance ? (
                        formatNumber(Number(balance).toFixed(2))
                      ) : (
                        <Skeleton className="w-12 h-5 rounded-md" />
                      )}
                      {" tADA"}
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
                    <div
                      onClick={() => setOpenAmount(true)}
                      className="flex w-full rounded-md border-input px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring cursor-pointer bg-white/5 border-0 focus-visible:ring-offset-0 focus-visible:ring-[0.2px] h-[120px] py-[40px] text-[32px] pe-[80px]"
                    >
                      {amount ? (
                        amount
                      ) : (
                        <p className="opacity-50">Select amount</p>
                      )}
                    </div>

                    <Select defaultValue="tada">
                      <SelectTrigger
                        id="framework"
                        className="absolute top-1/4 w-22 right-3"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="tada">tADA</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="absolute flex gap-1 bottom-3 left-3 text-sm text-muted-foreground">
                      {withdrawBalance ? (
                        formatNumber(Number(withdrawBalance).toFixed(2))
                      ) : withdrawBalance ? (
                        <Skeleton className="w-12 h-5 rounded-md" />
                      ) : (
                        "0.00"
                      )}
                      {" tADA"}
                    </div>
                    <div className="absolute bottom-3 right-3 text-sm text-muted-foreground flex gap-2">
                      {user?.utxo[0]?.amount && (
                        <Button
                          size={"xs"}
                          onClick={() => {
                            setAmount(user.utxo[0].amount);
                            setHash(user.utxo[0].hash);
                          }}
                        >
                          {user.utxo[0].amount}
                        </Button>
                      )}
                      {user?.utxo[1]?.amount && (
                        <Button
                          size={"xs"}
                          onClick={() => {
                            setAmount(user.utxo[1].amount);
                            setHash(user.utxo[1].hash);
                          }}
                        >
                          {user.utxo[1].amount}
                        </Button>
                      )}
                      {user?.utxo[2]?.amount && (
                        <Button
                          size={"xs"}
                          onClick={() => {
                            setAmount(user.utxo[2].amount);
                            setHash(user.utxo[2].hash);
                          }}
                        >
                          {user.utxo[2].amount}
                        </Button>
                      )}
                      {user?.utxo[3]?.amount && (
                        <Button
                          size={"xs"}
                          onClick={() => {
                            setAmount(user.utxo[3].amount);
                            setHash(user.utxo[3].hash);
                          }}
                        >
                          {user.utxo[3].amount}
                        </Button>
                      )}
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
            isPending ||
            connecting
          }
          className="w-full text-base"
          onClick={() =>
            connected
              ? withdraw
                ? withdrawERC20({
                    hash: utxo,
                    wallet,
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
          {(isPending || connecting) && (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          )}
          {connected
            ? !amount
              ? withdraw
                ? "Confirm"
                : "Enter Amount"
              : "Confirm"
            : "Connect Wallet"}
        </Button>
      </CardFooter>

      <AmountSelectDialog
        setUtxo={setUtxo}
        utxo={utxo}
        utxos={user?.utxo ?? []}
        open={openAmount}
        setOpen={setOpenAmount}
        amount={amount ?? 0}
        setAmount={setAmount}
      />

      <ConnectionHandler isOpenProp={open} setIsOpenProp={setOpen} />

      <ConfirmDialog
        open={show}
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
