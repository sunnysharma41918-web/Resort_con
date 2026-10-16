import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { servicesData } from '../../data/servicesData';

const ServicesHeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const totalSlides = servicesData.length;
  const current = servicesData[activeSlide];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  return (
    <section className="pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
      {/* Top Header Row: Bold Headline (Left) + Dot (Center) + Agency Paragraph (Right) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 mb-10 sm:mb-14">
        {/* Left: Giant Bold Headline */}
        <div className="shrink-0">
          <span className="inline-flex items-center px-3.5 py-1 bg-[#FAE8B4] text-[#574A24] text-[11px] font-bold tracking-[0.22em] uppercase rounded-full border border-[#CBBD93] shadow-sm mb-3">
            Hospitality & Event Management Consultancy
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-display font-extrabold sm:font-black text-[#574A24] tracking-tight leading-[1.04]">
            S4Consultancy<br />
            <span className="text-[#CBBD93]">Core Services.</span>
          </h1>
        </div>

        {/* Center: Minimalist Dot Pill Indicator */}
        <div className="hidden xl:flex items-center justify-center w-12 h-6 rounded-full bg-[#FAE8B4]/60 border border-[#CBBD93]/40 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-[#574A24] animate-pulse" />
        </div>

        {/* Right: Thoughtful Agency Editorial Paragraph */}
        <div className="max-w-md lg:max-w-lg">
          <p className="text-xs sm:text-sm lg:text-[15px] text-taupe-dark font-sans leading-relaxed tracking-wide">
            We are a premier hospitality, hotels, resorts, and event management consultancy brand. From bespoke weddings and prestigious corporate summits to handpicked hotel stays and strategic management consultancy, we deliver end-to-end excellence.
          </p>
        </div>
      </div>

      {/* 2. Giant Widescreen Hero Showcase Slider with Giant Bold Overlay Typography */}
      <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[620px] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl bg-neutral-900 border border-stone-200/80">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center filter brightness-[0.82]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />

            {/* Top Bar Badges inside slider */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
              <span className="px-3.5 py-1.5 bg-[#FAE8B4] text-[#574A24] border border-[#CBBD93] text-[11px] font-bold font-sans tracking-widest uppercase rounded-full shadow-md">
                {current.category}
              </span>
              <span className="px-3.5 py-1.5 bg-[#574A24] text-[#FAE8B4] border border-[#CBBD93]/50 text-[11px] font-bold font-sans tracking-wider uppercase rounded-full shadow-md">
                {current.stats}
              </span>
            </div>

            {/* Bottom Large Overlay Typography */}
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 z-10">
              <span className="text-xs sm:text-sm font-sans font-bold text-[#FAE8B4] uppercase tracking-widest block mb-1">
                Discipline 0{activeSlide + 1} of 0{totalSlides}
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-[64px] xl:text-[72px] font-display font-black text-[#FAE8B4] tracking-wider leading-none drop-shadow-lg mb-3">
                {current.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#FAE8B4]/85 font-sans leading-relaxed max-w-xl hidden sm:block mb-4">
                {current.tagline}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to={`/services/${current.id}`}
                  className="inline-flex items-center gap-2 bg-[#574A24] hover:bg-[#453a1c] text-[#FAE8B4] border border-[#CBBD93]/40 text-xs font-bold px-4 py-2 rounded-full transition-colors shadow-md font-sans"
                >
                  <span>Explore Service Details</span>
                  <ArrowUpRight size={14} />
                </Link>
                <Link
                  to={`/contact?service=${encodeURIComponent(current.title)}`}
                  className="inline-flex items-center gap-2 bg-[#FAE8B4] hover:bg-[#CBBD93] text-[#574A24] text-xs font-bold px-4 py-2 rounded-full transition-colors shadow-md font-sans"
                >
                  <span>Inquire Now</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls (Bottom Right) */}
        <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-20 flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            className="w-11 h-11 rounded-full bg-[#FAE8B4] hover:bg-[#CBBD93] text-[#574A24] flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
            aria-label="Previous service slide"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-11 h-11 rounded-full bg-[#574A24] hover:bg-[#453a1c] text-[#FAE8B4] border border-[#CBBD93]/40 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
            aria-label="Next service slide"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* 8 Quick Thumbnails / Service Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mt-6">
        {servicesData.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveSlide(idx)}
            className={`p-3 rounded-xl text-left border transition-all duration-200 ${
              activeSlide === idx
                ? 'bg-[#574A24] text-[#FAE8B4] border-[#574A24] shadow-md'
                : 'bg-white text-[#574A24] border-stone-200/80 hover:bg-[#FAF6EC]'
            }`}
          >
            <span className={`text-[10px] font-bold block mb-0.5 ${activeSlide === idx ? 'text-[#CBBD93]' : 'text-[#80775C]'}`}>
              0{idx + 1}
            </span>
            <span className="text-xs font-bold font-sans line-clamp-1">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ServicesHeroSection;
