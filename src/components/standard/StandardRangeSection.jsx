import React, { useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  Building2,
  Crown,
  Compass,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Hotel,
  MapPin,
  Clock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Our Range, v2                                                      */
/*  Same data, tabs, selected-scale state and /contact links.          */
/*  New: word-reveal headline, count-up stats, a sliding tab pill,     */
/*  GSAP out/in transitions between tabs, a master-detail explorer     */
/*  for the scale tab (with the "recommended for" line from your       */
/*  data), highlighted table row, cinematic closing panel.             */
/*  Motion-safe: reduced-motion users get no animation.                */
/* ------------------------------------------------------------------ */

const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CBBD93]';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

const scaleRanges = [
  {
    id: 'intimate',
    badge: 'Bespoke & Private',
    title: 'Intimate Escapes & Celebrations',
    capacity: '20 to 100 Guests / Keys',
    leadTime: '4 – 12 Weeks',
    typicalVenues: 'Private villas, heritage havelis, boutique island retreats, executive hideaways',
    description:
      'Curated for private family celebrations, high-profile birthday milestones, founder retreats, and discreet board summits. Every guest experience is personalized down to bespoke culinary menus, private charter transfers, and unobtrusive security.',
    highlights: [
      'Discreet VIP arrival & private estate buyouts',
      'Michelin-influenced custom culinary curation',
      'Dedicated on-site host director & concierge desk',
      'Zero unauthorized vendor access or media exposure'
    ],
    recommendedFor: 'Anniversaries, HNW Family Gatherings, Executive Strategy Retreats'
  },
  {
    id: 'grand',
    badge: 'Milestone Scale',
    title: 'Grand Weddings & Regional Summits',
    capacity: '100 to 500 Guests / Keys',
    leadTime: '3 – 9 Months',
    typicalVenues: '5-star hotel ballrooms, heritage palace courtyards, luxury beachfront resorts',
    description:
      'Our signature sweet spot. Comprehensive management of complex multi-day wedding ceremonies, regional corporate conventions, and celebratory galas requiring seamless coordination between hospitality, production, and artist management.',
    highlights: [
      'Multi-property room block negotiations & guest allocation',
      'Minute-by-minute protocol run-sheet for all ceremonies',
      'Acoustic, staging, lighting & floral engineering',
      'Full kitchen hygiene and F&B tasting audits'
    ],
    recommendedFor: 'Destination Weddings, Annual Corporate Conferences, Multi-Day Galas'
  },
  {
    id: 'monumental',
    badge: 'Enterprise & Royal',
    title: 'Monumental Conventions & Royal Gatherings',
    capacity: '500 to 2,500+ Attendees',
    leadTime: '6 – 18 Months',
    typicalVenues: 'Multi-hotel palace clusters, international convention centers, private islands',
    description:
      'Engineered for mega corporate conventions, global trade summits, and high-society royal weddings. We deploy a full operational cadre of senior hoteliers, airport transit coordination wings, and emergency contingency teams.',
    highlights: [
      'Multi-hub airport transfer & motorcade logistics',
      'Dual-redundancy power, technical & medical standby teams',
      'Dedicated hospitality helpdesk at each partner hotel',
      'Institutional contract auditing with substantial capex yield'
    ],
    recommendedFor: 'Global Summits, Royal Palace Weddings, Industry Trade Assemblies'
  }
];

