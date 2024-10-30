import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { navItem } from "@/config/dashboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
      {item.hoverText ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className={cn(
                "md:text-sm text-lg flex items-center gap-1",
                buttonVariants({ variant: "ghost" })
              )}
            >
              {item.icon && <div className="w-5 h-5">{item.icon}</div>}
              {item?.name}
            </TooltipTrigger>
            <TooltipContent>
              <p>Deposit your assets here to earn Helix points.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Button
          variant={"ghost"}
          className="md:text-sm text-lg flex items-center gap-1"
        >
          {item.icon && <div className="w-5 h-5">{item.icon}</div>}
          {item?.name}
        </Button>
      )}
    </Link>
  ));
};

export default SideBarContent;
