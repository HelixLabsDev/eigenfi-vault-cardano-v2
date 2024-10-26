import Link from "next/link";
import { socials } from "@/config/dashboard";
import ConnectionHandler from "../custom/connect-button";

export default function Footer() {
  return (
    <div className="fixed bottom-0 w-full bg-background py-4 px-4 md:px-8 flex justify-between items-center">
      <p className="text-sm text-foreground/80 flex gap-2">
        {" "}
        HELIX LABS © {new Date().getFullYear()}{" "}
        <span className="md:block hidden">| All Rights Reserved</span>
      </p>

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
