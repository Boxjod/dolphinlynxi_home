/**
 * @file 根布局（RootLayout）
 *
 * 职责：
 *   1. 声明全站 SEO Metadata（标题 / 描述 / OpenGraph）
 *   2. 加载 Geist 字体并注入 CSS 变量（--font-geist-sans / --font-geist-mono）
 *   3. 包裹 I18nProvider 实现中英双语切换
 *   4. 渲染页面目录组件 PageToc（右侧浮动锚点导航）
 *
 * 此文件为 Next.js App Router 的顶层布局，
 * 所有页面（page.tsx）都会被嵌套在此 <html>/<body> 内。
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";
import PageToc from "@/components/PageToc";

// ── 字体配置 ──────────────────────────────────────────────────
// 使用 Next.js Font Optimization 自动子集化 + 内联关键 CSS，
// 变量名会注入 <html> className 供全局样式引用。
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ── 全站 SEO Metadata ────────────────────────────────────────
// metadataBase 用于自动拼接 openGraph.url 等相对路径；
// 注意品牌定位必须为"具身智能数据资产的运营商"（参见 CLAUDE.md 铁律）。
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

// ── 根布局组件 ────────────────────────────────────────────────
// suppressHydrationWarning：避免浏览器插件注入属性导致 hydration mismatch 报错。
// data-lang="zh"：供 i18n 脚本和 CSS 选择器在客户端判断当前语言。
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
        {/* I18nProvider 在客户端初始化 i18next，所有子组件可通过 useTranslation 获取文案 */}
        <I18nProvider>
          {children}
          {/* PageToc：右侧浮动目录，自动抓取页面 <section id="..."> 生成锚点列表 */}
          <PageToc />
        </I18nProvider>
      </body>
    </html>
  );
}
