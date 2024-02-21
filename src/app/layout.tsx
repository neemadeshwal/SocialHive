import type { Metadata } from "next";
import { Inter, Grape_Nuts } from "next/font/google";
import "./globals.css";
import "@uploadthing/react/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LeftSidePanel from "./(components)/LeftSidePanel";
import { AppProvider } from "@/contextDir/globalContext";
config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SocialHive",
  description: "Social media App",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
