import React, {useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';

import styles from './DocsLayout.module.css';
import logoImage from '../../../transparent-background-with-black-text.png';

const methodBadgeClass = {
  GET: styles.methodGet,
  POST: styles.methodPost,
  PUT: styles.methodPut,
  DELETE: styles.methodDelete,
  WS: styles.methodWs,
};

function scrollToTarget(targetId, onNavigate) {
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

  return (
    <div className={styles.sidebarGroup}>
      <p className={styles.sidebarGroupTitle}>{title}</p>
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
                  data-sidebar-item={link.targetId ?? key}
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
                onClick={() => scrollToTarget(link.targetId, onNavigate)}
                data-sidebar-item={link.targetId}
                data-sidebar-active={isActive ? 'true' : undefined}
              >
                {content}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function IntegrationPanel({integration}) {
  const {
    title = 'Quick Integration',
    description,
    languages: legacyLanguages = [],
    defaultLanguage,
    apis = [],
    defaultApi,
  } = integration;

  const hasApis = apis.length > 0;

  const initialApi = useMemo(() => {
    if (!hasApis) {
      return null;
    }
    if (defaultApi) {
      const found = apis.find(api => api.id === defaultApi);
      if (found) {
        return found;
      }
    }
    return apis[0] ?? null;
  }, [apis, defaultApi, hasApis]);

  const [selectedApiId, setSelectedApiId] = useState(() => initialApi?.id ?? null);

  useEffect(() => {
    if (!hasApis) {
      return;
    }
    setSelectedApiId(prev => {
      if (prev && apis.some(api => api.id === prev)) {
        return prev;
      }
      return initialApi?.id ?? null;
    });
  }, [apis, initialApi, hasApis]);

  const selectedApi = useMemo(() => {
    if (!hasApis) {
      return null;
    }
    return apis.find(api => api.id === selectedApiId) ?? initialApi ?? apis[0] ?? null;
  }, [apis, selectedApiId, initialApi, hasApis]);

  const resolveInitialLanguage = (languageOptions, preferred) => {
    if (!languageOptions?.length) {
      return null;
    }
    if (preferred) {
      const found = languageOptions.find(option => option.id === preferred);
      if (found) {
        return found;
      }
    }
    if (defaultLanguage) {
      const fallback = languageOptions.find(option => option.id === defaultLanguage);
      if (fallback) {
        return fallback;
      }
    }
    return languageOptions[0] ?? null;
  };

  const activeLanguages = hasApis ? selectedApi?.languages ?? [] : legacyLanguages;

  const [selectedLanguageId, setSelectedLanguageId] = useState(() => {
    if (hasApis) {
      return resolveInitialLanguage(initialApi?.languages ?? [], initialApi?.defaultLanguage)?.id ?? null;
    }
    return resolveInitialLanguage(legacyLanguages, defaultLanguage)?.id ?? null;
  });

  useEffect(() => {
    if (!activeLanguages.length) {
      setSelectedLanguageId(null);
      return;
    }
    setSelectedLanguageId(prev => {
      if (prev && activeLanguages.some(lang => lang.id === prev)) {
        return prev;
      }
      const next = hasApis
        ? resolveInitialLanguage(activeLanguages, selectedApi?.defaultLanguage)
        : resolveInitialLanguage(activeLanguages, defaultLanguage);
      return next?.id ?? null;
    });
  }, [activeLanguages, hasApis, selectedApi, defaultLanguage]);

  const selectedLanguage = activeLanguages.find(lang => lang.id === selectedLanguageId) ?? null;

  if (hasApis && !selectedApi) {
    return null;
  }

  if (!hasApis && !selectedLanguage) {
    return null;
  }

  const apiSelectId = 'integration-api';
  const languageSelectId = 'integration-language';

  return (
    <aside className={styles.integration}>
      <div className={styles.integrationInner}>
        <h2>{title}</h2>
        {description && <p className={styles.integrationDescription}>{description}</p>}

        {hasApis && (
          <>
            <label className={styles.integrationLabel} htmlFor={apiSelectId}>
              API Endpoint
            </label>
            <select
              id={apiSelectId}
              className={styles.integrationSelect}
              value={selectedApi?.id ?? ''}
              onChange={event => setSelectedApiId(event.target.value)}
            >
              {apis.map(api => (
                <option key={api.id} value={api.id}>
                  {api.label}
                </option>
              ))}
            </select>
          </>
        )}

        {activeLanguages.length > 0 && (
          <>
            <label className={styles.integrationLabel} htmlFor={languageSelectId}>
              Language
            </label>
            <select
              id={languageSelectId}
              className={styles.integrationSelect}
              value={selectedLanguage?.id ?? ''}
              onChange={event => setSelectedLanguageId(event.target.value)}
            >
              {activeLanguages.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.label}
                </option>
              ))}
            </select>
          </>
        )}

        {selectedLanguage && (
          <CopyableCode language={selectedLanguage.language}>{selectedLanguage.code}</CopyableCode>
        )}
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
  const hasIntegration = Boolean(
    (integration?.languages?.length ?? 0) > 0 || (integration?.apis?.length ?? 0) > 0,
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const [isHeaderElevated, setIsHeaderElevated] = useState(false);
  const headerRef = useRef(null);
  const sidebarRef = useRef(null);

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
    if (typeof window === 'undefined') {
      return undefined;
    }
    const query = window.matchMedia('(max-width: 960px)');
    const handleChange = event => {
      setIsMobile(event.matches);
    };
    setIsMobile(query.matches);
    if (query.addEventListener) {
      query.addEventListener('change', handleChange);
      return () => query.removeEventListener('change', handleChange);
    }
    query.addListener(handleChange);
    return () => query.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return undefined;
    }

    const updateHeaderMetrics = () => {
      if (!headerRef.current) {
        return;
      }
      const height = headerRef.current.offsetHeight ?? 0;
      const offset = height + 16;
      document.documentElement.style.setProperty('--docs-header-height', `${height}px`);
      document.documentElement.style.setProperty('--docs-header-offset', `${offset}px`);
    };

    updateHeaderMetrics();

    window.addEventListener('resize', updateHeaderMetrics);
    return () => window.removeEventListener('resize', updateHeaderMetrics);
  }, []);

  useEffect(() => {
    const initial = trackedIds[0] ?? null;
    setActiveId(prev => (prev && trackedIds.includes(prev) ? prev : initial));
  }, [trackedIds]);

  useEffect(() => {
    activeRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (!hasSidebar || isMobile) {
      return undefined;
    }
    const container = sidebarRef.current;
    if (!container) {
      return undefined;
    }
    const activeItem = container.querySelector('[data-sidebar-active="true"]');
    if (!activeItem) {
      return undefined;
    }

    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const currentScroll = container.scrollTop ?? 0;
    const offset = itemRect.top - containerRect.top;
    const targetScroll = Math.max(currentScroll + offset - 12, 0);

    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });

    return undefined;
  }, [activeId, hasSidebar, isMobile]);

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
      const scrollY = window.scrollY ?? 0;
      setShowScrollTop(scrollY > 300);
      setIsHeaderElevated(scrollY > 4);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const handleOutside = event => {
      const menuEl = mobileMenuRef.current;
      const toggleEl = mobileToggleRef.current;
      if (menuEl?.contains(event.target) || toggleEl?.contains(event.target)) {
        return;
      }
      setIsMobileMenuOpen(false);
    };

    const handleEscape = event => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  const scrollToTop = () => {
    if (typeof window === 'undefined') {
      return;
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const headerText = title;
  const mobileMenuId = 'docs-mobile-menu';
  const mobileMenuToggleId = 'docs-mobile-menu-toggle';
  const isSidebarVisible = hasSidebar && !isMobile;

  return (
    <Layout noNavbar noFooter title={title} description={description}>
      <div className={styles.wrapper}>
        <header
          className={clsx(styles.header, isHeaderElevated && styles.headerScrolled)}
          ref={headerRef}
        >
          <div className={styles.headerInner}>
            <a className={styles.logo} href="https://induslabs.io/">
              <img src={logoImage} alt="Induslabs" className={styles.logoImage} />
            </a>
            <div className={styles.headerCopy}>
              <Link to="/" className={styles.headerTitleLink}>
                {headerText}
              </Link>
            </div>
            <div className={styles.headerControls}>
              {hasSidebar && isMobile && (
                <div className={styles.mobileMenuContainer}>
                  <button
                    type="button"
                    className={clsx(styles.mobileMenuButton, isMobileMenuOpen && styles.mobileMenuButtonActive)}
                    id={mobileMenuToggleId}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    aria-label="Toggle documentation navigation"
                    onClick={() => setIsMobileMenuOpen(prev => !prev)}
                    ref={mobileToggleRef}
                  >
                    <span className={styles.hamburger} aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  </button>
                  {isMobileMenuOpen && (
                    <div
                      id={mobileMenuId}
                      role="menu"
                      className={styles.mobileMenu}
                      aria-labelledby={mobileMenuToggleId}
                      ref={mobileMenuRef}
                    >
                      {sidebarSections.map(section => (
                        <div key={section.title} className={styles.mobileMenuSection}>
                          <p className={styles.mobileMenuHeading}>{section.title}</p>
                          <ul className={styles.mobileMenuList}>
                            {(section.links ?? []).map(link => {
                              const key = `${section.title}-${link.label}`;
                              const method = link.method?.toUpperCase?.();
                              const content = (
                                <>
                                  {method && <MethodBadge method={method} />}
                                  <span className={styles.mobileMenuLabel}>{link.label}</span>
                                </>
                              );

                              if (link.to) {
                                return (
                                  <li key={key}>
                                    <Link
                                      to={link.to}
                                      className={styles.mobileMenuLink}
                                      role="menuitem"
                                      onClick={() => setIsMobileMenuOpen(false)}
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
                                    className={clsx(
                                      styles.mobileMenuLink,
                                      styles.mobileMenuAction,
                                      link.targetId === activeId && styles.mobileMenuLinkActive,
                                    )}
                                    role="menuitem"
                                    onClick={() => {
                                      scrollToTarget(link.targetId, setActiveId);
                                      setIsMobileMenuOpen(false);
                                    }}
                                  >
                                    {content}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
        <div
          className={clsx(
            styles.body,
            isSidebarVisible && hasIntegration && styles.bodyThreeColumn,
            isSidebarVisible && !hasIntegration && styles.bodyTwoColumn,
            !isSidebarVisible && !hasIntegration && styles.bodySingleColumn,
            !isSidebarVisible && hasIntegration && styles.bodyTwoColumnNoSidebar,
          )}
        >
          {isSidebarVisible && (
            <aside className={styles.sidebar} ref={sidebarRef}>
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
          <span aria-hidden="true" className={styles.scrollTopIcon}>^</span>
        </button>
      )}
    </Layout>
  );
}
