import React, { useEffect, useState } from "react";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import SideBarContent from "./sidebar-content";
import { getAddress } from "@/services/web3";

import ConnectionHandler from "../connect-button";
import SelectDomain from "./select-domain";

export default function Header() {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddress();
      setAddress(address);
    };

    fetchAddress();
  }, []);

  return (
    <div className="justify-between w-full flex px-4 md:px-8 py-6 items-center">
      {/* bg-gradient-to-tl from-black via-aquamarine-600/20 to-black */}
      <div className="flex justify-between gap-16 items-center md:w-auto w-full">
        <Link
          href="/"
          className="relative cursor-pointer items-center justify-center font-michroma"
        >
          <p className="text-xl font-bold">Eigenfi</p>
          <p className="absolute rounded-[0.2rem] text-aquamarine-300 border border-white top-[6.5px] -right-12 text-[10px] px-[2px]">
            Cardano
          </p>
        </Link>
        <div className="block md:hidden">
          <MobileNav />
        </div>
        <div className="md:flex gap-4 hidden">
          <SideBarContent />
          <SelectDomain />
        </div>
      </div>

      <div className="md:block hidden">
        <ConnectionHandler />
      </div>
    </div>
  );
}
