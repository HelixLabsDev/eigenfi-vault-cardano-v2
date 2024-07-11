"use client";

import { TableDemo } from "@/components/common/stake-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getAddress } from "@/services/web3";
import { useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { connected, connect, disconnect } = useWallet();
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddress();
      // const iw = await getInstalled();
      // setInstalledWallet(iw);
      setAddress(address);
    };

    fetchAddress();
  }, []);

  //   const myAddrs = (await wallet.getUsedAddresses()).map(Address.fromString);

  return (
    <div>
      <Tabs defaultValue="stake" className="w-full">
        <TabsList className="md:gap-6 ">
          <TabsTrigger value="stake" className="">
            Deposit
          </TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>
        <TabsContent value="stake">
          <div className="py-6">
            <div className="py-6">
              {connected ? (
                <TableDemo withdraw={null} address={address || ""} />
              ) : (
                <p className="text-sm text-muted-foreground px-2">
                  Connect your wallet{" "}
                </p>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="withdraw">
          {connected ? (
            <TableDemo withdraw={true} address={address || ""} />
          ) : (
            <p className="text-sm text-muted-foreground px-2">
              Connect your wallet{" "}
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
