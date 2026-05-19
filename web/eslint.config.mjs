/**
 * ESLint 配置（Flat Config 格式）
 *
 * - 继承 Next.js 推荐的 core-web-vitals 和 typescript 规则集
 * - 忽略构建产物和自动生成的文件
 * - 使用 FlatCompat 桥接旧版 .eslintrc 格式的 next 配置
 */
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat 用于将 Next.js 的旧版 extends 配置转换为 Flat Config 格式
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // 排除不需要检查的目录和文件
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;