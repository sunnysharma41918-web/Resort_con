import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import ContactForm from '../components/ContactForm';
import CTASection from '../components/CTASection';

const ServiceDetail = () => {
  const { id } = useParams();

  const service = servicesData.find((s) => s.id === id || s.slug === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 bg-[#FAF8F5]">
        <span className="inline-flex items-center px-3.5 py-1.5 bg-coral/10 text-coral text-xs font-bold tracking-widest uppercase mb-4">
          Service Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-plum mb-4">
          Service Not Located
        </h1>
        <p className="text-sm text-taupe-dark max-w-md text-center mb-6">
          The requested hospitality discipline does not exist or has been relocated. Explore our eight core services directory.
        </p>
        <Link
          to="/services"
          className="btn btn-primary"
        >
          <span>View All 8 Services</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const otherServices = servicesData.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="service-detail-page bg-[#FAF8F5] text-plum min-h-screen">
      {/* 1. Header & Navigation Row */}
      <section className="pt-28 sm:pt-32 pb-8 px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-taupe-dark hover:text-coral transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to All Services</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-sans text-taupe-light">
            <Link to="/" className="hover:text-plum transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-plum transition-colors">Services</Link>
            <span>/</span>
            <span className="text-plum font-semibold truncate max-w-[180px]">{service.title}</span>
          </div>
        </div>

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 border-b border-taupe/15">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center px-3.5 py-1 bg-coral text-white text-[11px] font-bold tracking-widest uppercase rounded-none shadow-sm">
                S4Consultancy Core Service
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-plum text-cream text-[11px] font-bold tracking-wider uppercase rounded-none">
                {service.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[54px] font-display font-extrabold sm:font-black text-plum leading-[1.06] tracking-tight mb-4">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-taupe-dark font-sans leading-relaxed mb-6">
              {service.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#inquiry"
                className="btn btn-primary"
              >
                <span>Inquire About This Service</span>
                <ArrowRight size={15} />
              </a>
              <a
                href="#process"
                className="btn btn-outline"
              >
                <span>View Coordination Process</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/80 aspect-[4/3] bg-neutral-900 group">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover object-center filter brightness-[0.95] group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-white/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-coral block">
                    Proven Track Record
                  </span>
                  <span className="text-sm font-bold font-champ text-plum">
                    {service.stats}
                  </span>
                </div>
                <Sparkles size={20} className="text-coral" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Service Overview & Detailed Value Proposition */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Overview & Deliverables */}
          <div className="lg:col-span-8">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-10">
              <span className="inline-flex items-center px-3 py-1 bg-coral/10 text-coral text-xs font-bold tracking-widest uppercase mb-3">
                Service Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-plum mb-4 tracking-tight">
                About {service.title} at S4Consultancy
              </h2>
              <p className="text-sm sm:text-base text-taupe-dark leading-relaxed font-sans mb-6">
                {service.description}
              </p>
              <p className="text-sm sm:text-base text-taupe-dark leading-relaxed font-sans">
                At S4Consultancy, we treat every engagement as a singular masterpiece. Our multidisciplinary consultants coordinate seamlessly with venue owners, executive chefs, technical production crews, and transportation directors to guarantee uncompromised luxury and peace of mind.
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="mb-12">
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 bg-coral/10 text-coral text-xs font-bold tracking-widest uppercase mb-2">
                  Client Value
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-plum tracking-tight">
                  Key Benefits of Working With S4
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-white border border-stone-200/80 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-shadow"
                  >
                    <div className="w-7 h-7 rounded-full bg-coral/10 text-coral flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-plum font-sans leading-snug">
                        {benefit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Offer / Deliverables Scope */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-12">
              <span className="inline-flex items-center px-3 py-1 bg-coral/10 text-coral text-xs font-bold tracking-widest uppercase mb-3">
                Scope & Deliverables
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-plum mb-6 tracking-tight">
                What S4Consultancy Delivers
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.offerings.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF8F5]">
                    <div className="w-5 h-5 rounded-full bg-coral text-white flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                      ✓
                    </div>
                    <span className="text-xs sm:text-sm text-stone-700 font-sans font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Coordination Process */}
            <div id="process" className="mb-12 scroll-mt-28">
              <div className="mb-8">
                <span className="inline-flex items-center px-3 py-1 bg-coral/10 text-coral text-xs font-bold tracking-widest uppercase mb-2">
                  Step-by-Step Delivery
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-plum tracking-tight">
                  Our Coordination Process
                </h3>
                <p className="text-xs sm:text-sm text-taupe-dark font-sans mt-1">
                  How our consultants guide your requirements from initial consultation to immaculate execution.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {service.coordinationProcess.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative overflow-hidden"
                  >
                    <div className="text-3xl font-champ font-black text-coral/40 mb-2">
                      {step.step}
                    </div>
                    <h4 className="font-display text-lg font-bold text-plum mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-taupe-dark leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Quick Intake Card & Touchpoints */}
          <div className="lg:col-span-4 space-y-6">
            <div id="inquiry" className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] scroll-mt-28">
              <div className="mb-5 pb-4 border-b border-stone-100">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-coral block mb-1">
                  Fast-Track Consultation
                </span>
                <h3 className="text-xl font-display font-bold text-plum leading-snug">
                  Inquire for {service.title}
                </h3>
                <p className="text-xs text-taupe-dark font-sans mt-1">
                  Fill in your details below. Our {service.title} specialist will review and reach out within 24 hours.
                </p>
              </div>

              <ContactForm initialService={service.title} />
            </div>

            {/* Advisory Assurance Box */}
            <div className="bg-plum text-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2.5 mb-3 text-coral">
                <ShieldCheck size={20} />
                <span className="font-bold text-xs uppercase tracking-wider font-sans">The S4 Assurance</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-sans mb-4">
                We represent your interests with absolute transparency. Zero unvetted third parties, protected commercial contracts, and verified luxury standards.
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-300 font-sans">
                <span>Direct Partner Access</span>
                <span className="text-coral font-bold">• 100% Dedicated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Explore Related Services */}
      <section className="py-14 bg-white border-t border-taupe/15 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-widest text-coral block mb-1">
                Complementary Disciplines
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-plum tracking-tight">
                Explore Related Services
              </h3>
            </div>
            <Link
              to="/services"
              className="text-xs font-bold text-coral hover:text-coral-dark inline-flex items-center gap-1 font-sans"
            >
              <span>View All 8 Core Services</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((other) => (
              <Link
                key={other.id}
                to={`/services/${other.id}`}
                className="group bg-[#FAF8F5] rounded-xl overflow-hidden border border-stone-200/80 p-5 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-coral block mb-1">
                    {other.category}
                  </span>
                  <h4 className="font-display text-lg font-bold text-plum group-hover:text-coral transition-colors mb-2">
                    {other.title}
                  </h4>
                  <p className="text-xs text-taupe-dark line-clamp-2 leading-relaxed font-sans">
                    {other.tagline}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-coral">
                  <span>Explore Service</span>
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Global Call To Action */}
      <CTASection
        badge="Ready to Begin?"
        title="Connect With S4Consultancy Today"
        description="Speak with our dedicated hospitality directors to explore dates, venues, room blocks, or operational consultancy."
        primaryBtnText="Contact Our Team"
        primaryBtnLink="/contact"
      />
    </div>
  );
};

export default ServiceDetail;
