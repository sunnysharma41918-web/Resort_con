import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
  Check,
  Send,
  AlertCircle
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import headVideo from '../assets/HEAD.mp4';

const EASE = [0.16, 1, 0.3, 1];
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CBBD93]';

const ServiceDetail = () => {
  const { id } = useParams();
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const heroRef = useRef(null);

  const service = servicesData.find(
    (s) =>
      s.id === id ||
      s.slug === id ||
      s.id?.toLowerCase() === id?.toLowerCase() ||
      s.slug?.toLowerCase() === id?.toLowerCase() ||
      s.id?.toLowerCase().startsWith(id?.toLowerCase()) ||
      id?.toLowerCase().startsWith(s.id?.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setActiveStep(0);
  }, [id]);

  /* SEO: dynamic document title and meta description */
  useEffect(() => {
    if (!service) return undefined;
    const prevTitle = document.title;
    document.title = `${service.title} | S4Consultancy`;
    let meta = document.querySelector('meta[name="description"]');
    let created = false;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
      created = true;
    }
    const prevContent = meta.getAttribute('content');
    meta.setAttribute('content', service.tagline || service.description || '');
    return () => {
      document.title = prevTitle;
      if (created) meta.remove();
      else if (prevContent !== null) meta.setAttribute('content', prevContent);
    };
  }, [service]);

  /* Subtle parallax hero scroll */
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '15%']);

  if (!service) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-24 bg-[#FDFCFB]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#80775C] mb-3">
          Service Not Found
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-[#574A24] tracking-tight mb-5 text-center">
          Hospitality Discipline Not Found
        </h1>
        <p className="text-sm sm:text-base text-[#80775C] max-w-md text-center mb-8 font-sans leading-relaxed">
          The requested service page does not exist or has been relocated. Explore our directory of 8 core consultancy disciplines.
        </p>
        <Link to="/#services" className={`btn btn-primary ${FOCUS}`}>
          <span>Explore Services</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const otherServices = servicesData.filter((s) => s.id !== service.id).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.category,
    description: service.description || service.tagline,
    provider: { '@type': 'Organization', name: 'S4Consultancy' }
  };

  return (
    <div className="service-detail-page bg-[#FDFCFB] text-[#574A24] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Cinematic Hero Section (100% Full Viewport) */}
      <section
        ref={heroRef}
        aria-labelledby="service-title"
        className="relative isolate overflow-hidden bg-[#1F1A0E] text-white min-h-screen min-h-[100svh] h-[100svh] flex flex-col justify-between"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          {/* Background Video (plays service.video or headVideo asset) */}
          <motion.video
            key={service.video || service.id}
            src={service.video || headVideo}
            style={{ y: reduce ? 0 : heroImgY }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-[120%] object-cover object-center will-change-transform"
          />
          {/* Subtle top shade for breadcrumbs/navigation */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#1F1A0E]/60 to-transparent pointer-events-none" />
          {/* Subtle black shadow from bottom */}
          <div className="absolute inset-x-0 bottom-0 h-56 sm:h-80 bg-gradient-to-t from-[#1F1A0E]/90 via-[#1F1A0E]/40 to-transparent pointer-events-none" />
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto pt-28 sm:pt-32 pb-8 sm:pb-12 flex-1 flex flex-col justify-between">
          {/* Breadcrumb row */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center justify-between gap-4 mb-6"
          >
            <Link
              to="/#services"
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition-colors ${FOCUS}`}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Services</span>
            </Link>

            <nav aria-label="Breadcrumb" className="hidden sm:block">
              <ol className="flex items-center gap-2 text-xs text-white/60 m-0 p-0 list-none font-sans">
                <li>
                  <Link to="/" className={`hover:text-white transition-colors ${FOCUS}`}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/#services" className={`hover:text-white transition-colors ${FOCUS}`}>
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white font-semibold truncate max-w-[220px]">
                  {service.title}
                </li>
              </ol>
            </nav>
          </motion.div>

          {/* Hero Content */}
          <div className="my-auto py-4">
            <motion.h1
              id="service-title"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="m-0 mb-6 font-display font-black text-[#FAE8B4] tracking-[-0.03em] leading-[1.02] text-4xl sm:text-6xl lg:text-7xl max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]"
            >
              {service.title}
            </motion.h1>

            <div className="max-w-3xl">
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                className="text-base sm:text-xl text-white/95 font-sans leading-relaxed m-0 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]"
              >
                {service.tagline}
              </motion.p>
            </div>
          </div>

          {/* Bottom subtle anchor hint */}
          <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#FAE8B4]/70 tracking-wider uppercase font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CBBD93] animate-pulse" />
            <span>Scroll to explore discipline</span>
          </div>
        </div>
      </section>

      {/* 2. Overview, Benefits, Deliverables, Process */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Overview */}
          <div className="mb-20 sm:mb-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#CBBD93]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#80775C]">
                Service Overview
              </span>
            </div>
            <h2 className="sr-only">About {service.title} at S4Consultancy</h2>
            <p className="m-0 mb-6 font-display font-bold text-[#574A24] tracking-tight leading-[1.3] text-2xl sm:text-3xl lg:text-4xl">
              {service.description}
            </p>
            <p className="text-sm sm:text-base text-[#80775C] leading-relaxed font-sans m-0 max-w-2xl">
              At S4Consultancy, we treat every engagement as a singular masterpiece. Our multidisciplinary consultants coordinate seamlessly with venue owners, executive chefs, technical production crews, and transportation directors to guarantee uncompromised luxury and peace of mind.
            </p>
          </div>

          {/* Key benefits */}
          <div className="mb-20 sm:mb-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#CBBD93]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#80775C]">
                Key Advantages
              </span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-display font-black text-[#574A24] tracking-tight leading-[1.05] mt-0 mb-8">
              Key benefits of working with S4
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-0 p-0 list-none">
              {service.benefits.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: idx * 0.06 }}
                  className="group p-6 rounded-3xl bg-white border border-[#CBBD93]/30 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#CBBD93] hover:shadow-lg"
                >
                  <span className="w-9 h-9 rounded-full bg-[#FAE8B4]/40 text-[#574A24] flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#574A24] group-hover:text-[#FAE8B4]">
                    <CheckCircle2 size={18} aria-hidden="true" />
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-[#574A24] font-sans leading-snug m-0">
                    {benefit}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Scope & Deliverables */}
          <div className="mb-20 sm:mb-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#CBBD93]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#80775C]">
                Scope of Work
              </span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-display font-black text-[#574A24] tracking-tight leading-[1.05] mt-0 mb-8">
              What S4Consultancy delivers
            </h3>
            <ul className="m-0 p-0 list-none border-b border-[#CBBD93]/30">
              {service.offerings.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: EASE, delay: idx * 0.04 }}
                  className="group flex items-center gap-4 py-5 border-t border-[#CBBD93]/30 transition-[padding] duration-300 hover:pl-3"
                >
                  <span
                    aria-hidden="true"
                    className="w-6 h-6 rounded-full border border-[#CBBD93] text-[#574A24] flex items-center justify-center shrink-0 text-xs font-bold transition-colors duration-300 group-hover:bg-[#574A24] group-hover:text-[#FAE8B4]"
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-lg text-[#574A24] font-sans font-medium">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Coordination Process with foolproof timeline rail */}
          <div id="process" className="scroll-mt-28">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#CBBD93]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#80775C]">
                Strategic Execution
              </span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-display font-black text-[#574A24] tracking-tight leading-[1.05] mt-0 mb-3">
              Our coordination process
            </h3>
            <p className="text-sm sm:text-base text-[#80775C] font-sans mt-0 mb-10 max-w-lg leading-relaxed">
              How our senior hospitality directors guide your requirements from initial intake to immaculate delivery.
            </p>

            <ol className="m-0 p-0 list-none space-y-6">
              {service.coordinationProcess.map((step, idx) => {
                const on = activeStep === idx;
                const isLast = idx === service.coordinationProcess.length - 1;
                return (
                  <li
                    key={idx}
                    className="relative flex items-stretch gap-4 sm:gap-6 cursor-pointer group"
                    onClick={() => setActiveStep(idx)}
                  >
                    {/* Integrated timeline node + rail */}
                    <div className="flex flex-col items-center shrink-0 pt-6">
                      <span
                        aria-hidden="true"
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${on
                          ? 'bg-[#574A24] border-white shadow-[0_0_0_3px_#CBBD93] scale-110'
                          : 'bg-white border-[#80775C] group-hover:border-[#574A24]'
                          }`}
                      />
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className="w-[2px] grow bg-stone-200 mt-2 group-hover:bg-[#CBBD93]/40 transition-colors"
                        />
                      )}
                    </div>

                    {/* Content Card */}
                    <div
                      className={`grow rounded-3xl bg-white border p-6 sm:p-8 transition-all duration-300 ${on
                        ? 'border-[#CBBD93] shadow-xl ring-1 ring-[#CBBD93]/30'
                        : 'border-stone-200/80 hover:border-[#CBBD93]/50 hover:shadow-md'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-3xl sm:text-4xl font-champ font-black leading-none transition-colors duration-300 ${on ? 'text-[#574A24]' : 'text-[#80775C]/40 group-hover:text-[#80775C]'
                            }`}
                        >
                          {step.step}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${on ? 'bg-[#FAE8B4]/40 text-[#574A24]' : 'text-stone-400 group-hover:text-stone-600'
                            }`}
                        >
                          Stage {step.step}
                        </span>
                      </div>
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-[#574A24] mt-0 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm sm:text-base text-[#80775C] leading-relaxed font-sans m-0 max-w-xl">
                        {step.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* 3. Related Services Carousel/Grid */}
      <section
        className="py-20 sm:py-24 bg-white border-t border-[#CBBD93]/20 px-4 sm:px-6 lg:px-12"
        aria-labelledby="related-title"
      >
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#80775C] block mb-2">
                Complementary Disciplines
              </span>
              <h3
                id="related-title"
                className="text-3xl sm:text-5xl font-display font-black text-[#574A24] tracking-tight leading-[1.05] m-0"
              >
                Explore related services
              </h3>
            </div>
            <Link
              to="/#services"
              className={`text-sm font-bold text-[#574A24] hover:text-[#CBBD93] inline-flex items-center gap-1 font-sans ${FOCUS}`}
            >
              <span>View Services</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 m-0 p-0 list-none">
            {otherServices.map((other) => (
              <li key={other.id} className="flex">
                <Link
                  to={`/services/${other.id}`}
                  className={`group relative overflow-hidden w-full bg-[#FAF8F5] rounded-3xl border border-stone-200/80 p-7 min-h-[16rem] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#574A24] hover:shadow-xl ${FOCUS}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#574A24] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
                  />
                  <div className="relative">
                    <span className="text-xs font-semibold text-[#80775C] block mb-3 group-hover:text-[#FAE8B4]/80">
                      {other.category}
                    </span>
                    <h4 className="font-display text-2xl font-bold text-[#574A24] group-hover:text-[#FAE8B4] group-focus-visible:text-[#FAE8B4] transition-colors duration-300 mt-0 mb-3 tracking-tight">
                      {other.title}
                    </h4>
                    <p className="text-sm text-[#80775C] group-hover:text-white/80 group-focus-visible:text-white/80 transition-colors duration-300 line-clamp-2 leading-relaxed font-sans m-0">
                      {other.tagline}
                    </p>
                  </div>
                  <div className="relative pt-5 mt-6 border-t border-stone-200/70 group-hover:border-white/20 transition-colors duration-300 flex items-center justify-between text-sm font-bold text-[#574A24] group-hover:text-[#CBBD93]">
                    <span>Explore service</span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Inquire for Service Section (At the very end of the page) */}
      <section
        id="inquiry"
        className="py-20 sm:py-28 bg-[#FDFCFB] border-t border-[#CBBD93]/20 px-4 sm:px-6 lg:px-12 scroll-mt-20"
        aria-labelledby="inquiry-heading"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Heading & The S4 Assurance */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#80775C] block mb-2">
                  Fast-Track Consultation
                </span>
                <h2
                  id="inquiry-heading"
                  className="text-3xl sm:text-5xl font-display font-black text-[#574A24] tracking-tight leading-[1.05] mt-0 mb-4"
                >
                  Inquire for {service.title}
                </h2>
                <p className="text-sm sm:text-base text-[#80775C] font-sans leading-relaxed m-0">
                  Fill in your requirements below. Our dedicated {service.title} specialist will review and reach out directly within 24 hours.
                </p>
              </div>

              <aside
                className="bg-[#1F1A0E] text-white p-7 sm:p-8 rounded-3xl shadow-xl"
                aria-label="The S4 assurance"
              >
                <div className="flex items-center gap-2.5 mb-3 text-[#CBBD93]">
                  <ShieldCheck size={22} aria-hidden="true" />
                  <span className="font-bold text-base font-sans tracking-wide">The S4 Assurance</span>
                </div>
                <p className="text-sm text-stone-200 leading-relaxed font-sans mb-5 mt-0">
                  We represent your interests with absolute transparency. Zero unvetted third parties, protected commercial contracts, and verified luxury standards.
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-300 font-sans">
                  <span>Direct Partner Access</span>
                  <span className="text-[#CBBD93] font-bold">100% Dedicated</span>
                </div>
              </aside>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-[#CBBD93]/30 shadow-xl">
              <ServiceInquiryForm serviceTitle={service.title} />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

const ServiceInquiryForm = ({ serviceTitle }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', timeline: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#574A24] text-[#FAE8B4] flex items-center justify-center mb-4">
          <CheckCircle2 size={30} />
        </div>
        <h4 className="text-2xl font-bold text-[#574A24] mb-2">Inquiry Transmitted</h4>
        <p className="text-sm text-[#80775C] max-w-md mx-auto">
          Thank you, <strong>{form.name}</strong>. A dedicated specialist for <em>{serviceTitle}</em> will contact you within 2 business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-[#574A24] mb-1">Inquire About {serviceTitle}</h3>
        <p className="text-xs text-[#80775C]">
          Direct advisory consultation with verified confidentiality.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#80775C] mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Eleanor Vance"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBBD93]/40 text-sm text-[#574A24] focus:outline-none focus:border-[#574A24]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#80775C] mb-1">Email Address *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="e.g. eleanor@example.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBBD93]/40 text-sm text-[#574A24] focus:outline-none focus:border-[#574A24]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#80775C] mb-1">Phone / WhatsApp *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBBD93]/40 text-sm text-[#574A24] focus:outline-none focus:border-[#574A24]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#80775C] mb-1">Target Date / Timeline</label>
          <input
            type="text"
            value={form.timeline}
            onChange={(e) => setForm({ ...form, timeline: e.target.value })}
            placeholder="e.g. Nov 2026 / Immediate"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBBD93]/40 text-sm text-[#574A24] focus:outline-none focus:border-[#574A24]"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-[#80775C] mb-1">Inquiry / Requirements</label>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Briefly describe your event scale, location preferences, or hospitality goals..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBBD93]/40 text-sm text-[#574A24] focus:outline-none focus:border-[#574A24]"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#574A24] text-[#FAE8B4] text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#43381a] transition-colors"
        >
          <span>{submitting ? 'Transmitting...' : 'Submit Inquiry'}</span>
          <Send size={15} />
        </button>
        <Link
          to={`/contact?service=${encodeURIComponent(serviceTitle)}`}
          className="text-xs font-semibold text-[#574A24] hover:underline"
        >
          Or open Full Consultation Portal &rarr;
        </Link>
      </div>
    </form>
  );
};

export default ServiceDetail;