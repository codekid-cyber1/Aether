import type { Metadata } from "next";
import { Hanken_Grotesk, Rokkitt, Outfit } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-hanken-grotesk",
});

const varsityFont = Rokkitt({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-varsity",
});

const logoFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-logo",
});

export const metadata: Metadata = {
  title: "AETHER — Digital Design Studio",
  description:
    "Resume your latest configurations or initiate a new masterpiece in the digital atelier.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} ${varsityFont.variable} ${logoFont.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
