'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_HREFS = [
  { href: '/',          key: 'nav.home' },
  { href: '/products',  key: 'nav.products' },
  { href: '/developer', key: 'nav.developer' },
  { href: '/about',     key: 'nav.about' },
];

export default function Nav({ active }: { active?: string }) {
  const { t, i18n } = useTranslation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const isEn = i18n.language?.toLowerCase().startsWith('en');
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    document.body.classList.toggle('drawer-open', isDrawerOpen);
    return () => document.body.classList.remove('drawer-open');
  }, [isDrawerOpen]);

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

  const openMega = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setIsMegaOpen(true);
  };

  const closeMegaDelayed = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => setIsMegaOpen(false), 140);
  };

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-brand" onClick={closeDrawer}>
            <img src="/assets/logo.png" alt="Dolphin Lynxi" />
            <div className="nav-brand-text">
              <span>{t('nav.brand')}</span>
              <div className="nav-brand-sub">{t('nav.brandSub')}</div>
            </div>
          </Link>

          <div
            className={`nav-links nav-links-with-mega${isMegaOpen ? ' mega-open' : ''}`}
            onMouseEnter={openMega}
            onMouseLeave={closeMegaDelayed}
          >
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

        <div className="mobile-drawer-cta">
          <a href="#" className="btn btn-ghost" onClick={closeDrawer}>{t('common.btn.login')}</a>
          <Link href="/about#contact" className="btn btn-primary" onClick={closeDrawer}>{t('common.btn.contact')}</Link>
        </div>
      </div>
    </>
  );
}

