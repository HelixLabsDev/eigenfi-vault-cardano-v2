import CardWithAbout from "@/components/common/about-card";
import { CardWithStack } from "@/components/common/stack-card";
import { useStore } from "@/lib/store";
import { getAddress } from "@/lib/web3";
import { useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";

export default function Bridge() {
  const { connected } = useWallet();
  const { setUser } = useStore();

  const [address, setAddress] = useState("");

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

  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-8 animate-in-reverse">
      <CardWithStack />
      <CardWithAbout />
    </div>
  );
}
