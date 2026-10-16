import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  Plus
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Contact page, v2: "private concierge"                              */
/*  Same data and links as before (form removed). Dark cinematic hero  */
/*  stage, hotline + WhatsApp cards, editorial hub rows, accessible    */
/*  FAQ, JSON-LD (ProfessionalService + FAQPage).                      */
/*  GSAP: word reveal, scroll reveals, glow parallax. Motion-safe.     */
/* ------------------------------------------------------------------ */

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CBBD93]';
const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

const advisoryHubs = [
  {
    city: 'Delhi NCR Hub',
    role: 'Central Headquarters & Corporate Advisory',
    address: 'DLF Cyber City & Central Hospitality Lounge',
    directPhone: '+91 (0) 98765 43210',
    email: 'delhi@s4consultancy.com',
    coverage: 'Delhi, Gurugram, Noida, Agra, Chandigarh'
  },
  {
    city: 'Rajasthan & Palaces Desk',
    role: 'Heritage Palaces & Destination Wedding Operations',
    address: 'Civil Lines, Jaipur & Lake Pichola Lounge, Udaipur',
    directPhone: '+91 (0) 98765 43211',
    email: 'rajasthan@s4consultancy.com',
    coverage: 'Jaipur, Udaipur, Jodhpur, Jaisalmer, Kumbhalgarh'
  },
  {
    city: 'West & Coastal Hub',
    role: 'Luxury Beachfronts, Banquets & Stays',
    address: 'Bandra West, Mumbai & Candolim Advisory Hub, Goa',
    directPhone: '+91 (0) 98765 43212',
    email: 'mumbai@s4consultancy.com',
    coverage: 'Mumbai, Goa, Pune, Alibaug, Lonavala'
  }
];

const faqs = [
  {
    q: 'How does S4Consultancy differ from a standard event planner or booking agent?',
    a: 'We operate as an independent advisory firm. Our primary loyalty is strictly to you, not venues or vendors. We audit banquet contracts, negotiate wholesale property rates, optimize food and beverage per-plate pricing, and oversee total on-ground operations with fiduciary transparency.'
  },
  {
    q: 'How quickly can your team secure dates and room blocks?',
    a: 'For urgent inquiries, our senior directors can leverage preferred institutional hotel partnerships within 24 to 48 hours to lock dates, initiate contract reviews, and secure preliminary room blocks.'
  },
  {
    q: 'Do you consult for hotel owners and resort developers?',
    a: 'Yes. Our Management Consultancy vertical provides property owners with operational SOPs, banquet yield audits, pre-opening hospitality frameworks, staff training manuals, and room distribution strategies.'
  },
  {
    q: 'What is the process after submitting this consultation request?',
    a: 'A dedicated hospitality director will review your event scale, preferred dates, and budget parameters, and contact you within 2 business hours with an initial overview and availability options.'
  }
];

const assurances = [
  { icon: Clock, label: 'Fast turnaround', value: 'Under 2 Hours Response' },
  { icon: ShieldCheck, label: 'Client discretion', value: '100% NDA & Privacy' },
  { icon: MapPin, label: 'Pan-India & global', value: 'Regional On-Ground Desks' }
];

const HEADLINE = 'Connect Directly With Our Senior Hospitality Directors.';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      name: 'S4Consultancy',
      telephone: '+919876543210',
      email: 'inquiry@s4consultancy.com',
      areaServed: ['India', 'Asia-Pacific'],
      description:
        'Independent hospitality advisory: wedding planning, banquet and venue booking, resorts and stays, corporate events, destination weddings and management consultancy.'
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    }
  ]
};

