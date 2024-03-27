import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers as UIProvider } from "@/app/providers/nextui";

import Head from "next/head";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "游记审核",
  description: "旅行物语的游记审核",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={inter.className}>
        <UIProvider>{children}</UIProvider>
        <Toaster />
      </body>
    </html>
  );
}
