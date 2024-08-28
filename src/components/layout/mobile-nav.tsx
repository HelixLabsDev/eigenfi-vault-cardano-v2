import SideBarContent from "@/components/layout/sidebar-content";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import SelectDomain from "./select-domain";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="gap-4 px-6 flex flex-col">
            <SideBarContent setOpen={setOpen} />
            <SelectDomain />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
