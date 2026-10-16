import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

import { navigationData, consultationCTA } from '../data/navigationData';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Editorial header, v2                                               */
/*  Palette: obsidian #0B0B0F, sand #F3EDE4, copper #C8693A,           */
/*           champagne #E8D5B0                                         */
/*  Layout: one full-width bar (logo | centred index nav | actions).   */
/*  Services opens a full-width mega panel under the bar.              */
/*  Phones and tablets get a split-screen menu that opens with a       */
/*  circular reveal from the menu button.                              */
/*  GSAP: entrance, scrubbed progress line, magnetic CTA, line rise.   */
/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1];
const COPPER = '#E53935';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E53935]';

const ROLL_EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]';

/* Two stacked copies of a label that roll upward on hover / focus */
const Roll = ({ children }) => (
  <span className="relative block overflow-hidden">
    <span
      className={`block transition-transform duration-500 ${ROLL_EASE} group-hover/nav:-translate-y-full group-focus-visible/nav:-translate-y-full`}
    >
      {children}
    </span>
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 top-full block transition-transform duration-500 ${ROLL_EASE} group-hover/nav:-translate-y-full group-focus-visible/nav:-translate-y-full`}
    >
      {children}
    </span>
  </span>
);

/* Pulls its child toward the cursor (GSAP quickTo, no React re-renders) */
const Magnetic = ({ children, strength = 0.3, className = '' }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const qx = useRef(null);
  const qy = useRef(null);

  useEffect(() => {
    if (reduced || !ref.current) return undefined;
    qx.current = gsap.quickTo(ref.current, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    qy.current = gsap.quickTo(ref.current, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    return () => gsap.killTweensOf(ref.current);
  }, [reduced]);

  const move = (e) => {
    if (reduced || e.pointerType === 'touch' || !qx.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    qx.current((e.clientX - (r.left + r.width / 2)) * strength);
    qy.current((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    qx.current?.(0);
    qy.current?.(0);
  };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={className}>
      {children}
    </div>
  );
};

/* Simple dropdown: a small card with a plain list of links */
const SlimMenu = ({ panel, panelId, onNavigate }) => {
  const items = panel.item.children || [];
  return (
    <div className="absolute left-1/2 top-full z-50 w-[240px] -translate-x-1/2 pt-3">
      <motion.ul
        id={panelId}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
        transition={{ duration: 0.3, ease: EASE }}
        className="m-0 list-none rounded-2xl border border-[#574A24]/40 bg-[#0E0C0A]/95 p-2 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
      >
        {items.map((child) => (
          <li key={child.id}>
            <Link
              to={child.path}
              onClick={onNavigate}
              className={`group flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 font-sans text-[13px] font-medium normal-case tracking-normal text-white transition-colors duration-200 hover:bg-[#574A24]/30 hover:text-white focus-visible:bg-[#574A24]/30 focus-visible:text-white ${FOCUS}`}
            >
              {child.label}
              <ArrowUpRight
                size={14}
                strokeWidth={2.4}
                aria-hidden="true"
                className="shrink-0 text-[#E53935] opacity-80 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              />
            </Link>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

/* One nav entry. Lives outside Header so it is not re-created on every render,
   which keeps keyboard focus stable. */
const NavEntry = ({ l, dropdown, setDropdown, openDrop, closeSoon, scrollToHash, triggerRef, panelId, index, panel, closeAll }) => {
  const isOpen = !!l.drop && dropdown === l.drop;
  const base = `group/nav relative inline-flex items-center gap-2 px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-opacity duration-300 group-hover/list:opacity-60 hover:!opacity-100 focus-visible:!opacity-100 ${FOCUS}`;

  const inner = (active) => (
    <>
      <span aria-hidden="true" className="font-sans text-[9px] font-bold tabular-nums tracking-normal text-[#E53935]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <Roll>{l.label}</Roll>
      {l.drop && (
        <svg
          aria-hidden="true"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#E53935]' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      )}
      <span
        aria-hidden="true"
        className={`absolute inset-x-4 -bottom-0.5 h-[2px] origin-left bg-[#E53935] transition-transform duration-500 ${ROLL_EASE} ${active || isOpen ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
          }`}
      />
    </>
  );

  if (l.drop) {
    return (
      <li className="relative" onMouseEnter={() => openDrop(l.drop)} onMouseLeave={closeSoon}>
        <button
          ref={triggerRef}
          type="button"
          className={base}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls={panelId}
          onClick={() => setDropdown((p) => (p === l.drop ? null : l.drop))}
        >
          {inner(false)}
        </button>
        <AnimatePresence>
          {isOpen && panel?.item && <SlimMenu panel={panel} panelId={panelId} onNavigate={closeAll} />}
        </AnimatePresence>
      </li>
    );
  }

  return (
    <li onMouseEnter={() => dropdown && closeSoon()}>
      <NavLink
        to={l.to}
        onClick={(e) => {
          if (scrollToHash(l.to)) e.preventDefault();
        }}
        className={base}
      >
        {({ isActive }) => inner(isActive && !l.to.includes('#'))}
      </NavLink>
    </li>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [expanded, setExpanded] = useState({});

  const reduced = useReducedMotion();
  const location = useLocation();
  const wrapRef = useRef(null);
  const closeTimer = useRef(null);
  const triggerRef = useRef(null);
  const menuBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);
  const progressRef = useRef(null);

  const servicesItem = navigationData.find((i) => i.id === 'consultancy-services');

  const panels = {
    services: {
      label: 'Our Services',
      note: 'Events, venues, stays and consulting, planned around your vision.',
      item: servicesItem
    }
  };

  const links = [
    { key: 'about', to: '/about', label: 'About' },
    { key: 'services', drop: 'services', to: '/#services', label: 'Services' },
    { key: 'projects', to: '/projects', label: 'Portfolio' },
    { key: 'standard', to: '/standard', label: 'The Standard' },
    { key: 'blog', to: '/blog', label: 'Insights' },
    { key: 'contact', to: '/contact', label: 'Contact' }
  ];

  /* GSAP entrance (before paint) */
  useLayoutEffect(() => {
    if (reduced || !wrapRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.js-in', {
        y: -28,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.09,
        delay: 0.1,
        clearProps: 'transform,opacity,visibility'
      });
    }, wrapRef);
    return () => ctx.revert();
  }, [reduced]);

  /* GSAP progress line scrubbed to the page scroll */
  useEffect(() => {
    if (!progressRef.current) return undefined;
    const tween = gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: reduced ? true : 0.4 } }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, location.pathname]);

  /* sticky bar: switches to the transparent glass state after a short scroll */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const down = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setDropdown(null);
    };
    document.addEventListener('mousedown', down);
    return () => document.removeEventListener('mousedown', down);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* Escape closes whatever is open and hands focus back */
  useEffect(() => {
    const key = (e) => {
      if (e.key !== 'Escape') return;
      if (mobileOpen) {
        setMobileOpen(false);
        menuBtnRef.current?.focus();
      } else if (dropdown) {
        setDropdown(null);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [mobileOpen, dropdown]);

  useEffect(() => {
    setMobileOpen(false);
    setDropdown(null);
  }, [location.pathname]);

  /* Arriving on "/" with a #hash: scroll to that section */
  useEffect(() => {
    if (!location.hash) return undefined;
    const t = setTimeout(() => {
      try {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      } catch (err) {
        /* invalid selector: ignore */
      }
    }, 150);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash, reduced]);

  /* GSAP: mask-rise lines and footer reveal when the menu opens */
  useLayoutEffect(() => {
    if (!mobileOpen || reduced || !dialogRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.m-line',
        { yPercent: 115 },
        { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.07, delay: 0.4 }
      );
      gsap.fromTo(
        '.m-fade',
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.1, delay: 0.65 }
      );
    }, dialogRef);
    return () => ctx.revert();
  }, [mobileOpen, reduced]);

  /* Menu focus management: move focus in, trap Tab, restore on close */
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const t = setTimeout(() => closeBtnRef.current?.focus(), 60);
    const trap = (e) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const nodes = dialogRef.current.querySelectorAll('a[href], button:not([disabled])');
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', trap);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', trap);
    };
  }, [mobileOpen]);

  const openDrop = useCallback((k) => {
    clearTimeout(closeTimer.current);
    setDropdown(k);
  }, []);
  const closeSoon = useCallback(() => {
    closeTimer.current = setTimeout(() => setDropdown(null), 180);
  }, []);

  const ctaPath = consultationCTA?.path || '/contact';

  const scrollToHash = (targetPath) => {
    if (targetPath?.includes('#')) {
      const hash = targetPath.substring(targetPath.indexOf('#'));
      if (location.pathname === '/') {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
          window.history.pushState(null, '', targetPath);
          return true;
        }
      }
    }
    return false;
  };

  const skipToContent = (e) => {
    e.preventDefault();
    const main = document.querySelector('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: false });
    }
  };

  const circleFrom = 'circle(0% at calc(100% - 2.25rem) 2.25rem)';
  const circleTo = 'circle(150% at calc(100% - 2.25rem) 2.25rem)';

  return (
    <>
      <a
        href="#main"
        onClick={skipToContent}
        className="fixed left-4 top-4 z-[70] -translate-y-24 bg-[#CBBD93] px-5 py-3 font-sans text-sm font-bold text-[#574A24] transition-transform focus:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAE8B4]"
      >
        Skip to content
      </a>

      <header ref={wrapRef} className="fixed inset-x-0 top-0 z-50">
        <div
          className={`relative border-b transition-[background-color,border-color,padding,backdrop-filter] duration-500 ${scrolled
              ? 'border-[#574A24]/40 bg-[#0C0A08]/92 py-3 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85)]'
              : 'border-transparent bg-gradient-to-b from-[#0A0806]/90 via-[#221811]/45 to-transparent py-5'
            }`}
        >
          <div className="mx-auto grid max-w-[96rem] grid-cols-[auto_1fr_auto] items-center gap-6 px-5 sm:px-8 lg:px-12">
            {/* brand: monogram + spaced wordmark */}
            <Link
              to="/"
              aria-label="S4Consultancy Home"
              className={`js-in group flex items-center gap-3 ${FOCUS}`}
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#E53935] bg-[#1E1610] font-display text-[13px] font-black tracking-tight text-white transition-colors duration-500 group-hover:bg-[#E53935] group-hover:border-[#E53935] group-hover:text-white shadow-md shadow-red-900/30"
              >
                S4
              </span>
              <span
                aria-hidden="true"
                className="hidden font-display text-[13px] font-semibold uppercase tracking-[0.28em] text-white sm:block"
              >
                Consultancy
              </span>
            </Link>

            {/* centred index navigation */}
            <nav aria-label="Primary Navigation" className="js-in hidden justify-center lg:flex">
              <ul className="group/list m-0 flex list-none items-center p-0">
                {links.map((l, i) => (
                  <NavEntry
                    key={l.key}
                    l={l}
                    index={i}
                    dropdown={dropdown}
                    setDropdown={setDropdown}
                    openDrop={openDrop}
                    closeSoon={closeSoon}
                    scrollToHash={scrollToHash}
                    triggerRef={l.drop ? triggerRef : undefined}
                    panelId="nav-panel"
                    panel={l.drop ? panels[l.drop] : undefined}
                    closeAll={() => setDropdown(null)}
                  />
                ))}
              </ul>
            </nav>
            <span className="lg:hidden" aria-hidden="true" />

            {/* actions */}
            <div className="js-in col-start-3 flex items-center gap-3">
              <Magnetic className="hidden sm:block">
                <Link
                  to={ctaPath}
                  onClick={(e) => {
                    if (scrollToHash(ctaPath)) e.preventDefault();
                  }}
                  className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#574A24] bg-[#1A140E] py-2.5 pl-6 pr-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-md transition-all duration-300 hover:border-[#E53935] ${FOCUS}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 -translate-x-full bg-[#E53935] transition-transform duration-500 ${ROLL_EASE} group-hover:translate-x-0 group-focus-visible:translate-x-0`}
                  />
                  <span className="relative whitespace-nowrap text-white transition-colors duration-500">
                    Book a call
                  </span>
                  <span className="relative grid h-7 w-7 place-items-center rounded-full bg-[#E53935] text-white transition-transform duration-500 group-hover:bg-black group-hover:rotate-45">
                    <ArrowUpRight size={14} strokeWidth={2.6} aria-hidden="true" />
                  </span>
                </Link>
              </Magnetic>

              <button
                ref={menuBtnRef}
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-haspopup="dialog"
                className={`group flex h-11 items-center gap-3 rounded-full border border-[#574A24] bg-[#1A140E] pl-5 pr-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-[#E53935] lg:hidden ${FOCUS}`}
              >
                Menu
                <span aria-hidden="true" className="flex flex-col gap-[5px]">
                  <span className="h-px w-5 bg-white transition-all duration-300 group-hover:w-4" />
                  <span className="h-px w-5 bg-[#E53935] transition-all duration-300 group-hover:w-6" />
                </span>
              </button>
            </div>
          </div>

          {/* scroll progress hairline */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10">
            <span
              ref={progressRef}
              className="block h-full origin-left"
              style={{ background: '#E53935', transform: 'scaleX(0)' }}
            />
          </span>

        </div>
      </header>

      {/* split-screen menu for phones and tablets */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={dialogRef}
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-[#0A0806] text-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={reduced ? { opacity: 0 } : { clipPath: circleFrom }}
            animate={reduced ? { opacity: 1 } : { clipPath: circleTo }}
            exit={reduced ? { opacity: 0 } : { clipPath: circleFrom }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#574A24]/30 blur-[100px]"
                animate={reduced ? undefined : { x: [0, -40, 0], y: [0, 30, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#E53935]/20 blur-[100px]"
                animate={reduced ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <div className="relative flex items-center justify-between px-5 pb-3 pt-5 sm:px-8">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                aria-label="S4Consultancy Home"
                className={`flex items-center gap-3 ${FOCUS}`}
              >
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#E53935] bg-[#1E1610] font-display text-[13px] font-black text-white shadow-md shadow-red-950/40"
                >
                  S4
                </span>
                <span
                  aria-hidden="true"
                  className="font-display text-[13px] font-semibold uppercase tracking-[0.28em] text-white"
                >
                  Consultancy
                </span>
              </Link>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  menuBtnRef.current?.focus();
                }}
                aria-label="Close menu"
                className={`group relative flex h-11 items-center gap-3 rounded-full border border-[#574A24] bg-[#1A140E] pl-5 pr-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-[#E53935] ${FOCUS}`}
              >
                Close
                <span aria-hidden="true" className="relative h-4 w-5">
                  <span className="absolute left-0 top-1/2 h-px w-5 rotate-45 bg-white" />
                  <span className="absolute left-0 top-1/2 h-px w-5 -rotate-45 bg-[#E53935]" />
                </span>
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-5 pt-6 sm:px-8">
              <ul className="m-0 list-none p-0">
                {navigationData.map((item, idx) => {
                  const hasSub = item.isExpandable && item.children?.length > 0;
                  const open = !!expanded[item.id];
                  const rowCls = `flex w-full items-center justify-between gap-4 py-3.5 text-left font-display text-[2.4rem] font-black leading-none tracking-[-0.045em] text-white hover:text-white ${FOCUS}`;
                  const num = (
                    <span
                      aria-hidden="true"
                      className="mr-4 inline-block w-7 align-middle font-sans text-[11px] font-bold tabular-nums tracking-normal text-[#E53935]"
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  );
                  return (
                    <li key={item.id} className="border-b border-white/10">
                      <div className="overflow-hidden">
                        <div className="m-line">
                          {hasSub ? (
                            <button
                              type="button"
                              onClick={() => setExpanded((p) => ({ ...p, [item.id]: !p[item.id] }))}
                              aria-expanded={open}
                              aria-controls={`sub-${item.id}`}
                              className={rowCls}
                            >
                              <span>
                                {num}
                                {item.label}
                              </span>
                              <motion.span
                                aria-hidden="true"
                                animate={{ rotate: open ? 45 : 0 }}
                                transition={{ duration: 0.4, ease: EASE }}
                                className="text-[#E53935]"
                              >
                                <ArrowUpRight size={26} />
                              </motion.span>
                            </button>
                          ) : (
                            <NavLink
                              to={item.path}
                              onClick={(e) => {
                                setMobileOpen(false);
                                if (scrollToHash(item.path)) e.preventDefault();
                              }}
                              className={({ isActive }) =>
                                `${rowCls} ${isActive && !item.path?.includes('#') ? '!text-[#E53935]' : ''}`
                              }
                            >
                              <span>
                                {num}
                                {item.label}
                              </span>
                              <ArrowUpRight size={26} aria-hidden="true" className="text-white/35" />
                            </NavLink>
                          )}
                        </div>
                      </div>
                      {hasSub && (
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.ul
                              id={`sub-${item.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: EASE }}
                              className="m-0 list-none overflow-hidden p-0"
                            >
                              {item.children.map((sub) => (
                                <li key={sub.id}>
                                  <Link
                                    to={sub.path}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center justify-between py-2.5 pl-11 font-sans text-base text-white/90 transition-colors hover:text-[#E53935] ${FOCUS}`}
                                  >
                                    {sub.label}
                                    <ArrowUpRight size={15} aria-hidden="true" className="text-[#E53935]" />
                                  </Link>
                                </li>
                              ))}
                              <li className="pb-3" aria-hidden="true" />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative px-5 pb-8 pt-5 sm:px-8">
              <Link
                to={ctaPath}
                onClick={(e) => {
                  setMobileOpen(false);
                  if (scrollToHash(ctaPath)) e.preventDefault();
                }}
                className={`m-fade group flex items-center justify-between rounded-full bg-[#E53935] py-2 pl-7 pr-2 font-sans text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-red-950/40 transition-colors hover:bg-[#c92a2a] ${FOCUS}`}
              >
                {consultationCTA?.label || 'Book a consultation'}
                <span className="grid h-11 w-11 place-items-center rounded-full bg-black text-white transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
                </span>
              </Link>
              <div className="m-fade mt-5 flex flex-col gap-1 font-sans text-xs text-white/75">
                <a href="tel:+919876543210" className={`transition-colors hover:text-white ${FOCUS}`}>
                  +91 (0) 98765 43210
                </a>
                <a href="mailto:inquiry@s4consultancy.com" className={`transition-colors hover:text-white ${FOCUS}`}>
                  inquiry@s4consultancy.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;