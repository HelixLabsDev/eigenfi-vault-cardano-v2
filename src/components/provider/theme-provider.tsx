import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import Header from "./header";
import Footer from "./footer";
import { Toaster } from "sonner";
import Web3Provider from "./web3-provider";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <Web3Provider>
        <div className="w-full min-h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black ">
          <Header />
          <div className="md:container md:pb-16 pb-[72px] py-8 px-4 md:px-6">
            {children}
          </div>
          <Footer />
        </div>
      </Web3Provider>
      <Toaster />
    </NextThemesProvider>
  );
}
