import { useWallet } from "@meshsdk/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronRight, LogOut } from "lucide-react";
import { getAddress, getInstalled } from "@/services/web3";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdWallet } from "react-icons/md";

export default function ConnectionHandler({
  isOpenProp,
  setIsOpenProp,
}: {
  isOpenProp?: boolean;
  setIsOpenProp?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { connect, disconnect, connected } = useWallet();
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

  useEffect(() => {
    const walletprovider = localStorage.getItem("walletprovider");
    if (walletprovider) connect(walletprovider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isOpenProp && setIsOpen(true);
    setIsOpenProp && setIsOpenProp(false);
  }, [isOpenProp, isOpen, setIsOpenProp]);

  const installedWalletMemo = useMemo(() => installedWallet, [installedWallet]);

  return (
    <>
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
          className="h-[200px]"
        >
          <SheetHeader>
            <SheetTitle>Wallet</SheetTitle>
          </SheetHeader>
          <div className="flex mt-6 md:max-w-[400px] w-full">
            {connected ? (
              <div className="flex gap-2 w-full items-center border rounded-md p-4">
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
                  onClick={() => {
                    connect("nami");
                    localStorage.setItem("walletprovider", "nami");
                  }}
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

                {installedWalletMemo.length === 0 && (
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
