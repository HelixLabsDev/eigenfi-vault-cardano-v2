"use client";

import SideBarContent from "@/components/layout/sidebar-content";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import SelectDomain from "./select-domain";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent
          aria-describedby={undefined}
          side="left"
          className="!px-0"
        >
          <SheetTitle>
            <p className="font-bold font-michroma ps-6">Eigenfi</p>
          </SheetTitle>
          <div className="gap-4 mt-6 px-6 flex flex-col">
            <SideBarContent setOpen={setOpen} />
            <SelectDomain />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
