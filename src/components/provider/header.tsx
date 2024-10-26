import React from "react";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import SideBarContent from "./sidebar-content";

import SelectDomain from "./select-domain";
import ConnectionHandler from "../custom/connect-button";

export default function Header() {
  return (
    <div className="justify-between w-full flex px-4 md:px-8 py-6 items-center">
      <div className="flex justify-between gap-16 items-center md:w-auto w-full">
        <Link
          href="/"
          className="relative cursor-pointer items-center justify-center font-michroma"
        >
          <p className="text-xl font-bold font-michroma">Eigenfi</p>
          <p className="absolute rounded-[0.2rem] text-aquamarine-300 border border-white top-[6.5px] -right-10 text-[10px] px-[2px]">
            ADA
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
