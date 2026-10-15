import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Compass,
  Award,
  Star,
  Clock,
  Layers,
  HeartHandshake
} from 'lucide-react';
import villaImg from '../../assets/resort-villa.jpg';
import secondaryImg from '../../assets/hero-resort.jpg';

const EASE = [0.16, 1, 0.3, 1];

const CHAPTERS = [
  {
    id: 'heritage',
    number: '01',
    badge: 'The Genesis',
    headline: 'Born from a commitment to integrity.',
    lead: 'S4Consultancy was founded to eliminate the opacity, unvetted vendors, and operational chaos that often compromise milestone celebrations and property investments.',
    body: 'Traditional hospitality brokers frequently operate on hidden vendor markups and opaque kickbacks. We chose a radically different path: acting solely as our client’s fiduciary advocate, protecting your contracts, budgets, and guest experiences with total transparency.',
    accent: '#FAED26',
  },
  {
    id: 'craft',
    number: '02',
    badge: 'The Discipline',
    headline: 'Minute-by-minute operational perfection.',
    lead: 'Luxury hospitality is not an improvisation—it is an exact choreography of timing, acoustics, emotional pacing, and architectural atmosphere.',
    body: 'We bring together seasoned hoteliers, destination wedding choreographers, banquet venue advisors, and asset managers under one unified roof. Every run-sheet is mapped down to the minute, supported by secondary power, weather contingencies, and dedicated hospitality desks.',
    accent: '#FAED26',
  },
  {
    id: 'promise',
    number: '03',
    badge: 'The Promise',
    headline: 'Senior partners present on the floor.',
    lead: 'The directors who design your project are the very hoteliers supervising operations on the day of the event.',
    body: 'We never pass your vision to junior coordinators. From initial venue contract negotiation to final guest departure at dawn, our partners remain on-site, providing effortless calm, uncompromising standards, and immediate executive decision-making.',
    accent: '#FAED26',
  },
];

const COMMITMENTS = [
  {
    title: 'Personalized Wedding & Event Choreography',
    desc: 'Bespoke decor moodboards, vendor alignment, sound engineering, and seamless run-sheets.',
    icon: Sparkles,
  },
  {
    title: 'Unbiased Banquet Venue Sourcing & Negotiations',
    desc: 'Comprehensive 48-point property vetting with direct General Manager contract protections.',
    icon: Compass,
  },
  {
    title: 'Curated Luxury Resort Stays & Private Buyouts',
    desc: 'Privileged access to exclusive suites, villas, and private island/palace buyouts globally.',
    icon: Award,
  },
  {
    title: 'Coordinated Room Blocks & On-Site Helpdesks',
    desc: 'Attendee RSVP mapping, airport transfers, VIP logistics, and dedicated hospitality lobbies.',
    icon: Clock,
  },
  {
    title: 'Strategic Hotel & Resort Asset Advisory',
    desc: 'Yield optimization, service standard SOPs, staff grooming audits, and F&B operational rigor.',
    icon: ShieldCheck,
  },
];

const STATS = [
  { value: '100%', label: 'Fiduciary Client Alignment', sub: 'Zero hidden vendor markups' },
  { value: '48-Pt', label: 'Institutional Property Vetting', sub: 'Physical & operational audit' },
  { value: '0-Min', label: 'Timeline Execution Variance', sub: 'Master run-sheet compliance' },
  { value: '24/7', label: 'Partner-Level On-Site Directorship', sub: 'Never outsourced to juniors' },
];

