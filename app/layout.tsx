import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import { ArchiveProvider } from "@/components/ArchiveProvider";
import { SiteChrome } from "@/components/SiteChrome";
const sans = Noto_Sans_TC({ subsets: ["latin"], variable: "--font-sans" });
const serif = Noto_Serif_TC({ subsets: ["latin"], variable: "--font-serif" });
export const metadata: Metadata = { title: "不渡｜官方網站", description: "小說作者不渡官方網站。至少，看起來是。" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-Hant"><body className={`${sans.variable} ${serif.variable}`}><ArchiveProvider><SiteChrome>{children}</SiteChrome></ArchiveProvider></body></html>; }
