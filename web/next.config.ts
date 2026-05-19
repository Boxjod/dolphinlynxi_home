/**
 * Next.js 构建与运行时配置
 *
 * - output: 'export'  → 静态导出（SSG），生成纯 HTML/CSS/JS，部署到 Nginx 静态目录
 * - reactStrictMode    → 开启 React 严格模式，帮助发现副作用和过时 API
 * - devIndicators      → 关闭开发模式下右下角的编译指示器
 * - images.unoptimized → 禁用 Next.js 内置图片优化（静态导出不支持服务端优化）
 * - allowedDevOrigins  → 允许跨域访问 dev server 的域名白名单
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',           // 静态导出，部署到 robot.box2ai.com/datasets/
  reactStrictMode: true,
  devIndicators: false,
  images: { unoptimized: true }, // 静态导出模式下必须禁用图片优化
  allowedDevOrigins: ["www.dolphinlynxi.com", "192.168.31.52", "localhost"],
};

export default nextConfig;