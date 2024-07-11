"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
// import { Link } from "next-view-transitions";
import Link from "next/link";

interface SideBarContentProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const SideBarContent = ({ setOpen }: SideBarContentProps) => {
  const pathname = usePathname();
  const navigation = [
    { name: "Stake", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    // { name: "Stake", href: "/stake" },
  ];

  return (
    <ul className="flex flex-col gap-4 col-span-1 py-12">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => {
            setOpen && setOpen(false);
          }}
          className={cn(
            "text-sm duration-500 text-zinc-500 hover:text-black dark:text-zinc-500 dark:hover:text-zinc-300",
            pathname === item.href && "dark:text-zinc-300 text-black"
          )}
        >
          {item.name}
        </Link>
      ))}
    </ul>
  );
};

export default SideBarContent;
