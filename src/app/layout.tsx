import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/nav/Navbar";
import { Toaster } from "@/components/ui/toaster";

import { config } from "@fortawesome/fontawesome-svg-core";
import { auth } from "./auth/auth";
import dbConnect from "./utils/dbConnect";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Governor",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  dbConnect();

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Navbar loggedIn={!!session?.user}></Navbar>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
