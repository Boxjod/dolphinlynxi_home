'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

type TocItem = {
  id: string;
  title: string;
};

const TOC_PATH_WHITELIST = new Set(['/', '/products', '/developer', '/about']);

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
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [ready, setReady] = useState(false);

  const tocTitle = useMemo(
    () => (i18n.language?.toLowerCase().startsWith('en') ? 'On this page' : '本页章节'),
    [i18n.language],
  );

  const isWhitelistedPath = useMemo(() => {
    const normalizedPath = normalizePath(pathname || '/');
    return TOC_PATH_WHITELIST.has(normalizedPath);
  }, [pathname]);

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
      const validSections = sections.filter((section) => section.querySelector('.section-title'));

      if (validSections.length < 3) {
        setItems([]);
        setActiveId('');
        return;
      }

      const nextItems: TocItem[] = validSections
        .map((section, index) => {
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
