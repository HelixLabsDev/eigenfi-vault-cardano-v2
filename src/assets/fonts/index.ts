import LocalFont from "next/font/local";
import { Michroma } from "next/font/google";

export const fontCalSans = LocalFont({
  src: "./CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export const fontMichroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
});
