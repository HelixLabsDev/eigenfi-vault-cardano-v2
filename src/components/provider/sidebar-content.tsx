import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { navItem } from "@/config/dashboard";

interface SideBarContentProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const SideBarContent = ({ setOpen }: SideBarContentProps) => {
  const pathname = usePathname();

  return navItem.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      onClick={() => {
        setOpen && setOpen(false);
      }}
      className={cn(
        "duration-100 text-zinc-500",
        pathname === item.href && "text-zinc-300"
      )}
    >
      <Button
        variant={"ghost"}
        className="md:text-sm text-lg flex items-center gap-1"
      >
        {item.icon && <div className="w-5 h-5">{item.icon}</div>}
        {item?.name}
      </Button>
    </Link>
  ));
};

export default SideBarContent;
