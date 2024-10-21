"use client";

import { useWallet, useWalletList } from "@meshsdk/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { ChevronRight, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdWallet } from "react-icons/md";
import Image from "next/image";
import { getAddress, getAvailableWallets } from "@/lib/web3";

interface Wallet {
  id: string;
  name: string;
  icon: string;
}

export default function ConnectionHandler({
  isOpenProp,
  setIsOpenProp,
}: {
  isOpenProp?: boolean;
  setIsOpenProp?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { disconnect, connected, connect, wallet } = useWallet();
  const [address, setAddress] = useState("");
  const [installedWallets, setInstalledWallets] = useState<Wallet[]>([]);

  const wallets = useWalletList();
  console.log("wallets", wallets);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const address = await wallet.getChangeAddress();
        const iw = await getAvailableWallets();
        setInstalledWallets(iw);
        setAddress(address);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchWallets();
  }, [wallet]);

  useEffect(() => {
    const walletprovider = localStorage.getItem("walletprovider");
    if (walletprovider) connect(walletprovider);
  }, [connect]);

  console.log("installedWallets", installedWallets);

  useEffect(() => {
    if (isOpenProp) setIsOpen(true);
    if (setIsOpenProp) setIsOpenProp(false);
  }, [isOpenProp, setIsOpenProp]);

  const connectedCard = () => {
    return wallets.map(
      (wallet, _id) =>
        localStorage.getItem("walletprovider") === wallet.id && (
          <div
            key={_id}
            className="flex gap-2 w-full items-center border rounded-md p-4"
          >
            <Avatar>
              <AvatarImage src={wallet.icon} alt={wallet.name} />
              <AvatarFallback>
                {address?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="w-full flex flex-col gap-1 justify-center text-sm">
              <p className="border w-20 text-center text-sm border-primary rounded-sm text-textPrimary">
                {wallet.name}
              </p>
              <p className="font-bold">
                WELCOME !,
                <span className="ps-2">
                  {address?.slice(0, 4) + "..." + address?.slice(-4)}
                </span>
              </p>
            </div>
            <div
              className="p-2 hover:bg-foreground/5 rounded-full"
              onClick={() => disconnect()}
            >
              <LogOut className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        )
    );
  };

  const installedCard = () => {
    return (
      <div className="flex flex-col gap-3 w-full pt-6">
        {wallets?.map((wallet: Wallet, _id: number) => (
          <div
            key={_id}
            className="flex items-center gap-2 hover:bg-foreground/5 rounded-sm py-2 w-full justify-between cursor-pointer"
            onClick={() => {
              connect(wallet.id);
              localStorage.setItem("walletprovider", wallet.id);
            }}
          >
            <div className="flex items-center gap-3">
              <Image
                src={wallet.icon}
                alt={wallet.name}
                width={1500}
                height={1500}
                className="w-8 h-8"
              />
              <p className="text-lg">{wallet.name}</p>
            </div>
            <ChevronRight className="w-4 h-4" />
          </div>
        ))}
      </div>
    );
  };

  const notInstalledCard = () => {
    return (
      <div className="flex w-full pt-6 gap-2">
        <p> Install a wallet to get started:</p>
        <div className="flex gap-2">
          <a
            className="text-textPrimary"
            href="https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nami,
          </a>
          <a
            className="text-textPrimary"
            href="https://nu.fi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nufi
          </a>
        </div>
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {isOpenProp === undefined && (
        <Button
          variant={"gradient"}
          className="flex items-center gap-1.5"
          onClick={() => setIsOpen(true)}
        >
          <MdWallet className="w-5 h-5" />
          {address.length > 0
            ? connected
              ? address.slice(0, 4) + "..." + address.slice(-4)
              : "Connect Wallet"
            : "Connect Wallet"}
        </Button>
      )}

      <SheetContent
        aria-describedby={undefined}
        side="bottom"
        className="min-h-[200px]"
      >
        <SheetHeader>
          <SheetTitle>Wallet</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col mt-6 md:max-w-[400px] w-full">
          {connected ? connectedCard() : installedCard()}
          {notInstalledCard()}
        </div>
      </SheetContent>
    </Sheet>
  );
}
