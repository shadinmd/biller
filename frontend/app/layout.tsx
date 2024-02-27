import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import cn from "@/lib/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biller",
  description: "biller is a safe and easy to use application for managing bills and products for your buisness",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "overflow-x-hidden")}>{children}</body>
    </html>
  );
}
