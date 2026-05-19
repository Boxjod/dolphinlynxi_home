/**
 * @file 首页（Home Page）
 *
 * 职责：
 *   组合 5 个独立展示组件，形成完整的首页渲染链路：
 *     Nav → Hero → Services → WhyUs → CtaBanner → Footer
 *
 * 设计原则：
 *   - 首页本身不包含业务逻辑和状态，仅负责组装与排序
 *   - 所有文案通过 i18n.ts 的 home.* 键控制（中英双语）
 *   - 各组件内部自行调用 useTranslation，首页无需传递 props
 *
 * 注意：本组件为 Server Component（无 'use client'），
 * 子组件如 Hero / Services 各自声明 'use client' 以启用交互。
 */
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* 顶部导航，active="/" 让首页 Tab 高亮以指示当前位置 */}
      <Nav active="/" />
      <main>
        {/* ── 主视觉区 ── 全屏背景 + Slogan + CTA 按钮，第一屏核心吸引力 */}
        <Hero />
        {/* ── 四大服务卡片 ── 对应 home.svc.* 键，展示公司核心业务能力 */}
        <Services />
        {/* ── 为什么选择我们 ── 竞争优势列表，回应客户"凭什么选你"的核心问题 */}
        <WhyUs />
        {/* ── 行动召唤横幅 ── 引导访客跳转至产品页或联系页，提升转化率 */}
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
