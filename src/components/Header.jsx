import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, X, Menu } from 'lucide-react';

import { navigationData, consultationCTA } from '../data/navigationData';

/* ------------------------------------------------------------------ */
/*  Three floating islands.                                            */
/*  Brand, navigation and actions each sit in their own frosted        */
/*  ivory pill that floats over the page. A dark pill slides under     */
/*  whichever link you hover. Services and Sectors open a curtain      */
/*  panel that unrolls from the bar. On phones a full-screen menu      */
/*  drops down and each line rises out of a mask.                      */
/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1];
const INK = '#0F2322';
const PLUM = '#46344E';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46344E]';
const FOCUS_DARK =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAED26]';

const island =
  'rounded-full border border-white/50 bg-[#ECEBE4]/85 shadow-[0_10px_40px_-12px_rgba(10,24,25,0.45)] backdrop-blur-xl';

const panelV = { hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } } };
const panelItemV = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const menuV = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } } };
const riseV = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [expanded, setExpanded] = useState({});

  const reduced = useReducedMotion();
  const location = useLocation();
  const wrapRef = useRef(null);
  const closeTimer = useRef(null);
  const lastY = useRef(0);

  const servicesItem = navigationData.find((i) => i.id === 'consultancy-services');
  const sectorsItem = navigationData.find((i) => i.id === 'industries');

  const panels = {
    services: {
      label: 'Our Services',
      note: 'Events, venues, stays and consulting, planned around your vision.',
      item: servicesItem,
      to: '/services',
      cta: 'All services',
    },
    sectors: {
      label: 'Sectors',
      note: 'The industries and occasions we work in every day.',
      item: sectorsItem,
      to: '/projects',
      cta: 'View portfolio',
    },
  };

  const links = [
    { key: 'about', to: '/about', label: 'About' },
    { key: 'services', drop: 'services', label: 'Services' },
    { key: 'sectors', drop: 'sectors', label: 'Sectors' },
    { key: 'projects', to: '/projects', label: 'Portfolio' },
    { key: 'standard', to: '/standard', label: 'The Standard' },
    { key: 'blog', to: '/blog', label: 'Insights' },
    { key: 'contact', to: '/contact', label: 'Contact' },
  ];

  /* hide on scroll down, return on scroll up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - lastY.current) > 6) setHidden(y > lastY.current && y > 260);
      lastY.current = y;
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

  useEffect(() => {
    const key = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setDropdown(null);
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdown(null);
  }, [location.pathname]);

  const openDrop = (k) => {
    clearTimeout(closeTimer.current);
    setDropdown(k);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setDropdown(null), 180);
  };

  const ctaPath = consultationCTA?.path || '/contact';

  /* one nav entry: link or dropdown trigger, sharing the sliding pill */
  const Entry = ({ l }) => {
    const isHot = hovered === l.key;
    const isOpen = l.drop && dropdown === l.drop;
    const base = `relative inline-flex items-center gap-1 rounded-full px-4 py-2 font-sans text-[13px] font-semibold ${FOCUS}`;
    const inner = (active) => (
      <>
        {isHot && (
          <motion.span
            layoutId="nav-pill"
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            className="absolute inset-0 rounded-full"
            style={{ background: INK }}
          />
        )}
        <span className={`relative flex items-center gap-1 transition-colors duration-300 ${isHot ? 'text-[#ECEBE4]' : 'text-[#0F2322]'}`}>
          {l.label}
          {l.drop && (
            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: EASE }}>
              <ChevronDown size={13} strokeWidth={2.6} />
            </motion.span>
          )}
        </span>
        {active && !isHot && <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#46344E]" />}
      </>
    );
    if (l.drop) {
      return (
        <li
          onMouseEnter={() => {
            setHovered(l.key);
            openDrop(l.drop);
          }}
          onMouseLeave={closeSoon}
        >
          <button
            type="button"
            className={base}
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={() => setDropdown((p) => (p === l.drop ? null : l.drop))}
          >
            {inner(false)}
          </button>
        </li>
      );
    }
    return (
      <li
        onMouseEnter={() => {
          setHovered(l.key);
          if (dropdown) closeSoon();
        }}
      >
        <NavLink to={l.to} className={base}>
          {({ isActive }) => inner(isActive)}
        </NavLink>
      </li>
    );
  };

  return (
    <>
      <motion.header
        ref={wrapRef}
        animate={{ y: hidden && !dropdown && !mobileOpen ? '-140%' : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      >
        <div className="relative mx-auto flex max-w-[96rem] items-center justify-between gap-3">
          {/* island 1: brand */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0, scale: scrolled ? 0.96 : 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className={island}
          >
            <Link
              to="/"
              aria-label="S4Consultancy Home"
              className={`flex items-center gap-2.5 py-2.5 pl-4 pr-5 font-display text-[1.02rem] font-black tracking-[-0.035em] text-[#0F2322] ${FOCUS}`}
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                <motion.span
                  className="absolute h-5 w-5 rounded-full bg-[#46344E]/30"
                  animate={reduced ? undefined : { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="relative h-3 w-3 rounded-full bg-[#46344E] ring-2 ring-[#FAED26]" />
              </span>
              S4Consultancy
            </Link>
          </motion.div>

          {/* island 2: navigation */}
          <motion.nav
            aria-label="Primary Navigation"
            initial={reduced ? false : { opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0, scale: scrolled ? 0.97 : 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            onMouseLeave={() => setHovered(null)}
            className={`${island} hidden p-1.5 lg:block`}
          >
            <ul className="flex items-center">
              {links.map((l) => (
                <Entry key={l.key} l={l} />
              ))}
            </ul>
          </motion.nav>

          {/* island 3: actions */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0, scale: scrolled ? 0.96 : 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
            className={`${island} flex items-center gap-1 p-1.5`}
          >
            <Link
              to={ctaPath}
              className={`group relative hidden items-center gap-2 overflow-hidden rounded-full bg-[#46344E] py-1.5 pl-5 pr-1.5 font-sans text-[13px] font-bold text-[#ECEBE4] sm:inline-flex ${FOCUS}`}
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-[#FAED26] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              <span className="relative whitespace-nowrap transition-colors duration-500 group-hover:text-[#0F2322]">Book a call</span>
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#FAED26] text-[#0F2322] transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={14} strokeWidth={2.6} />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#0F2322] text-[#ECEBE4] transition-transform duration-300 hover:scale-105 lg:hidden ${FOCUS}`}
            >
              <Menu size={18} />
            </button>
          </motion.div>

          {/* curtain panel */}
          <AnimatePresence>
            {dropdown && panels[dropdown]?.item && (
              <div className="pointer-events-none absolute inset-x-0 top-full z-20 mt-3 hidden justify-center lg:flex">
                <motion.div
                  key={dropdown}
                  initial={{ clipPath: 'inset(0% 0% 100% 0% round 28px)', opacity: 0.6 }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
                  exit={{ clipPath: 'inset(0% 0% 100% 0% round 28px)', transition: { duration: 0.3, ease: EASE } }}
                  transition={{ duration: 0.65, ease: EASE }}
                  onMouseEnter={() => openDrop(dropdown)}
                  onMouseLeave={closeSoon}
                  className="pointer-events-auto grid w-[min(940px,100%)] grid-cols-[280px_1fr] overflow-hidden bg-[#0F2322] text-[#ECEBE4] shadow-[0_40px_90px_-20px_rgba(10,24,25,0.8)]"
                >
                  <div className="flex flex-col justify-between gap-10 bg-[#46344E] p-8">
                    <div>
                      <h3 className="font-display text-3xl font-black leading-[1.02] tracking-[-0.04em]">
                        {panels[dropdown].label}
                      </h3>
                      <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">{panels[dropdown].note}</p>
                    </div>
                    <Link
                      to={panels[dropdown].to}
                      onClick={() => setDropdown(null)}
                      className={`group inline-flex items-center justify-between gap-3 rounded-full bg-[#FAED26] py-1.5 pl-5 pr-1.5 font-sans text-sm font-bold text-[#0F2322] ${FOCUS_DARK}`}
                    >
                      {panels[dropdown].cta}
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F2322] text-[#FAED26] transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight size={14} strokeWidth={2.6} />
                      </span>
                    </Link>
                  </div>

                  <motion.ul
                    variants={panelV}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 content-start gap-x-2 gap-y-1 p-5"
                  >
                    {panels[dropdown].item.children?.map((child) => (
                      <motion.li key={child.id} variants={panelItemV}>
                        <Link
                          to={child.path}
                          onClick={() => setDropdown(null)}
                          className={`group flex items-center justify-between gap-3 rounded-2xl px-4 py-4 font-display text-lg font-semibold tracking-[-0.02em] text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white ${FOCUS_DARK}`}
                        >
                          <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                            {child.label}
                          </span>
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#FAED26] transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#FAED26] group-hover:text-[#0F2322]">
                            <ArrowUpRight size={13} strokeWidth={2.6} />
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* full-screen menu for phones and tablets */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-[#0F2322] text-[#ECEBE4]"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#3AAFA9]/25 blur-[90px]" />
              <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#FAED26]/20 blur-[100px]" />
            </div>

            <div className="relative flex items-center justify-between px-6 pb-3 pt-5 sm:px-8">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                aria-label="S4Consultancy Home"
                className="flex items-center gap-2.5 font-display text-lg font-black tracking-[-0.03em]"
              >
                <span className="h-3 w-3 rounded-full bg-[#FAED26]" />
                S4Consultancy
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#ECEBE4] text-[#0F2322] ${FOCUS_DARK}`}
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-6 pt-4 sm:px-8">
              <motion.ul variants={menuV} initial="hidden" animate="show">
                {navigationData.map((item) => {
                  const hasSub = item.isExpandable && item.children?.length > 0;
                  const open = !!expanded[item.id];
                  const rowCls =
                    'flex w-full items-center justify-between py-3 text-left font-display text-[2.1rem] font-semibold leading-none tracking-[-0.04em]';
                  return (
                    <li key={item.id} className="border-b border-white/10">
                      <div className="overflow-hidden">
                        <motion.div variants={riseV}>
                          {hasSub ? (
                            <button
                              type="button"
                              onClick={() => setExpanded((p) => ({ ...p, [item.id]: !p[item.id] }))}
                              aria-expanded={open}
                              className={rowCls}
                            >
                              {item.label}
                              <motion.span
                                animate={{ rotate: open ? 45 : 0 }}
                                transition={{ duration: 0.4, ease: EASE }}
                                className="text-[#FAED26]"
                              >
                                <ArrowUpRight size={26} />
                              </motion.span>
                            </button>
                          ) : (
                            <NavLink
                              to={item.path}
                              onClick={() => setMobileOpen(false)}
                              className={({ isActive }) => `${rowCls} ${isActive ? 'text-[#FAED26]' : ''}`}
                            >
                              {item.label}
                              <ArrowUpRight size={26} className="text-white/30" />
                            </NavLink>
                          )}
                        </motion.div>
                      </div>
                      {hasSub && (
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: EASE }}
                              className="overflow-hidden"
                            >
                              {item.children.map((sub) => (
                                <li key={sub.id}>
                                  <Link
                                    to={sub.path}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-between py-2.5 pl-4 font-sans text-base text-white/70 transition-colors hover:text-white"
                                  >
                                    {sub.label}
                                    <ArrowUpRight size={15} className="text-[#FAED26]" />
                                  </Link>
                                </li>
                              ))}
                              <li className="pb-3" />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      )}
                    </li>
                  );
                })}
              </motion.ul>
            </div>

            <motion.div
              className="relative px-6 pb-8 pt-5 sm:px-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.7, ease: EASE } }}
              exit={{ opacity: 0 }}
            >
              <Link
                to={ctaPath}
                onClick={() => setMobileOpen(false)}
                className="group flex items-center justify-between rounded-full bg-[#FAED26] py-2 pl-7 pr-2 font-sans text-base font-bold text-[#0F2322]"
              >
                {consultationCTA?.label || 'Book a consultation'}
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F2322] text-[#FAED26] transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </span>
              </Link>
              <div className="mt-5 flex flex-col gap-1 font-sans text-xs text-white/50">
                <a href="tel:+919876543210" className="transition-colors hover:text-white">+91 (0) 98765 43210</a>
                <a href="mailto:inquiry@s4consultancy.com" className="transition-colors hover:text-white">inquiry@s4consultancy.com</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;