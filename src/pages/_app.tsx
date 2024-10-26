import "./globals.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import ThemeProvider from "@/components/provider/theme-provider";
import { cn } from "@/lib/utils";
import { fontCalSans, fontMichroma } from "@/assets/fonts";
import { siteConfig } from "@/config/site";
import Head from "next/head"; // Import Head from Next.js

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="keywords" content={siteConfig.keywords.join(",")} />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className={cn(fontCalSans.className, fontMichroma.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Component {...pageProps} />
        </ThemeProvider>
      </div>
    </div>
  );
}
