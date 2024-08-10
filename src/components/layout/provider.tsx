import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import Header from "./header";
import Footer from "./footer";
import { Toaster } from "sonner";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <div className="w-screen min-h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black ">
        <Header />
        <div className="md:container md:pb-16 pb-[72px] py-8 px-4 md:px-6">
          {children}
        </div>
        <Footer />
      </div>
      <Toaster />
    </NextThemesProvider>
  );
}