const venueRanges = [
  {
    icon: Crown,
    title: 'Royal Palaces & Historic Forts',
    locations: 'Jaipur, Udaipur, Jodhpur, Jaisalmer',
    scale: '100 – 1,200 Guests',
    desc: 'Bespoke courtyard banquets, authentic regal architecture, palace room suites, and antique heritage decor styling.',
    features: ['Conservation compliance', 'Palace protocol coordination', 'Heritage vendor harmonization']
  },
  {
    icon: Building2,
    title: '5-Star Pillarless Grand Ballrooms',
    locations: 'Delhi NCR, Mumbai, Bengaluru, Hyderabad',
    scale: '200 – 2,000 Attendees',
    desc: 'High-ceiling acoustics, high-speed corporate banquet turnarounds, massive LED backdrops, and state-of-the-art tech.',
    features: ['Acoustic sightline testing', 'Per-plate pricing audits', 'Pillar-free seating layouts']
  },
  {
    icon: Hotel,
    title: 'Luxury Beachfronts & Coastal Resorts',
    locations: 'Goa, Alibaug, Kerala, Phuket, Bali',
    scale: '50 – 600 Guests',
    desc: 'Sun-drenched seaside ceremonies, oceanfront cocktail decks, private villa takeovers, and sea-breeze floral engineering.',
    features: ['High-humidity decor protection', 'Coastal weather contingencies', 'Private resort buyout terms']
  },
  {
    icon: Compass,
    title: 'Mountain Valleys & Wellness Sanctuaries',
    locations: 'Rishikesh, Shimla, Mussoorie, Swiss Alps',
    scale: '20 – 350 Guests',
    desc: 'Restorative wellness retreats, mountain view terraces, holistic spa experiences, and quiet corporate leadership councils.',
    features: ['High-altitude transit management', 'Heated venue provisions', 'Curated wellness itineraries']
  }
];

const advisoryTiers = [
  {
    tier: 'Tier I',
    name: 'Strategic Venue Procurement & Contract Audit',
    focus: 'Property Selection & Commercial Protection',
    description:
      'Ideal for organizers with existing in-house planners who require independent institutional leverage to audit venue contracts, negotiate wholesale per-plate and room rates, and eliminate hidden vendor kickbacks.',
    deliverables: [
      'Comparative venue assessment report across 5+ shortlisted properties',
      'Forensic banquet contract review & attrition waiver negotiation',
      'Wholesale F&B & room block procurement rates'
    ]
  },
  {
    tier: 'Tier II',
    name: 'Turnkey Event Directorship & Master Staging',
    focus: 'End-to-End Operational Execution',
    description:
      'Complete choreographing from concept to departure. We oversee all technical staging, decor production, artist management, culinary standards, and minute-by-minute protocol execution on the ground.',
    deliverables: [
      'Minute-by-minute master run-sheets for all vendors and hosts',
      'On-site senior hoteliers directing stage, hospitality, and F&B',
      'Technical, acoustic, floral, and lighting stage directorship'
    ]
  },
  {
    tier: 'Tier III',
    name: 'Sovereign Hospitality & Hotel Asset Advisory',
    focus: 'Total Estate Buyouts & Owner Consulting',
    description:
      'Our highest level of institutional advisory. Covers complete private property buyouts, chartered international travel logistics, or hotel owner operational SOP audits, banquet yield optimization, and pre-opening management.',
    deliverables: [
      'Full hotel / resort property buyout agreements & dedicated staff alignment',
      'VIP protocol, chartered aviation, and multi-hub motorcade control',
      'Hospitality SOP engineering, RevPAR optimization & asset yield auditing'
    ]
  }
];

const tabs = [
  { id: 'scale', label: 'Event & Group Scale' },
  { id: 'venues', label: 'Venue & Property Range' },
  { id: 'tiers', label: 'Advisory & Service Tiers' }
];

/* count-up stats: `to` is the number animated, `fmt` renders it */
const stats = [
  { to: 2500, fmt: (v) => `20 – ${Math.round(v).toLocaleString('en-US')}+`, label: 'Scale of Guests', bar: '#574A24' },
  { to: 180, fmt: (v) => `${Math.round(v)}+`, label: 'Vetted Venues', bar: '#CBBD93' },
  { to: 40, fmt: (v) => `${Math.round(v)}+`, label: 'Global Destinations', bar: '#80775C' },
  { to: 100, fmt: (v) => `${Math.round(v)}%`, label: 'Fiduciary Alignment', bar: '#574A24' }
];

const HEADLINE = 'Precision Standards Across Every Scale & Setting.';

/* "100 to 500 Guests / Keys" -> ["100 to 500", "Guests / Keys"] */
const splitCapacity = (cap) => {
  const m = cap.match(/^(.*[\d+])\s+([A-Za-z].*)$/);
  return m ? [m[1], m[2]] : [cap, ''];
};