const StorySection = () => {
  const reduced = useReducedMotion();
  const [activeChapter, setActiveChapter] = useState(0);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const imgY = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [-30, 40]);
  const imgScale = useTransform(smoothProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.05, 1, 1.03]);

  const currentCh = CHAPTERS[activeChapter];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-white to-[#F4F0F2] text-[#46344E] px-4 sm:px-8 lg:px-14 py-16 sm:py-24 lg:py-28"
    >
      {/* Background Architectural Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5%] top-12 select-none font-display text-[18vw] font-black leading-none text-[#46344E]/[0.025]"
      >
        HERITAGE
      </div>

      <div className="relative mx-auto w-full max-w-[1360px]">
        {/* Top Eyebrow & Tag */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#46344E]/10 pb-5">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#46344E]/20 bg-white/80 px-4 py-1.5 backdrop-blur-md shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FAED26] opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FAED26]" />
            </span>
            <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#46344E]">
              (S4) Ethos &amp; Heritage • Est. 2018
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#5A5560] font-sans">
            <span className="h-1.5 w-1.5 rounded-full bg-[#46344E]" />
            <span>Serving India, Asia-Pacific &amp; Global Destinations</span>
          </div>
        </div>

        {/* Big Editorial Headline */}
        <div className="mb-14 max-w-4xl lg:mb-20">
          <h1 className="font-display text-[clamp(2.4rem,5.6vw,5.4rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#46344E]">
            Where Passion for Hospitality Meets{' '}
            <span className="relative inline-block text-[#46344E]">
              Flawless Execution.
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-[6px] w-full bg-[#FAED26] opacity-80 rounded-full"
              />
            </span>
          </h1>
          <p className="mt-6 font-sans text-base sm:text-lg lg:text-xl text-[#5A5560] leading-relaxed max-w-2xl">
            S4Consultancy was founded on a singular commitment: delivering personalized hospitality solutions,
            bespoke event choreography, luxury accommodation planning, and professional management advisory with
            genuine care and absolute fiduciary discretion.
          </p>
        </div>

        {/* Main Grid: Interactive Story Chapters (Left) + Multi-layered Visual (Right) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Interactive Story Chapters */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Chapter Tabs */}
            <div className="flex items-center gap-2 mb-8 border-b border-[#46344E]/15 pb-3">
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setActiveChapter(idx)}
                  className={`relative flex items-center gap-2.5 rounded-full px-4 py-2 font-sans text-xs font-bold transition-all duration-300 ${
                    activeChapter === idx
                      ? 'bg-[#46344E] text-white shadow-md'
                      : 'bg-white/80 text-[#5A5560] hover:bg-[#46344E]/10'
                  }`}
                >
                  <span className={activeChapter === idx ? 'text-[#FAED26]' : 'text-[#46344E]/50'}>
                    {ch.number}
                  </span>
                  <span>{ch.badge}</span>
                </button>
              ))}
            </div>

            {/* Active Chapter Card */}
            <motion.div
              key={currentCh.id}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="rounded-3xl border border-[#46344E]/15 bg-white p-7 sm:p-9 shadow-[0_12px_40px_-15px_rgba(70,52,78,0.08)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAED26] font-display text-sm font-black text-[#46344E]">
                  {currentCh.number}
                </span>
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#9B786F]">
                  Chapter {currentCh.number} / {CHAPTERS.length}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#46344E] leading-tight mb-4">
                {currentCh.headline}
              </h2>

              <p className="font-sans text-sm sm:text-base font-semibold text-[#46344E]/90 leading-relaxed mb-4">
                {currentCh.lead}
              </p>

              <p className="font-sans text-xs sm:text-sm text-[#5A5560] leading-relaxed mb-6">
                {currentCh.body}
              </p>

              {/* Progress Bar through chapters */}
              <div className="flex items-center justify-between pt-5 border-t border-[#46344E]/10">
                <div className="flex items-center gap-2">
                  {CHAPTERS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Jump to chapter ${i + 1}`}
                      onClick={() => setActiveChapter(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeChapter === i ? 'w-8 bg-[#FAED26]' : 'w-2 bg-[#46344E]/20'
                      }`}
                    />
                  ))}
                </div>

                <Link
                  to="/standard"
                  className="inline-flex items-center gap-2 font-sans text-xs font-bold text-[#46344E] hover:text-[#9B786F] transition-colors"
                >
                  <span>Read The S4 Standard</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Quick Metrics Bar below chapter */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#46344E]/10 bg-white/70 p-4 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-[#46344E] font-display text-2xl font-black">
                  <HeartHandshake size={20} className="text-[#9B786F]" />
                  <span>100%</span>
                </div>
                <div className="mt-1 font-sans text-xs font-bold text-[#46344E]">Fiduciary Alignment</div>
                <p className="font-sans text-[11px] text-[#5A5560]">Zero undisclosed broker commissions</p>
              </div>

              <div className="rounded-2xl border border-[#46344E]/10 bg-white/70 p-4 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-[#46344E] font-display text-2xl font-black">
                  <ShieldCheck size={20} className="text-[#FAED26]" />
                  <span>48-Pt</span>
                </div>
                <div className="mt-1 font-sans text-xs font-bold text-[#46344E]">Property Vetting</div>
                <p className="font-sans text-[11px] text-[#5A5560]">Rigorously verified prior to endorsement</p>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-layer Architectural Imagery with Parallax */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden border border-[#46344E]/15 shadow-[0_24px_60px_-18px_rgba(70,52,78,0.22)] bg-[#46344E]">
              {/* Main Visual */}
              <motion.div style={{ y: imgY, scale: imgScale }} className="h-[460px] sm:h-[540px] w-full">
                <img
                  src={villaImg}
                  alt="S4Consultancy Heritage Resort Villa"
                  className="h-full w-full object-cover object-center filter brightness-[0.94]"
                />
              </motion.div>

              {/* Gradient Veil */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#201524]/85 via-transparent to-black/20" />

              {/* Floating Top Inset Badge: Verified Luxury Heritage */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2.5 rounded-full bg-white/95 px-4 py-2 shadow-lg backdrop-blur-md">
                <Star size={14} className="fill-[#FAED26] text-[#FAED26]" />
                <span className="font-sans text-xs font-bold tracking-wider text-[#46344E] uppercase">
                  Verified Luxury Practice
                </span>
              </div>

              {/* Floating Bottom Card: On-Site Leadership Seal */}
              <div className="absolute bottom-6 left-6 right-6 z-10 rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur-md border border-white/80">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold font-sans uppercase tracking-wider text-[#9B786F]">
                      <Award size={15} />
                      <span>The S4 Heritage Guarantee</span>
                    </div>
                    <p className="mt-1 font-sans text-xs text-[#46344E] leading-relaxed font-semibold">
                      "Every property buyout, ballroom contract, and wedding agenda is overseen in person by senior hoteliers."
                    </p>
                  </div>
                  <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#46344E] text-[#FAED26] shadow-sm">
                    <Compass size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Secondary Offset Card (Awwwards Style Layering) */}
            <motion.div
              initial={reduced ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="hidden sm:flex absolute -bottom-10 -right-6 z-20 w-64 items-center gap-3.5 rounded-2xl border border-white/80 bg-white p-4 shadow-[0_20px_40px_-10px_rgba(70,52,78,0.25)] backdrop-blur-md"
            >
              <img
                src={secondaryImg}
                alt="Curated Resort Stay"
                className="h-14 w-14 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <p className="font-display text-sm font-bold text-[#46344E] truncate">Global Network</p>
                <p className="font-sans text-[11px] text-[#5A5560] truncate">Handpicked 5-Star Keys</p>
                <span className="mt-1 inline-flex items-center gap-1 font-sans text-[10px] font-bold text-[#9B786F]">
                  <span>Vetted Properties</span>
                  <CheckCircle2 size={11} className="text-[#FAED26]" />
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Lower Section: 5 Core Highlights Grid in Architectural Cards */}
        <div className="mt-20 lg:mt-28">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#46344E]/15 pb-6">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#9B786F]">
                Execution Pillars
              </span>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-[#46344E]">
                What Defines Our Advisory Practice
              </h3>
            </div>
            <p className="max-w-md font-sans text-xs sm:text-sm text-[#5A5560]">
              Each pillar represents a non-negotiable benchmark embedded across every wedding, banquet booking, and property engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {COMMITMENTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#46344E]/12 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#46344E]/30 hover:shadow-lg"
                >
                  <div>
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F0F2] text-[#46344E] transition-colors duration-300 group-hover:bg-[#46344E] group-hover:text-[#FAED26]">
                      <Icon size={18} />
                    </div>
                    <span className="font-sans text-[11px] font-extrabold tracking-wider text-[#9B786F] uppercase">
                      Pillar 0{idx + 1}
                    </span>
                    <h4 className="mt-2 font-display text-base font-bold text-[#46344E] leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  <p className="mt-3 font-sans text-xs text-[#5A5560] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Full-Width Key Metrics Strip */}
        <div className="mt-14 rounded-3xl bg-[#46344E] p-8 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            {STATS.map((stat, i) => (
              <div key={i} className={`pt-6 sm:pt-0 ${i !== 0 ? 'sm:pl-8' : ''}`}>
                <div className="font-display text-4xl sm:text-5xl font-black text-[#FAED26]">
                  {stat.value}
                </div>
                <div className="mt-2 font-sans text-sm font-bold text-white tracking-tight">
                  {stat.label}
                </div>
                <p className="mt-1 font-sans text-xs text-white/70">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Row with Magnetic-style Link */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#46344E]/10 pt-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAED26] text-[#46344E]">
              <Layers size={18} />
            </span>
            <span className="font-sans text-sm font-bold text-[#46344E]">
              Want to review our full operational methodology?
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/standard"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#46344E] py-2 pl-6 pr-2 font-sans text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              <span className="relative">Discover The S4 Standard</span>
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#FAED26] text-[#46344E] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
