import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Abakus Hippieløp",
  description: "Bingobrett til Abakus Hippieløp",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="no" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <main className="flex min-h-screen flex-col items-center bg-[#ddcfaf]">
            <h1 className="relative">
              <Image
                src="/banner.webp"
                alt="Hippieløp title"
                width={500}
                height={150}
              />
              <div className="absolute inset-0 top-16 bg-gradient-to-t from-[#ddcfaf]" />
            </h1>
            {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
