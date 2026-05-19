import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";
import PageToc from "@/components/PageToc";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dolphinlynxi.com"),
  title: "海豚灵汐 · 数据如潮，灵汐而至 | 具身智能数据资产的运营商",
  description:
    "海豚灵汐 · 数据如潮，灵汐而至。Scaling Law 时代的具身智能数据资产的运营商。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://www.dolphinlynxi.com",
    siteName: "海豚灵汐",
    title: "海豚灵汐 · 数据如潮，灵汐而至",
    description:
      "具身智能数据资产的运营商",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      data-lang="zh"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning>
        <I18nProvider>
          {children}
          <PageToc />
        </I18nProvider>
      </body>
    </html>
  );
}