const Contact = () => {
  const [activeFaq, setActiveFaq] = useState(0);

  const pageRef = useRef(null);
  const reduced = useReducedMotion();

  /* GSAP: hero word reveal, scroll reveals, glow parallax */
  useLayoutEffect(() => {
    if (reduced || !pageRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.ct-word', { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.035, delay: 0.1 });
      gsap.from('.ct-hero-fade', { y: 22, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.1, delay: 0.5 });
      gsap.to('.ct-glow', {
        yPercent: 60,
        ease: 'none',
        scrollTrigger: { trigger: '.ct-hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.utils.toArray('.ct-reveal').forEach((el) => {
        gsap.from(el, {
          y: 36,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });
      gsap.from('.ct-hub', {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.ct-hubs', start: 'top 80%', once: true }
      });
    }, pageRef);
    return () => ctx.revert();
  }, [reduced]);

  /* cursor spotlight on the hero (CSS variables only, no re-render) */
  const onHeroMove = (e) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div ref={pageRef} className="contact-page min-h-screen bg-[#FDFCFB] pb-16 pt-24 text-[#574A24] sm:pt-28 lg:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Hero stage */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <div
          onMouseMove={onHeroMove}
          style={{ '--mx': '75%', '--my': '20%' }}
          className="ct-hero relative isolate overflow-hidden rounded-[1.75rem] bg-[#1F1A0E] px-6 py-10 text-[#FAE8B4] sm:px-10 sm:py-14 lg:px-16 lg:py-20"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="ct-glow absolute -right-32 -top-24 h-[30rem] w-[30rem] rounded-full bg-[#CBBD93]/20 blur-[140px]" />
            <div
              className="absolute inset-0 hidden md:block"
              style={{ background: 'radial-gradient(520px circle at var(--mx) var(--my), rgba(203,189,147,0.2), transparent 60%)' }}
            />
            <div className="absolute inset-0 opacity-[0.08] mix-blend-screen" style={{ backgroundImage: GRAIN }} />
          </div>

          <h1 className="m-0 max-w-[48rem] font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-black leading-[1.06] tracking-[-0.04em] text-[#FAE8B4]">
            {HEADLINE.split(' ').map((w, i) => (
              <React.Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.14em] align-top">
                  <span className="ct-word inline-block will-change-transform">{w}</span>
                </span>{' '}
              </React.Fragment>
            ))}
          </h1>

          <p className="ct-hero-fade m-0 mt-5 max-w-[40rem] font-sans text-sm leading-relaxed text-[#FAE8B4]/80 sm:text-base">
            Whether curating a bespoke palace wedding, locking competitive resort room blocks, or acquiring boutique
            hospitality assets, our advisory team delivers hands-on discretion and transparent guidance.
          </p>

          <ul className="ct-hero-fade m-0 mt-10 grid list-none grid-cols-1 gap-5 border-t border-[#CBBD93]/25 p-0 pt-6 sm:grid-cols-3">
            {assurances.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CBBD93]/40 text-[#CBBD93]"
                >
                  <Icon size={17} />
                </span>
                <span>
                  <span className="block font-sans text-xs text-[#FAE8B4]/60">{label}</span>
                  <span className="block font-sans text-sm font-bold">{value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Direct channels */}
      <section className="relative w-full py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
          <h2 className="sr-only">Contact S4Consultancy directly</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="ct-reveal rounded-3xl border border-[#CBBD93]/30 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(87,74,36,0.15)] sm:p-7">
              <h3 className="m-0 font-display text-lg font-black tracking-[-0.03em] text-[#574A24]">Direct Executive Hotlines</h3>
              <p className="m-0 mt-1 font-sans text-xs text-[#80775C]">Immediate telephone and advisory inquiries</p>

              <div className="mt-4 flex flex-col">
                <a
                  href="tel:+919876543210"
                  className={`group flex items-center gap-3.5 border-t border-[#CBBD93]/25 py-3.5 ${FOCUS}`}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CBBD93]/40 transition-colors duration-500 group-hover:border-transparent group-hover:bg-[#CBBD93] group-hover:text-[#574A24]"
                  >
                    <Phone size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-sans text-xs text-[#80775C]">Principal Hotline</span>
                    <span className="block font-sans text-sm font-bold text-[#574A24]">+91 (0) 98765 43210</span>
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 font-sans text-[11px] font-bold text-emerald-700">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Live
                  </span>
                </a>

                <a
                  href="mailto:inquiry@s4consultancy.com"
                  className={`group flex items-center gap-3.5 border-t border-[#CBBD93]/25 py-3.5 ${FOCUS}`}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CBBD93]/40 transition-colors duration-500 group-hover:border-transparent group-hover:bg-[#CBBD93] group-hover:text-[#574A24]"
                  >
                    <Mail size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-sans text-xs text-[#80775C]">Senior Advisory Email</span>
                    <span className="block break-words font-sans text-sm font-bold text-[#574A24]">inquiry@s4consultancy.com</span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="ml-auto shrink-0 -translate-x-1 translate-y-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 text-[#CBBD93]"
                  />
                </a>

                <div className="flex items-center gap-3.5 border-t border-[#CBBD93]/25 pt-3.5">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CBBD93]/40 text-[#80775C]"
                  >
                    <Clock size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-sans text-xs text-[#80775C]">Operating Schedule</span>
                    <span className="block font-sans text-sm font-bold text-[#574A24]">Mon – Sat: 9:00 AM – 8:00 PM IST</span>
                    <span className="block font-sans text-[11px] text-[#80775C]">24/7 on active events</span>
                  </span>
                </div>
              </div>
            </div>

            {/* WhatsApp VIP */}
            <div className="ct-reveal relative isolate flex flex-col items-start overflow-hidden rounded-3xl bg-[#1F1A0E] p-6 text-[#FAE8B4] sm:p-7">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-[#CBBD93]/20 blur-[90px]" />
              <h3 className="m-0 font-display text-lg font-black tracking-[-0.03em] text-[#FAE8B4]">VIP Instant Messaging</h3>
              <p className="m-0 mt-1 font-sans text-xs text-[#FAE8B4]/70">Immediate coordination for short-notice events</p>
              <p className="m-0 mb-5 mt-4 font-sans text-sm leading-relaxed text-[#FAE8B4]/85">
                Have an urgent date check for a palace resort or need immediate room blocks? Chat directly with an active duty coordinator.
              </p>
              <a
                href="https://wa.me/919876543210?text=Hello%20S4Consultancy,%20I%20would%20like%20to%20inquire%20about%20hospitality%20advisory%20services."
                target="_blank"
                rel="noopener noreferrer"
                className={`group mt-auto inline-flex items-center gap-3 rounded-full bg-[#FAE8B4] py-2 pl-5 pr-2 font-sans text-xs font-bold text-[#574A24] ${FOCUS}`}
              >
                <span>Start WhatsApp VIP Chat</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#CBBD93] text-[#574A24] transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={14} strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Regional hubs: editorial rows */}
      <section className="relative w-full border-t border-[#CBBD93]/20 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
          <h2 className="ct-reveal m-0 mb-8 font-display text-[clamp(1.35rem,2.4vw,2rem)] font-black leading-tight tracking-[-0.035em] text-[#574A24]">
            Our Advisory Desks & Regional Hubs
          </h2>

          <div className="ct-hubs border-b border-[#574A24]/15">
            {advisoryHubs.map((hub) => (
              <article
                key={hub.city}
                className="ct-hub group grid grid-cols-1 gap-4 border-t border-[#574A24]/15 py-6 transition-colors duration-500 hover:bg-[#FAE8B4]/30 md:grid-cols-[1.1fr_1.4fr_auto] md:items-center md:gap-10 md:px-4"
              >
                <h3
                  className={`m-0 font-display text-[clamp(1.3rem,2.4vw,2rem)] font-black leading-none tracking-[-0.04em] text-[#574A24] transition duration-500 ${EASE} group-hover:translate-x-2 group-hover:text-[#CBBD93]`}
                >
                  {hub.city}
                </h3>

                <div className="font-sans">
                  <p className="m-0 text-xs font-semibold text-[#80775C]">{hub.role}</p>
                  <p className="m-0 mt-1 text-sm leading-relaxed text-[#574A24]/80">{hub.address}</p>
                  <p className="m-0 mt-1 text-xs text-[#80775C]">Coverage: {hub.coverage}</p>
                </div>

                <div className="flex flex-col gap-1 font-sans text-sm md:items-end">
                  <a
                    href={`tel:${hub.directPhone.replace(/\s+/g, '')}`}
                    className={`font-bold text-[#574A24] hover:text-[#CBBD93] ${FOCUS}`}
                  >
                    {hub.directPhone}
                  </a>
                  <a href={`mailto:${hub.email}`} className={`text-[#80775C] hover:text-[#574A24] ${FOCUS}`}>
                    {hub.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="relative w-full border-t border-[#CBBD93]/20 py-12 sm:py-16">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1.7fr] lg:gap-16 lg:px-14">
          <h2 className="ct-reveal m-0 font-display text-[clamp(1.35rem,2.4vw,2rem)] font-black leading-tight tracking-[-0.035em] text-[#574A24] lg:sticky lg:top-28 lg:self-start">
            Frequently Addressed Inquiries
          </h2>

          <div className="ct-reveal border-b border-[#574A24]/15">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="border-t border-[#574A24]/15">
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={`faq-btn-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className={`group flex w-full items-center justify-between gap-6 py-5 text-left font-display text-base font-bold leading-snug tracking-[-0.02em] text-[#574A24] ${FOCUS}`}
                    >
                      <span className="transition-colors duration-300 group-hover:text-[#CBBD93]">{faq.q}</span>
                      <span
                        aria-hidden="true"
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${isOpen
                            ? 'rotate-45 border-transparent bg-[#574A24] text-[#FAE8B4]'
                            : 'border-[#574A24]/25 group-hover:border-[#CBBD93]'
                          }`}
                      >
                        <Plus size={15} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${index}`}
                        role="region"
                        aria-labelledby={`faq-btn-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="m-0 max-w-[40rem] pb-6 font-sans text-sm leading-relaxed text-[#574A24]/80">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;