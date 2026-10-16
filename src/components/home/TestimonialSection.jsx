import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Star, Quote } from 'lucide-react';
import { testimonialsData } from '../../data/testimonialsData';

/* ------------------------------------------------------------------ */
/*  Luxury Testimonials Carousel: White Background Edition             */
/*  - Crisp white background with elegant small rounded cards          */
/*  - 3 cards on desktop, 2 on tablet, 1 on mobile                     */
/*  - Touch/drag swipeable, autoplay with hover/focus pause            */
/*  - Round pill badges, round avatars, and circular nav buttons       */
/* ------------------------------------------------------------------ */

const AUTOPLAY_MS = 6000;

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CBBD93]';

const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();

const Avatar = ({ src, name, size = 'h-11 w-11', text = 'text-xs' }) => {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (!src || failed)
    return (
      <span
        className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-[#574A24] font-display ${text} font-black text-[#FAE8B4] shadow-sm`}
      >
        {initials(name)}
      </span>
    );
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className={`${size} shrink-0 rounded-full border border-[#CBBD93]/30 object-cover shadow-sm`}
    />
  );
};

const TestimonialSection = ({
  titleLine1 = 'Client Stories:',
  titleLine2 = 'Hospitality Delivered With Care',
  ctaText = 'View portfolio',
  ctaLink = '/projects'
}) => {
  const items = useMemo(() => testimonialsData || [], []);
  const count = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const trackRef = useRef(null);
  const touchStartX = useRef(null);

  // Responsive visible cards count
  useEffect(() => {
    const updateVisible = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, count - visibleCount);

  const prev = useCallback(() => {
    setCurrentIndex((curr) => (curr > 0 ? curr - 1 : maxIndex));
  }, [maxIndex]);

  const next = useCallback(() => {
    setCurrentIndex((curr) => (curr < maxIndex ? curr + 1 : 0));
  }, [maxIndex]);

  // Autoplay
  useEffect(() => {
    if (paused || reduced || count <= visibleCount) return undefined;
    const timer = setInterval(() => {
      next();
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, reduced, count, visibleCount, next]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  if (!count) return null;

  return (
    <section
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
      className="relative w-full overflow-hidden bg-white py-12 sm:py-14 lg:py-16 text-[#574A24]"
    >
      {/* Subtle warm luxury ambient accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#CBBD93]/15 blur-[120px]" />
        <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-[#FAE8B4]/40 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CBBD93]/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        {/* Header row with Title and Round Navigation Controls */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="m-0 mb-2 flex items-center gap-2.5 font-sans text-xs font-bold uppercase tracking-[0.25em] text-[#80775C]">
              <span aria-hidden="true" className="h-px w-8 bg-[#CBBD93]" />
              Client Endorsements
            </p>
            <h2
              id="testimonials-heading"
              className="m-0 font-display text-[clamp(1.5rem,2.8vw,2.3rem)] font-black leading-[1.1] tracking-[-0.035em] text-[#574A24]"
            >
              {titleLine1}{' '}
              <span className="block text-[#80775C] font-bold">{titleLine2}</span>
            </h2>
          </div>

          {/* Round Controls */}
          <div className="flex items-center gap-3 self-start sm:self-end">
            {ctaText && ctaLink && (
              <Link
                to={ctaLink}
                className={`hidden sm:inline-flex items-center gap-2 rounded-full border border-[#CBBD93]/50 bg-white px-4 py-2 font-sans text-xs font-semibold text-[#574A24] shadow-sm transition-all duration-300 hover:border-[#574A24] hover:bg-[#574A24] hover:text-[#FAE8B4] ${FOCUS}`}
              >
                <span>{ctaText}</span>
                <ArrowUpRight size={13} strokeWidth={2.4} />
              </Link>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#CBBD93]/50 bg-white text-[#574A24] shadow-sm transition-all duration-300 hover:border-[#574A24] hover:bg-[#574A24] hover:text-[#FAE8B4] active:scale-95 ${FOCUS}`}
              >
                <ArrowLeft size={16} strokeWidth={2.4} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#CBBD93]/50 bg-white text-[#574A24] shadow-sm transition-all duration-300 hover:border-[#574A24] hover:bg-[#574A24] hover:text-[#FAE8B4] active:scale-95 ${FOCUS}`}
              >
                <ArrowRight size={16} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Window */}
        <div
          className="relative mt-8 overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] gap-5 py-2"
            style={{
              transform: `translateX(calc(-${currentIndex} * ((100% + 20px) / ${visibleCount})))`
            }}
          >
            {items.map((item, idx) => (
              <div
                key={item.id || idx}
                style={{
                  width: `calc((100% - ${(visibleCount - 1) * 20}px) / ${visibleCount})`
                }}
                className="shrink-0"
              >
                {/* Small Round Card (White Luxury Theme) */}
                <div className="group relative flex h-full flex-col justify-between rounded-[28px] border border-[#CBBD93]/35 bg-white p-6 sm:p-7 shadow-[0_8px_25px_-8px_rgba(87,74,36,0.06)] transition-all duration-300 hover:border-[#CBBD93] hover:shadow-[0_16px_36px_-10px_rgba(87,74,36,0.14)]">
                  {/* Decorative faint quote glyph */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-5 top-5 text-[#CBBD93]/25 transition-colors duration-300 group-hover:text-[#CBBD93]/50"
                  >
                    <Quote size={38} strokeWidth={1.5} />
                  </div>

                  <div>
                    {/* Top Row: Round Rating Pill + Category Pill */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#CBBD93]/20">
                      <div className="inline-flex items-center gap-1 rounded-full bg-[#FAE8B4]/40 border border-[#CBBD93]/40 px-2.5 py-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} className="fill-[#CBBD93] text-[#CBBD93]" />
                        ))}
                      </div>

                      {item.category && (
                        <span className="inline-block rounded-full bg-[#FAE8B4]/40 border border-[#CBBD93]/40 px-3 py-0.5 font-sans text-[11px] font-semibold tracking-wide text-[#574A24]">
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* Small Quote Text */}
                    <blockquote className="my-5 m-0 font-sans text-[13.5px] sm:text-[14px] leading-relaxed text-[#574A24]/90">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Bottom Row: Round Avatar + Client Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#CBBD93]/20">
                    <Avatar src={item.avatar} name={item.author} size="h-10 w-10" text="text-xs" />
                    <div className="min-w-0">
                      <h4 className="m-0 truncate font-display text-[15px] font-bold text-[#574A24]">
                        {item.author}
                      </h4>
                      <p className="m-0 truncate font-sans text-xs text-[#80775C]">
                        {item.role}
                        {item.company ? ` • ${item.company}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Round Pagination Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${FOCUS} ${
                i === currentIndex ? 'w-8 bg-[#574A24]' : 'w-2.5 bg-[#CBBD93]/40 hover:bg-[#CBBD93]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;