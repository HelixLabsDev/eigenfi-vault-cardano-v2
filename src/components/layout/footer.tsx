import Link from "next/link";
import { socials } from "@/config/dashboard";
import ConnectionHandler from "../connect-button";

export default function Footer() {
  return (
    <div className="fixed bottom-0 w-full bg-background py-4 px-4 md:px-8 flex justify-between items-center">
      <p className="text-sm text-foreground/80 flex gap-2">
        {" "}
        HELIX LABS © {new Date().getFullYear()}{" "}
        <span className="md:block hidden">| All Rights Reserved</span>
      </p>
      {/* <div className="hidden md:flex items-center gap-2">
        <span className="w-2 h-2 bg-aquamarine-300 rounded-full animate-pulse" />
        <div className="text-sm text-foreground/80 font-medium flex gap-1">
          Total Staked:
          <div className="flex gap-0.5 font-bold ">
            {balance.length > 0 ? (
              <Counter
                direction="up"
                targetValue={Number(balance)}
                className="text-foreground text-sm"
              />
            ) : (
              <Skeleton className="w-16 h-5 rounded-md" />
            )}
            <span className="text-foreground">MTK</span>
          </div>
        </div>
      </div> */}

      <div className="gap-6 font-thin text-muted-foreground/70 col-span-1 hidden md:flex items-center">
        {socials.map((social) => (
          <Link key={social.name} href={social.href}>
            <social.icon className="w-5 h-5" />
          </Link>
        ))}
      </div>

      <div className="md:hidden block">
        <ConnectionHandler />
      </div>
    </div>
  );
}
