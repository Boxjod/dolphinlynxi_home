/**
 * PostCSS 配置
 *
 * 使用 Tailwind CSS v4 的 PostCSS 插件。
 * Tailwind v4 不需要单独的 tailwind.config 文件，配置通过 CSS 和 PostCSS 插件完成。
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;