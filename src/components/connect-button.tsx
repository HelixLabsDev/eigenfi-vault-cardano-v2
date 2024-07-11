"use client";
import { useWallet } from "@meshsdk/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, LogOut } from "lucide-react";
import { getAddress, getInstalled } from "@/services/web3";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function ConnectionHandler() {
  const [isOpen, setIsOpen] = useState(false);
  const { connected, connect, disconnect } = useWallet();
  const [address, setAddress] = useState("");
  const [installedWallet, setInstalledWallet] = useState<any>([]);

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddress();
      const iw = await getInstalled();
      setInstalledWallet(iw);
      setAddress(address);
    };

    fetchAddress();
  }, []);

  console.log(installedWallet, "installedWallet");

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <Button onClick={() => setIsOpen(true)}>
          {address.length > 0
            ? connected
              ? address.slice(0, 4) + "..." + address.slice(-4)
              : "Connect Wallet"
            : "Connect Wallet"}
        </Button>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Wallet</SheetTitle>
          </SheetHeader>
          <div className="flex mt-6 w-full">
            {connected ? (
              <div className="flex gap-2 w-full items-center">
                <Avatar>
                  <AvatarImage
                    src={"https://github.com/shadcn.png"}
                    alt="avatar"
                  />
                  <AvatarFallback>
                    {address?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full flex flex-col gap-1 justify-center text-sm">
                  <p className="border w-16 text-center text-sm border-primary rounded-sm text-textPrimary">
                    NAMI
                  </p>
                  <p className="font-bold">
                    WELCOME !,
                    <span className="ps-2">
                      {address?.slice(0, 4) + "..." + address?.slice(-4)}
                    </span>
                  </p>
                </div>
                <div
                  className=" p-2 hover:bg-foreground/5 rounded-full"
                  onClick={() => disconnect()}
                >
                  {/* <CircleArrowOutDownRight className="w-5 h-5 cursor-pointer" /> */}
                  <LogOut className="w-5 h-5 cursor-pointer" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 w-full">
                <div
                  className="flex items-center gap-2 hover:bg-foreground/5 rounded-sm py-2 w-full justify-between cursor-pointer"
                  onClick={() => connect("nami")}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="https://app.minswap.org/wallets/nami.svg"
                      alt="Nami"
                      width={1500}
                      height={1500}
                      className="w-8 h-8"
                    />
                    <p className="text-lg">Nami</p>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>

                {installedWallet.length === 0 && (
                  <div className="flex gap-1">
                    if not installed
                    <a
                      className="text-primary"
                      href="https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo"
                      target="_blank"
                    >
                      Nami
                    </a>
                  </div>
                )}

                {installedWallet.forEach((item: any) => {
                  if (item.name !== "Nami") {
                    return (
                      <div className="flex gap-1">
                        if not installed
                        <a
                          className="text-primary"
                          href="https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo"
                          target="_blank"
                        >
                          Nami
                        </a>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
