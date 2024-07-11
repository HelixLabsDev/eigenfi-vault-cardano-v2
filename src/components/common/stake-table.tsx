import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import StakeDrawer from "./stake-drawer";
import { Loader2 } from "lucide-react";
import {
  calculatePoints,
  createPoint,
  getPointsByAddress,
  withdrawPoint,
} from "@/services/point";
import { lockTx } from "@/offchain/lockTx";
import { useNetwork, useWallet } from "@meshsdk/react";
import { unlockTx } from "@/offchain/unlockTx";

const data = {
  protocol: "MockToken",
  deposit: "Paid",
  asset: "MTK",
  balance: "",
  other: "",
};

export function TableDemo({
  withdraw,
  address,
}: {
  withdraw: boolean | null;
  address: string;
}) {
  const [balance, setBalance] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    desc: string;
    type: string;
    title?: string;
  } | null>(null);
  const { wallet, connected } = useWallet();
  const network = useNetwork();

  // const reFetchBalance = async () => {
  //   if (withdraw) {
  //     // EigenFiPool Staked Balance
  //     const { eigenFiPoolReadContract } = await getEigenFiPoolContract();
  //     const amount = await eigenFiPoolReadContract.balance(
  //       genAddresses.mockToken,
  //       address
  //     );
  //     setBalance(format18(amount));
  //     return amount;
  //   } else {
  //     // MockToken Balance
  //     const { mockTokenReadContract } = await getMockTokenContract();
  //     const amount = await mockTokenReadContract?.balanceOf(address);
  //     setBalance(format18(amount));
  //     return amount;
  //   }
  // };

  useEffect(() => {
    const fetch = async () => {
      if (withdraw) {
        // EigenFiPool Staked Balance
        const { points, error, status } = await getPointsByAddress({
          address: address.toString(),
        });
        points && points.length > 0
          ? setBalance(points[0].amount)
          : setBalance("0");
        return amount;
      } else {
        // MockToken Balance
        const { points, error, status } = await getPointsByAddress({
          address: address.toString(),
        });
        points && points.length > 0
          ? setBalance(points[0].amount)
          : setBalance("0");
        return amount;
      }
    };
    fetch();
  }, [address, amount, withdraw]);

  async function depositERC20() {
    if (amount === null) {
      return toast.error("Please enter an amount");
    }

    if (amount === 1) {
      return toast.error("Minimum amount is 2");
    }

    if (network === 1) {
      return toast.error("Please switch to the preprod network.");
    }

    try {
      await lockTx(wallet, "preprodIZeSqbpsa1CttYKvzSvZTDiEM0Ar4h35", amount);
      // lock transaction created successfully

      // if (!txHash) {
      //   return toast.error("Something went wrong");
      // }
      const res = await createPoint({
        address: address.toString(),
        amount: Number(amount || 0),
      });

      if ([200, 201, 204].includes(res.status)) {
        toast.success(
          `Deposit successful. Thank you for depositing ${amount} ${data.protocol}.`
        );

        setMessage({
          title: "Deposit successful",
          desc: `Thank you for depositing ${amount} ${data.protocol}.`,
          type: "success",
        });

        // Close the drawer after 3 seconds
        setTimeout(() => {
          setShowDrawer(false);
        }, 3000);

        // Re-fetch balance
        // reFetchBalance();

        // toast.success(
        //   `lock tx submitted: https://preprod.cardanoscan.io/transaction/${txHash}`
        // );
        // console.log("txHash ->", txHash);
      }
    } catch (err: any) {
      handleError(err);
    }
  }

  // Helper function to handle errors
  const handleError = (err: any) => {
    const errorMessage =
      err.reason || err.data?.message || err.message || "An error occurred";
    setMessage({
      desc: errorMessage,
      type: "error",
    });
    toast.error(errorMessage);
  };

  const withdrawERC20 = async () => {
    if (amount === null) {
      return toast.error("Please enter an amount");
    }
    try {
      await unlockTx(wallet, "preprodIZeSqbpsa1CttYKvzSvZTDiEM0Ar4h35");

      await withdrawPoint({
        address: address.toString(),
        amount: Number(amount),
      }).then((res) => {
        if (res.status === 201 || res.status === 200 || res.status === 204) {
          toast.success("Withdraw successful");
          setMessage({
            desc: "Withdraw successful",
            type: "success",
          });

          setTimeout(() => {
            setShowDrawer(false);
          }, 2000);

          // reFetchBalance();
        } else {
          toast.error(
            `Withdraw failed. Please try again. If the problem persists, please contact us.`
          );
        }
      });
    } catch (err) {
      console.log("err ->", err);
      toast.error("Something went wrong");
    }
  };
  const max = async () => {
    setAmount(Number(balance));
  };

  useEffect(() => {
    calculatePoints({ address: address.toString() });
  }, [address]);

  return (
    <Table>
      <TableCaption className="mt-12">
        <p>
          You can withdraw any time and keep the points and yield already
          earned.
        </p>
        <div className="mt-4">
          <Button
            disabled={!address || !amount || isPending}
            onClick={() => {
              setShowDrawer(true);
            }}
            className="w-full"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm
          </Button>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Protocol</TableHead>
          <TableHead>{withdraw ? "Withdraw" : "Deposit"}</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead className="text-right">Asset</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <StakeDrawer
          withdraw={withdraw}
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          isPending={isPending}
          amount={amount}
          setAmount={setAmount}
          withdrawERC20={withdrawERC20}
          depositERC20={depositERC20}
          data={data}
          message={message}
          setMessage={setMessage}
        />
        <TableRow>
          <TableCell className="font-medium">{data.protocol}</TableCell>
          <TableCell className="flex gap-4 items-center">
            <Input
              placeholder=""
              type="number"
              className="w-[250px]"
              value={amount?.toString() || ""}
              onChange={(e) => {
                e.target.value === ""
                  ? setAmount(null)
                  : setAmount(Number(e.target.value));
              }}
            />
            <Button size={"xsm"} onClick={() => max()}>
              Max
            </Button>
          </TableCell>
          {balance !== null ? (
            <TableCell>{balance}</TableCell>
          ) : (
            <TableCell>
              <Skeleton className="h-4 w-12" />
            </TableCell>
          )}
          <TableCell className="text-right">{data.asset}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