const StandardRangeSection = () => {
  const [activeTab, setActiveTab] = useState('scale');
  const [selectedScaleIndex, setSelectedScaleIndex] = useState(1);

  const reduced = useReducedMotion();
  const rootRef = useRef(null);
  const tablistRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabBtns = useRef({});
  const panelRef = useRef(null);
  const busy = useRef(false);
  const firstPanel = useRef(true);
  const firstScale = useRef(true);
  const firstIndicator = useRef(true);

  /* ---------- tab switching: out, swap, in ---------- */
  const changeTab = (next) => {
    if (busy.current || next === activeTab) return;
    const els = panelRef.current?.querySelectorAll('[data-rg]');
    if (reduced || !els || !els.length) {
      setActiveTab(next);
      return;
    }
    busy.current = true;
    gsap.to(els, {
      autoAlpha: 0,
      y: -14,
      duration: 0.25,
      ease: 'power2.in',
      stagger: 0.03,
      onComplete: () => {
        setActiveTab(next);
        busy.current = false;
      }
    });
  };

  const onTabKey = (e, i) => {
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = tabs.length - 1;
    if (n === null) return;
    e.preventDefault();
    tabBtns.current[tabs[n].id]?.focus();
    changeTab(tabs[n].id);
  };

  /* ---------- scale selection: swap the detail panel ---------- */
  const selectScale = (i) => {
    if (busy.current || i === selectedScaleIndex) return;
    const els = panelRef.current?.querySelectorAll('[data-sc]');
    if (reduced || !els || !els.length) {
      setSelectedScaleIndex(i);
      return;
    }
    busy.current = true;
    gsap.to(els, {
      autoAlpha: 0,
      y: -10,
      duration: 0.2,
      ease: 'power2.in',
      stagger: 0.02,
      onComplete: () => {
        setSelectedScaleIndex(i);
        busy.current = false;
      }
    });
  };

  /* ---------- header, stats, closing panel ---------- */
  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return undefined;
    const ctx = gsap.context(() => {
      const once = (trigger, start = 'top 82%') => ({ trigger, start, once: true });

      gsap.from('.rg-word', {
        yPercent: 115,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.035,
        scrollTrigger: once('.rg-head')
      });
      gsap.from('.rg-head-fade', {
        y: 24,
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        delay: 0.2,
        scrollTrigger: once('.rg-head')
      });
      gsap.from('.rg-stat', {
        y: 24,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: once('.rg-stats', 'top 88%')
      });
      gsap.utils.toArray('.rg-count').forEach((el, i) => {
        const o = { v: 0 };
        el.textContent = stats[i].fmt(0);
        gsap.to(o, {
          v: stats[i].to,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = stats[i].fmt(o.v);
          },
          scrollTrigger: once('.rg-stats', 'top 88%')
        });
      });
      gsap.from('.rg-cta', {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: once('.rg-cta', 'top 90%')
      });
      gsap.to('.rg-glow', {
        yPercent: 55,
        ease: 'none',
        scrollTrigger: { trigger: '.rg-cta', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  /* ---------- sliding tab pill ---------- */
  useLayoutEffect(() => {
    const place = (animate) => {
      const btn = tabBtns.current[activeTab];
      const pill = indicatorRef.current;
      if (!btn || !pill) return;
      const vars = { x: btn.offsetLeft, width: btn.offsetWidth };
      if (animate && !reduced) gsap.to(pill, { ...vars, duration: 0.6, ease: 'expo.out' });
      else gsap.set(pill, vars);
    };
    place(!firstIndicator.current);
    firstIndicator.current = false;

    if (typeof ResizeObserver === 'undefined' || !tablistRef.current) return undefined;
    const ro = new ResizeObserver(() => place(false));
    ro.observe(tablistRef.current);
    return () => ro.disconnect();
  }, [activeTab, reduced]);

  /* ---------- panel entrance (on scroll the first time, at once after) ---------- */
  useLayoutEffect(() => {
    if (reduced || !panelRef.current) return undefined;
    const first = firstPanel.current;
    firstPanel.current = false;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-rg]',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: first ? { trigger: panelRef.current, start: 'top 85%', once: true } : undefined
        }
      );
    }, panelRef);
    return () => ctx.revert();
  }, [activeTab, reduced]);

  /* ---------- scale detail entrance after a selection ---------- */
  useLayoutEffect(() => {
    if (firstScale.current) {
      firstScale.current = false;
      return undefined;
    }
    if (reduced || !panelRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-sc]',
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: 'expo.out', stagger: 0.05 }
      );
    }, panelRef);
    return () => ctx.revert();
  }, [selectedScaleIndex, reduced]);

  const scale = scaleRanges[selectedScaleIndex];
  const [capNum, capUnit] = splitCapacity(scale.capacity);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden border-t border-stone-200/70 bg-[#FBF9F6] py-16 text-[#0E0B0A] sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="rg-head grid grid-cols-1 items-end gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <h2 className="m-0 font-display text-[clamp(1.9rem,4vw,3.4rem)] font-black leading-[1.06] tracking-[-0.04em]">
            {HEADLINE.split(' ').map((w, i) => (
              <React.Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.14em] align-top">
                  <span className="rg-word inline-block will-change-transform">{w}</span>
                </span>{' '}
              </React.Fragment>
            ))}
          </h2>
          <p className="rg-head-fade m-0 text-sm leading-relaxed text-stone-600 sm:text-base">
            Whether securing an intimate private island buyout for 30 guests or directing a 2,000-attendee royal palace
            celebration, S4Consultancy applies the same unyielding standard of fiduciary transparency, minute-by-minute
            discipline, and bespoke luxury care.
          </p>
        </div>

        {/* Stats */}
        <dl className="rg-stats m-0 mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="rg-stat border-t-2 pt-4" style={{ borderColor: s.bar }}>
              <dt className="order-2 mt-1 text-xs font-semibold text-stone-500">{s.label}</dt>
              <dd className="rg-count m-0 font-display text-[clamp(1.5rem,2.6vw,2.3rem)] font-black leading-none tracking-[-0.04em]">
                {s.fmt(s.to)}
              </dd>
            </div>
          ))}
        </dl>

        {/* Tabs */}
        <div className="mt-14 flex justify-center">
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Range of capabilities"
            className="relative inline-flex max-w-full overflow-x-auto rounded-full border border-stone-300/60 bg-stone-200/70 p-1.5"
          >
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute bottom-1.5 left-0 top-1.5 rounded-full bg-[#574A24] shadow-md"
              style={{ width: 0 }}
            />
            {tabs.map((t, i) => {
              const on = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabBtns.current[t.id] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`rg-tab-${t.id}`}
                  aria-selected={on}
                  aria-controls={`rg-panel-${t.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => changeTab(t.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`relative z-10 shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition-colors duration-500 sm:px-5 sm:text-sm ${FOCUS} ${on ? 'text-[#FAE8B4]' : 'text-stone-600 hover:text-stone-900'
                    }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panels */}
        <div ref={panelRef} className="mt-10">
          {/* Tab 1: scale explorer */}
          {activeTab === 'scale' && (
            <div key="scale" role="tabpanel" id="rg-panel-scale" aria-labelledby="rg-tab-scale" className="flex flex-col gap-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[4fr_8fr]">
                {/* selector */}
                <div data-rg role="group" aria-label="Choose a scale" className="flex flex-col gap-3">
                  {scaleRanges.map((s, idx) => {
                    const on = selectedScaleIndex === idx;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => selectScale(idx)}
                        className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 ${EASE} ${FOCUS} ${on
                            ? 'border-[#574A24] bg-[#574A24] text-[#FAE8B4] shadow-[0_24px_50px_-28px_rgba(87,74,36,0.6)]'
                            : 'border-stone-200 bg-white hover:-translate-y-0.5 hover:border-stone-400'
                          }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute left-0 top-0 h-full w-1 origin-top bg-[#CBBD93] transition-transform duration-500 ${EASE} ${on ? 'scale-y-100' : 'scale-y-0'
                            }`}
                        />
                        <span className={`block text-xs font-semibold ${on ? 'text-[#CBBD93]' : 'text-[#80775C]'}`}>
                          {s.badge}
                        </span>
                        <span className="mt-1 block font-display text-base font-black leading-snug tracking-[-0.02em]">
                          {s.title}
                        </span>
                        <span
                          className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${on ? 'text-[#FAE8B4]/80' : 'text-stone-500'}`}
                        >
                          <Users size={13} aria-hidden="true" />
                          {s.capacity}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* detail */}
                <div
                  data-rg
                  aria-live="polite"
                  className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-[0_40px_90px_-50px_rgba(87,74,36,0.15)] sm:p-9 lg:p-10"
                >
                  <div data-sc className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-[#FAE8B4]/30 px-3 py-1 text-xs font-bold text-[#574A24]">{scale.badge}</span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[#80775C]">
                      <Clock size={13} aria-hidden="true" className="text-[#CBBD93]" />
                      Planning Lead Time: {scale.leadTime}
                    </span>
                  </div>

                  <p data-sc className="m-0 mt-6 flex flex-wrap items-baseline gap-x-3 font-display leading-none">
                    <span className="text-[clamp(2.2rem,5vw,4rem)] font-black tracking-[-0.05em] text-[#574A24]">{capNum}</span>
                    <span className="text-sm font-bold text-[#80775C]">{capUnit}</span>
                  </p>

                  <h3 data-sc className="m-0 mt-4 font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-black leading-tight tracking-[-0.03em] text-[#574A24]">
                    {scale.title}
                  </h3>

                  <p data-sc className="m-0 mt-3 max-w-[40rem] text-sm leading-relaxed text-[#574A24]/80">
                    {scale.description}
                  </p>

                  <div data-sc className="mt-7 grid grid-cols-1 gap-8 border-t border-stone-100 pt-7 md:grid-cols-[1.3fr_1fr]">
                    <div>
                      <h4 className="m-0 mb-3 text-sm font-black text-[#574A24]">Key S4 Protocols</h4>
                      <ul className="m-0 list-none space-y-2.5 p-0">
                        {scale.highlights.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-[13px] leading-snug text-stone-600">
                            <CheckCircle2 size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-[#CBBD93]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div>
                        <h4 className="m-0 mb-1 text-sm font-black text-[#574A24]">Typical Venues</h4>
                        <p className="m-0 text-[13px] leading-relaxed text-stone-600">{scale.typicalVenues}</p>
                      </div>
                      <div>
                        <h4 className="m-0 mb-1 text-sm font-black text-[#574A24]">Recommended For</h4>
                        <p className="m-0 text-[13px] leading-relaxed text-stone-600">{scale.recommendedFor}</p>
                      </div>
                    </div>
                  </div>

                  <div data-sc className="mt-8">
                    <Link
                      to="/contact"
                      className={`group inline-flex items-center gap-3 rounded-full bg-[#574A24] py-2 pl-6 pr-2 text-xs font-bold text-[#FAE8B4] ${FOCUS}`}
                    >
                      <span>Inquire For This Scale</span>
                      <span
                        aria-hidden="true"
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#CBBD93] text-[#574A24] transition duration-500 ${EASE} group-hover:rotate-45`}
                      >
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: venues */}
          {activeTab === 'venues' && (
            <div key="venues" role="tabpanel" id="rg-panel-venues" aria-labelledby="rg-tab-venues" className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {venueRanges.map((venue) => {
                const Icon = venue.icon;
                return (
                  <article
                    key={venue.title}
                    data-rg
                    className={`group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-7 transition duration-500 ${EASE} hover:-translate-y-1 hover:shadow-[0_36px_70px_-40px_rgba(87,74,36,0.25)] sm:p-9`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-[#CBBD93] transition-transform duration-500 ${EASE} group-hover:scale-x-100`}
                    />
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-[#574A24] text-[#FAE8B4] transition duration-500 ${EASE} group-hover:-rotate-6 group-hover:scale-110`}
                      >
                        <Icon size={22} />
                      </span>
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">{venue.scale}</span>
                    </div>

                    <h3 className="m-0 font-display text-[1.35rem] font-black leading-tight tracking-[-0.03em] text-[#574A24]">{venue.title}</h3>
                    <p className="m-0 mt-2 flex items-center gap-1.5 text-xs font-bold text-[#80775C]">
                      <MapPin size={13} aria-hidden="true" />
                      {venue.locations}
                    </p>
                    <p className="m-0 mt-4 text-sm leading-relaxed text-stone-600">{venue.desc}</p>

                    <div className="mt-auto pt-6">
                      <h4 className="m-0 mb-3 border-t border-stone-100 pt-5 text-sm font-black text-[#574A24]">
                        S4 Institutional Vetting
                      </h4>
                      <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-3">
                        {venue.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-1.5 rounded-xl border border-[#CBBD93]/30 bg-[#FAE8B4]/20 p-2.5 text-[11px] font-semibold text-[#574A24]"
                          >
                            <CheckCircle2 size={13} aria-hidden="true" className="shrink-0 text-[#CBBD93]" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Tab 3: advisory tiers */}
          {activeTab === 'tiers' && (
            <div key="tiers" role="tabpanel" id="rg-panel-tiers" aria-labelledby="rg-tab-tiers" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {advisoryTiers.map((tier) => (
                <article
                  key={tier.tier}
                  data-rg
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-7 transition duration-500 ${EASE} hover:-translate-y-1 hover:shadow-[0_36px_70px_-40px_rgba(87,74,36,0.25)] sm:p-8`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-[#CBBD93] transition-transform duration-500 ${EASE} group-hover:scale-x-100`}
                  />
                  {/* the tiers are a real sequence, so the numeral earns its place */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[9rem] font-black leading-none text-transparent transition-transform duration-700 group-hover:-translate-y-1"
                    style={{ WebkitTextStroke: '1px rgba(87,74,36,0.15)' }}
                  >
                    {tier.tier.replace('Tier ', '')}
                  </span>

                  <div className="relative">
                    <span className="mb-3 inline-block rounded-full bg-[#574A24] px-3 py-1 text-xs font-bold text-[#FAE8B4]">{tier.tier}</span>
                    <h3 className="m-0 mb-1 font-display text-xl font-black leading-snug tracking-[-0.03em] text-[#574A24]">{tier.name}</h3>
                    <p className="m-0 mb-4 text-xs font-bold text-[#80775C]">{tier.focus}</p>
                    <p className="m-0 mb-6 text-sm leading-relaxed text-stone-600">{tier.description}</p>
                  </div>

                  <div className="relative border-t border-stone-100 pt-6">
                    <h4 className="m-0 mb-3 text-sm font-black text-[#574A24]">Guaranteed Deliverables</h4>
                    <ul className="m-0 mb-6 list-none space-y-2.5 p-0">
                      {tier.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs leading-snug text-stone-600">
                          <CheckCircle2 size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-[#CBBD93]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className={`group/btn inline-flex w-full items-center justify-between gap-3 rounded-full bg-[#574A24] py-2 pl-6 pr-2 text-xs font-bold text-[#FAE8B4] ${FOCUS}`}
                    >
                      <span>Request {tier.tier} Consultation</span>
                      <span
                        aria-hidden="true"
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#CBBD93] text-[#574A24] transition duration-500 ${EASE} group-hover/btn:rotate-45`}
                      >
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Bottom consultation prompt */}
        <div className="rg-cta relative isolate mt-14 overflow-hidden rounded-3xl bg-[#1F1A0E] p-8 text-white sm:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="rg-glow absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#CBBD93] opacity-20 blur-[130px]" />
            <div className="absolute inset-0 opacity-[0.08] mix-blend-screen" style={{ backgroundImage: GRAIN }} />
          </div>

          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="m-0 mb-2 text-xs font-semibold text-[#CBBD93]">Tailored capability assessment</p>
              <h3 className="m-0 mb-3 font-display text-[clamp(1.5rem,3vw,2.4rem)] font-black leading-[1.08] tracking-[-0.035em] text-[#FAE8B4]">
                Have an exact scale or multi-property requirement?
              </h3>
              <p className="m-0 text-sm leading-relaxed text-[#FAE8B4]/80">
                Our hospitality directors conduct confidential feasibility audits to assess venue suitability, guest transit
                windows, and cost ceilings before you sign any commercial commitments.
              </p>
            </div>

            <Link
              to="/contact"
              className={`group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#CBBD93] py-2 pl-7 pr-2 text-sm font-bold text-[#574A24] ${FOCUS}`}
            >
              <span>Consult Our Directors</span>
              <span
                aria-hidden="true"
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#574A24] text-[#FAE8B4] transition duration-500 ${EASE} group-hover:translate-x-1`}
              >
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandardRangeSection;