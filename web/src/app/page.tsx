// ============================================================
// 首页（Home）
// 由独立组件拼装：导航栏 → Hero 主打区 → 服务板块 → 为什么选我们 → CTA 横幅 → 页脚
// 所有文案均通过 i18n.ts 的 home.* 键控制
// ============================================================
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* 顶部导航，active="/" 表示首页 Tab 高亮 */}
      <Nav active="/" />
      <main>
        {/* Hero：全屏主视觉 + Slogan + CTA 按钮 */}
        <Hero />
        {/* Services：我们提供的四大服务卡片 */}
        <Services />
        {/* WhyUs：为什么选择我们 —— 竞争优势列表 */}
        <WhyUs />
        {/* CtaBanner：底部行动召唤横幅 */}
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
