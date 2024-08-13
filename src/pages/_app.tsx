import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import LocalFont from "next/font/local";
import ThemeProvider from "@/components/layout/provider";

const calSans = LocalFont({
  src: "../assets/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
  weight: "600",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={calSans.className}>
      <MeshProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Component {...pageProps} />
        </ThemeProvider>
      </MeshProvider>
    </div>
  );
}
