import React, {useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import {useColorMode} from '@docusaurus/theme-common';

import styles from './DocsLayout.module.css';
import logoImage from '../../../transparent-background-with-black-text.png';

const methodBadgeClass = {
  GET: styles.methodGet,
  POST: styles.methodPost,
  PUT: styles.methodPut,
  DELETE: styles.methodDelete,
};

function ThemeToggle() {
  const {colorMode, setColorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <button
      type="button"
      className={styles.themeButton}
      onClick={() => setColorMode(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className={styles.themeIcon}>{isDark ? '☀️' : '🌙'}</span>
    </button>
  );
}

export function MethodBadge({method = 'POST'}) {
  const normalized = method?.toUpperCase?.() ?? 'POST';
  return (
    <span className={clsx(styles.methodBadge, methodBadgeClass[normalized])}>{normalized}</span>
  );
}

function SidebarGroup({title, links, activeId, onNavigate}) {
  if (!links?.length) {
    return null;
  }

  const handleScroll = targetId => {
    if (typeof window === 'undefined' || !targetId) {
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
      if (typeof history !== 'undefined' && history.replaceState) {
        const url = `${window.location.pathname}#${targetId}`;
        history.replaceState(null, '', url);
      }
      if (onNavigate) {
        onNavigate(targetId);
      }
    }
  };

  return (
    <details open className={styles.sidebarGroup}>
      <summary>{title}</summary>
      <ul className={styles.sidebarList}>
        {links.map(link => {
          const key = `${title}-${link.label}`;
          const isActive = Boolean(link.targetId && link.targetId === activeId);
          const method = link.method?.toUpperCase?.();
          const badgeClass = method ? methodBadgeClass[method] : null;
          const content = (
            <>
              {method && <span className={clsx(styles.sidebarMethod, badgeClass)}>{method}</span>}
              <span className={styles.sidebarLabelText}>{link.label}</span>
            </>
          );

          if (link.to) {
            return (
              <li key={key}>
                <Link
                  className={clsx(styles.sidebarLink, isActive && styles.sidebarLinkActive)}
                  to={link.to}
                >
                  {content}
                </Link>
              </li>
            );
          }

          return (
            <li key={key}>
              <button
                type="button"
                className={clsx(styles.sidebarLink, styles.sidebarButton, isActive && styles.sidebarLinkActive)}
                onClick={() => handleScroll(link.targetId)}
              >
                {content}
              </button>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

function IntegrationPanel({integration}) {
  const {title = 'Quick Integration', description, languages = [], defaultLanguage} = integration;
  const initial = useMemo(() => {
    if (defaultLanguage) {
      return languages.find(lang => lang.id === defaultLanguage) ?? languages[0];
    }
    return languages[0];
  }, [languages, defaultLanguage]);

  const [selected, setSelected] = useState(initial);

  useEffect(() => {
    setSelected(initial);
  }, [initial]);

  if (!selected) {
    return null;
  }

  return (
    <aside className={styles.integration}>
      <div className={styles.integrationInner}>
        <h2>{title}</h2>
        {description && <p className={styles.integrationDescription}>{description}</p>}
        <label className={styles.integrationLabel} htmlFor="integration-language">
          Language
        </label>
        <select
          id="integration-language"
          className={styles.integrationSelect}
          value={selected.id}
          onChange={event => {
            const next = languages.find(lang => lang.id === event.target.value);
            setSelected(next ?? selected);
          }}
        >
          {languages.map(lang => (
            <option key={lang.id} value={lang.id}>
              {lang.label}
            </option>
          ))}
        </select>
        <CodeBlock language={selected.language}>{selected.code}</CodeBlock>
      </div>
    </aside>
  );
}

export default function DocsLayout({
  title,
  description,
  sidebarSections = [],
  children,
  integration,
}) {
  const hasSidebar = sidebarSections.some(section => section?.links?.length);
  const hasIntegration = Boolean(integration?.languages?.length);

  const trackedIds = useMemo(
    () =>
      sidebarSections
        .flatMap(section => section.links ?? [])
        .map(link => link.targetId)
        .filter(Boolean),
    [sidebarSections],
  );

  const [activeId, setActiveId] = useState(() => trackedIds[0] ?? null);
  const activeRef = useRef(activeId);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const initial = trackedIds[0] ?? null;
    setActiveId(prev => (prev && trackedIds.includes(prev) ? prev : initial));
  }, [trackedIds]);

  useEffect(() => {
    activeRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    if (!trackedIds.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries => {
        let nextId = activeRef.current;
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          nextId = visible[0].target.id;
        } else {
          const closest = entries.reduce((closestEntry, entry) => {
            const currentDistance = Math.abs(entry.boundingClientRect.top);
            const closestDistance = closestEntry ? Math.abs(closestEntry.boundingClientRect.top) : Infinity;
            return currentDistance < closestDistance ? entry : closestEntry;
          }, null);
          if (closest) {
            nextId = closest.target.id;
          }
        }

        if (nextId && nextId !== activeRef.current) {
          activeRef.current = nextId;
          setActiveId(nextId);
        }
      },
      {
        rootMargin: '-55% 0px -35% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const observedElements = trackedIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    observedElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [trackedIds]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window === 'undefined') {
      return;
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <Layout noNavbar noFooter title={title} description={description}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <a className={styles.logo} href="https://induslabs.io/">
              <img src={logoImage} alt="Induslabs" className={styles.logoImage} />
            </a>
            <div className={styles.headerCopy}>
              <p className={styles.headerTitle}>{title}</p>
              {description && <p className={styles.headerTagline}>{description}</p>}
            </div>
            <div className={styles.headerControls}>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <div
          className={clsx(
            styles.body,
            hasSidebar && hasIntegration && styles.bodyThreeColumn,
            hasSidebar && !hasIntegration && styles.bodyTwoColumn,
            !hasSidebar && !hasIntegration && styles.bodySingleColumn,
            !hasSidebar && hasIntegration && styles.bodyTwoColumnNoSidebar,
          )}
        >
          {hasSidebar && (
            <aside className={styles.sidebar}>
              {sidebarSections.map(section => (
                <SidebarGroup
                  key={section.title}
                  title={section.title}
                  links={section.links}
                  activeId={activeId}
                  onNavigate={setActiveId}
                />
              ))}
            </aside>
          )}
          <div className={styles.content}>{children}</div>
          {hasIntegration && <IntegrationPanel integration={integration} />}
        </div>
      </div>
      {showScrollTop && (
        <button
          type="button"
          className={styles.scrollTopButton}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          Top
        </button>
      )}
    </Layout>
  );
}
