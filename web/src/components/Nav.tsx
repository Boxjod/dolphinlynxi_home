/**
 * @file Nav.tsx — 全站顶部导航栏
 *
 * 功能概览：
 * 1. 桌面端：渲染水平导航链接，鼠标悬停时展开三列式 Mega 菜单（产品 / 开发者 / 关于）。
 * 2. 移动端（≤1100px）：通过汉堡按钮控制侧边抽屉（mobile-drawer），
 *    抽屉内按分组展示与 Mega 菜单相同的子链接。
 * 3. 集成 LanguageSwitcher 组件，支持中英文即时切换。
 *
 * @param active — 当前高亮的路径（如 '/' '/products'），
 *                 由父级 Layout 传入以标记活动导航项。
 */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { withAssetPath } from '@/lib/site-path';

/** 顶部导航的路由配置，key 对应 i18n 翻译键 */
const NAV_HREFS = [
  { href: '/',          key: 'nav.home' },
  { href: '/products',  key: 'nav.products' },
  { href: '/developer', key: 'nav.developer' },
  { href: '/about',     key: 'nav.about' },
];

export default function Nav({ active }: { active?: string }) {
  const { t, i18n } = useTranslation();
  /** 移动端侧边抽屉的开关状态 */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  /** 桌面端 Mega 菜单的展开状态 */
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const isEn = i18n.language?.toLowerCase().startsWith('en');
  /** 用于 Mega 菜单延迟关闭的计时器，防止鼠标移出瞬间菜单抖动消失 */
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * 根据当前语言构建移动端菜单的完整数据。
   * 包含分组标签 + 各分组的子链接（标题、描述、锚点地址）。
   * 同一份数据也被桌面端 Mega 菜单复用，保持两端内容一致。
   */
  const mobileMenu = useMemo(() => {
    const en = i18n.language?.toLowerCase().startsWith('en');
    return {
      labels: en
        ? { home: 'Home', products: 'Products', developer: 'Developers', about: 'About' }
        : { home: '首页', products: '产品', developer: '开发者生态', about: '关于我们' },
      products: [
        {
          href: '/products#datasets',
          title: en ? 'Large-scale Datasets' : '灵汐·大规模数据集',
          desc: en ? 'Logistics / Industrial / Home / Medical — 4 core scenes' : '物流 / 工业 / 家庭 / 医疗 4 大场景',
        },
        {
          href: '/products#toolchain',
          title: en ? 'Data Management Toolchain' : '灵汐·数据管理工具链',
          desc: en ? 'On-prem appliance · capture + manage + train full stack' : '私有化一体机 · 采集 + 管理 + 训练全栈',
        },
        {
          href: '/products#devices',
          title: en ? 'Capture devices' : '数采设备',
          desc: en ? 'Teleop / VR / XR capture lineup' : '遥操 / VR / XR 采集设备',
        },
        {
          href: '/products#ecosystem',
          title: en ? 'Compatible ecosystem' : '兼容硬件生态',
          desc: en ? 'Lightweight / industrial / mobile / humanoid robots' : '轻量级 / 工业 / 移动升降 / 人形机器人',
        },
      ],
      developer: [
        {
          href: '/developer#platform',
          title: en ? 'All-in-one platform' : '一站式服务平台',
          desc: en ? 'Data → Compute → Model → Deploy end-to-end' : '数据 → 算力 → 模型 → 部署 全链路',
        },
        {
          href: '/developer#oss',
          title: en ? 'Open-source datasets' : '开源数据集',
          desc: en ? '12 curated globally · OXE / AgiBot / DROID' : '12 个全球精选 · 含 OXE / AgiBot / DROID',
        },
      ],
      about: [
        {
          href: '/about#about',
          title: en ? 'About us' : '关于我们',
          desc: en ? 'Buoys · lighthouses · current monitoring' : '浮标 · 灯塔 · 洋流监测网',
        },
        {
          href: '/about#join',
          title: en ? 'Join us' : '加入我们',
          desc: en ? '7 positions hiring' : '7 个职位招聘中',
        },
        {
          href: '/about#contact',
          title: en ? 'Contact us' : '联系我们',
          desc: en ? 'plumpost@sina.com · Shanghai Minhang' : 'plumpost@sina.com · 上海闵行',
        },
      ],
    };
  }, [i18n.language]);

  /**
   * 副作用：抽屉打开时给 body 添加 'drawer-open' 类，
   * 供全局 CSS 锁定页面滚动（overflow:hidden），关闭时移除。
   */
  useEffect(() => {
    document.body.classList.toggle('drawer-open', isDrawerOpen);
    return () => document.body.classList.remove('drawer-open');
  }, [isDrawerOpen]);

  /**
   * 副作用：窗口宽度回到桌面端（>1100px）时自动关闭移动端抽屉，
   * 避免用户在小屏打开抽屉后拉宽窗口导致 UI 遮挡。
   */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1100) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeDrawer = () => setIsDrawerOpen(false);

  /**
   * 打开 Mega 菜单。如果存在延迟关闭的计时器则先取消，
   * 确保鼠标在导航链接与 Mega 面板间滑动时不会误关。
   */
  const openMega = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setIsMegaOpen(true);
  };

  /**
   * 延迟 140ms 关闭 Mega 菜单，给用户在导航项与下拉面板之间
   * 移动鼠标留出缓冲时间，避免菜单闪关。
   */
  const closeMegaDelayed = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => setIsMegaOpen(false), 140);
  };

  /** 组件卸载时清理延迟关闭的计时器，防止内存泄漏 */
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* ====== 顶部导航栏 ====== */}
      <nav className="nav">
        <div className="nav-inner">
          {/* 品牌 Logo + 文字，点击回首页 */}
          <Link href="/" className="nav-brand" onClick={closeDrawer}>
            <img src={withAssetPath('assets/logo.png')} alt="Dolphin Lynxi" />
            <div className="nav-brand-text">
              <span>{t('nav.brand')}</span>
              <div className="nav-brand-sub">{t('nav.brandSub')}</div>
            </div>
          </Link>

          {/* 桌面端导航链接区域 + Mega 下拉面板 */}
          <div
            className={`nav-links nav-links-with-mega${isMegaOpen ? ' mega-open' : ''}`}
            onMouseEnter={openMega}
            onMouseLeave={closeMegaDelayed}
          >
            {/* 逐个渲染导航链接；首页('/')不触发 Mega 菜单 */}
            {NAV_HREFS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  active === link.href ? 'active' : '',
                  link.href !== '/' ? 'has-mega' : '',
                ].filter(Boolean).join(' ')}
                onClick={closeDrawer}
                onMouseEnter={link.href !== '/' ? openMega : undefined}
                onMouseLeave={link.href !== '/' ? closeMegaDelayed : undefined}
                onFocus={link.href !== '/' ? openMega : undefined}
              >
                {t(link.key)}
              </Link>
            ))}

            {/*
              Mega 下拉面板：三列布局（产品 / 开发者 / 关于），
              鼠标进入面板时保持打开，离开后延迟关闭
            */}
            <div
              className="mega-panel"
              onMouseEnter={openMega}
              onMouseLeave={closeMegaDelayed}
            >
              <div className="mega-col">
                <div className="mega-col-title">{mobileMenu.labels.products}</div>
                {mobileMenu.products.map((item) => (
                  <Link key={`mega-${item.href}`} href={item.href} className="mega-item" onClick={() => setIsMegaOpen(false)}>
                    <div className="mega-content">
                      <div className="mega-title">{item.title}</div>
                      <div className="mega-desc">{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mega-col">
                <div className="mega-col-title">{mobileMenu.labels.developer}</div>
                {mobileMenu.developer.map((item) => (
                  <Link key={`mega-${item.href}`} href={item.href} className="mega-item" onClick={() => setIsMegaOpen(false)}>
                    <div className="mega-content">
                      <div className="mega-title">{item.title}</div>
                      <div className="mega-desc">{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mega-col">
                <div className="mega-col-title">{mobileMenu.labels.about}</div>
                {mobileMenu.about.map((item) => (
                  <Link key={`mega-${item.href}`} href={item.href} className="mega-item" onClick={() => setIsMegaOpen(false)}>
                    <div className="mega-content">
                      <div className="mega-title">{item.title}</div>
                      <div className="mega-desc">{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧功能区：语言切换 + 登录/联系按钮 + 汉堡菜单（仅移动端可见） */}
          <div className="nav-cta">
            <LanguageSwitcher />
            <a href="#" className="btn btn-ghost btn-sm">{t('common.btn.login')}</a>
            <Link href="/about#contact" className="btn btn-primary btn-sm">{t('common.btn.contact')}</Link>
            <button
              type="button"
              className={`hamburger-btn${isDrawerOpen ? ' active' : ''}`}
              aria-label={isEn ? 'Menu' : '菜单'}
              aria-controls="mobile-drawer"
              onClick={() => setIsDrawerOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/*
        ====== 移动端侧边抽屉 ======
        在 ≤1100px 时可见，由汉堡按钮控制开关。
        内部结构按"首页 / 产品 / 开发者 / 关于"分组展示子链接。
      */}
      <div id="mobile-drawer" className={`mobile-drawer${isDrawerOpen ? ' open' : ''}`}>
        <div className="mobile-drawer-section">
          <Link href="/" className="mobile-drawer-item" onClick={closeDrawer}>
            <div className="mobile-drawer-body">
              <div className="mobile-drawer-name">{mobileMenu.labels.home}</div>
            </div>
          </Link>
        </div>

        <div className="mobile-drawer-section">
          <div className="mobile-drawer-title">{mobileMenu.labels.products}</div>
          {mobileMenu.products.map((item) => (
            <Link key={item.href} href={item.href} className="mobile-drawer-item" onClick={closeDrawer}>
              <div className="mobile-drawer-body">
                <div className="mobile-drawer-name">{item.title}</div>
                <div className="mobile-drawer-desc">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mobile-drawer-section">
          <div className="mobile-drawer-title">{mobileMenu.labels.developer}</div>
          {mobileMenu.developer.map((item) => (
            <Link key={item.href} href={item.href} className="mobile-drawer-item" onClick={closeDrawer}>
              <div className="mobile-drawer-body">
                <div className="mobile-drawer-name">{item.title}</div>
                <div className="mobile-drawer-desc">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mobile-drawer-section">
          <div className="mobile-drawer-title">{mobileMenu.labels.about}</div>
          {mobileMenu.about.map((item) => (
            <Link key={item.href} href={item.href} className="mobile-drawer-item" onClick={closeDrawer}>
              <div className="mobile-drawer-body">
                <div className="mobile-drawer-name">{item.title}</div>
                <div className="mobile-drawer-desc">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* 抽屉底部的 CTA 按钮 */}
        <div className="mobile-drawer-cta">
          <a href="#" className="btn btn-ghost" onClick={closeDrawer}>{t('common.btn.login')}</a>
          <Link href="/about#contact" className="btn btn-primary" onClick={closeDrawer}>{t('common.btn.contact')}</Link>
        </div>
      </div>
    </>
  );
}

