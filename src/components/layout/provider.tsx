"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import Header from "./header";
import SideBarContent from "./sidebar-content";
// import NetworkChooseDialog from "../common/network-choose-dialog";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <div
        vaul-drawer-wrapper=""
        className="w-screen h-screen overflow-hidden bg-background"
      >
        <Header />
        <div className="border-b w-full" />
        <div className="grid grid-cols-6 gap-6 container h-full">
          <div className="hidden md:block border-r">
            <SideBarContent />
          </div>
          <div className="col-span-6 md:col-span-5 py-12 md:px-6 overflow-scroll">
            {children}
          </div>
        </div>
      </div>
    </NextThemesProvider>
  );
}
