/**
 * @file PageToc.tsx — 页面目录（Table of Contents）组件
 *
 * 功能概览：
 * 1. 自动扫描当前页面中所有 `section.section` 元素，提取带 `.section-title` 的章节标题，
 *    生成侧边锚点导航列表。
 * 2. 通过 IntersectionObserver 实时追踪可视区域，高亮当前所在章节。
 * 3. 点击锚点时平滑滚动到对应章节，并更新 URL hash。
 * 4. 仅在白名单路径下渲染（首页 / 产品 / 开发者 / 关于），且至少 3 个有效章节才显示，
 *    避免在内容过少的页面出现多余的目录。
 *
 * 无需传入 props，组件自行从 DOM 中采集章节信息。
 */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

/** 目录条目的数据结构 */
type TocItem = {
  id: string;
  title: string;
};

/** 只有这些路径才展示页面目录，避免在单屏页面（如登录页）产生多余 UI */
const TOC_PATH_WHITELIST = new Set(['/', '/products', '/developer', '/about']);

/**
 * 去除路径中的 locale 前缀（/zh 或 /en），
 * 统一为小写以便与白名单做精确匹配。
 */
function normalizePath(pathname: string): string {
  const lowered = pathname.toLowerCase();
  const localeMatch = lowered.match(/^\/(zh|en)(\/|$)/);
  if (!localeMatch) {
    return lowered;
  }
  const stripped = lowered.replace(/^\/(zh|en)/, '');
  return stripped || '/';
}

export default function PageToc() {
  const pathname = usePathname();
  const { i18n } = useTranslation();
  /** 从 DOM 中提取到的章节列表 */
  const [items, setItems] = useState<TocItem[]>([]);
  /** 当前滚动位置对应的高亮章节 ID */
  const [activeId, setActiveId] = useState('');
  /** 控制淡入动画：采集完成后设为 true，触发 CSS transition */
  const [ready, setReady] = useState(false);

  /** 目录标题根据语言切换 */
  const tocTitle = useMemo(
    () => (i18n.language?.toLowerCase().startsWith('en') ? 'On this page' : '本页章节'),
    [i18n.language],
  );

  /** 判断当前路径是否在白名单中 */
  const isWhitelistedPath = useMemo(() => {
    const normalizedPath = normalizePath(pathname || '/');
    return TOC_PATH_WHITELIST.has(normalizedPath);
  }, [pathname]);

  /**
   * 副作用：页面路径或语言变化后，重新扫描 DOM 中的 section 节点。
   * 使用 setTimeout(0) 等待 React 渲染完毕再采集，保证节点已挂载。
   * 如果有效章节不足 3 个则不展示目录。
   */
  useEffect(() => {
    if (!isWhitelistedPath) {
      setItems([]);
      setActiveId('');
      setReady(false);
      return;
    }

    setReady(false);

    const timer = window.setTimeout(() => {
      const sections = Array.from(document.querySelectorAll('section.section')) as HTMLElement[];
      /** 只保留包含 .section-title 的 section，排除装饰性/空白 section */
      const validSections = sections.filter((section) => section.querySelector('.section-title'));

      if (validSections.length < 3) {
        setItems([]);
        setActiveId('');
        return;
      }

      const nextItems: TocItem[] = validSections
        .map((section, index) => {
          // 没有 id 的 section 自动分配一个，确保锚点跳转可用
          if (!section.id) {
            section.id = `s-${index}`;
          }

          const titleNode = section.querySelector('.section-title');
          const title = titleNode?.textContent?.trim() ?? '';
          if (!title) {
            return null;
          }

          return { id: section.id, title };
        })
        .filter((item): item is TocItem => Boolean(item));

      if (nextItems.length < 3) {
        setItems([]);
        setActiveId('');
        return;
      }

      setItems(nextItems);
      setActiveId(nextItems[0].id);
      window.requestAnimationFrame(() => setReady(true));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname, i18n.language, isWhitelistedPath]);

  /**
   * 副作用：利用 IntersectionObserver 监听各 section 的可视状态。
   * rootMargin 设为 '-30% 0px -60% 0px'，即视口中间偏上 10% 的区域作为判定带，
   * 当用户滚动时，最先进入该区域的 section 被标记为 active。
   */
  useEffect(() => {
    if (!items.length) {
      return;
    }

    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!targets.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // 从所有处于视口内的条目中，取距顶部最近的作为当前活跃章节
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (!visible.length) {
          return;
        }

        setActiveId(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <aside className={`toc${ready ? ' ready' : ''}`}>
      <div className="toc-title">{tocTitle}</div>
      <ul className="toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`toc-item${activeId === item.id ? ' active' : ''}`}
              onClick={(event) => {
                event.preventDefault();
                const target = document.getElementById(item.id);
                if (!target) {
                  return;
                }
                // 平滑滚动到目标章节，并更新 URL hash 以支持分享链接
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.replaceState(null, '', `#${item.id}`);
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
