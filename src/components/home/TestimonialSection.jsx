import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react';
import { testimonialsData } from '../../data/testimonialsData';

/* ------------------------------------------------------------------ */
/*  A short, playful testimonial section: a deck of colourful cards.   */
/*  Flick the top card away (or press next) and it slides to the back  */
/*  of the deck. The next button wears a ring that fills as a timer;   */
/*  when the ring closes, the deck shuffles by itself. Hover pauses.   */
/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1];
const AUTOPLAY_MS = 6500;
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46344E]';

/* card colours cycle by testimonial */
const TONES = [
  { bg: '#46344E', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.7)' },
  { bg: '#FAED26', fg: '#46344E', sub: 'rgba(70,52,78,0.7)' },
  { bg: '#0F2322', fg: '#ECEBE4', sub: 'rgba(236,235,228,0.7)' },
  { bg: '#3AAFA9', fg: '#0F2322', sub: 'rgba(15,35,34,0.7)' },
  { bg: '#ECEBE4', fg: '#46344E', sub: 'rgba(70,52,78,0.7)' },
];

/* where each card sits in the deck: front, middle, back */
const SLOTS = [
  { x: 0, y: 0, rotate: 0, scale: 1 },
  { x: 16, y: 18, rotate: 4, scale: 0.95 },
  { x: -14, y: 34, rotate: -4, scale: 0.9 },
];

const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();

const Avatar = ({ src, name, tone }) => {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (!src || failed)
    return (
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-black"
        style={{ background: tone.fg, color: tone.bg }}
      >
        {initials(name)}
      </span>
    );
  return (
    <img src={src} alt="" draggable={false} onError={() => setFailed(true)} className="h-11 w-11 shrink-0 rounded-full object-cover" />
  );
};

/* one card in the deck */
const Card = ({ item, tone, pos, onThrow, reduced }) => {
  const x = useMotionValue(0);
  const tilt = useTransform(x, [-220, 220], [-10, 10]);
  const slot = SLOTS[pos];
  return (
    <motion.div
      style={{ x, zIndex: 10 - pos, background: tone.bg, color: tone.fg }}
      initial={reduced ? false : { opacity: 0, y: 60, rotate: 0, scale: 0.9 }}
      animate={{ ...slot, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 170, damping: 22 }}
      drag={pos === 0 ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      dragSnapToOrigin
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 550) onThrow();
      }}
      aria-hidden={pos !== 0}
      className={`absolute inset-x-0 top-0 flex h-[17.5rem] flex-col justify-between rounded-[28px] p-6 shadow-[0_24px_50px_-18px_rgba(70,52,78,0.55)] sm:h-[18.5rem] sm:p-7 ${pos === 0 ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
        }`}
    >
      <motion.div style={{ rotate: pos === 0 ? tilt : 0 }} className="flex h-full flex-col justify-between">
        <blockquote className="line-clamp-5 font-display text-[1.12rem] font-semibold leading-[1.28] tracking-[-0.02em] sm:text-[1.3rem]">
          {item.quote}
        </blockquote>
        <div className="flex items-center gap-3">
          <Avatar src={item.avatar} name={item.author} tone={tone} />
          <div className="min-w-0">
            <p className="truncate font-display text-base font-bold tracking-[-0.02em]">{item.author}</p>
            <p className="truncate font-sans text-xs" style={{ color: tone.sub }}>
              {item.role}, {item.company}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TestimonialSection = ({
  titleLine1 = 'Client Stories:',
  titleLine2 = 'Hospitality Delivered With Care',
  ctaText = 'View all',
  ctaLink = '/projects',
}) => {
  const items = useMemo(() => testimonialsData.slice(0, 5), []);
  const reduced = useReducedMotion();
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [paused, setPaused] = useState(false);

  if (!items.length) return null;
  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  const top = order[0];
  const canPlay = !reduced && items.length > 1;

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F4F0F2] px-5 py-14 text-[#46344E] sm:px-10 lg:px-16 lg:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{'@keyframes ts-ring{from{stroke-dashoffset:132}to{stroke-dashoffset:0}}'}</style>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1, ease: EASE }}
        className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-[1fr_27rem] lg:gap-16"
      >
        {/* left: title and controls */}
        <div>
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.8rem)] font-black leading-[1] tracking-[-0.04em]">
            {titleLine1}
            <span className="block text-[#46344E]/45">{titleLine2}</span>
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous story"
              className={`flex h-12 w-12 items-center justify-center rounded-full border border-[#46344E]/25 transition-colors duration-300 hover:bg-[#46344E] hover:text-white ${FOCUS}`}
            >
              <ArrowLeft size={17} />
            </button>

            {/* next button with a timer ring */}
            <button
              type="button"
              onClick={next}
              aria-label="Next story"
              className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-[#46344E] text-[#FAED26] transition-transform duration-300 hover:scale-105 ${FOCUS}`}
            >
              <ArrowRight size={17} />
              <svg viewBox="0 0 48 48" className="pointer-events-none absolute -inset-1 h-[3.5rem] w-[3.5rem] -rotate-90" aria-hidden="true">
                <circle cx="24" cy="24" r="21" fill="none" stroke="#46344E" strokeOpacity="0.15" strokeWidth="2" />
                <circle
                  key={top}
                  cx="24"
                  cy="24"
                  r="21"
                  fill="none"
                  stroke="#46344E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="132"
                  strokeDashoffset={canPlay ? 132 : 0}
                  onAnimationEnd={next}
                  style={
                    canPlay
                      ? { animation: `ts-ring ${AUTOPLAY_MS}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }
                      : undefined
                  }
                />
              </svg>
            </button>

            <span className="ml-3 font-sans text-sm tabular-nums text-[#46344E]/60">
              {top + 1} of {items.length}
            </span>

            {ctaText && ctaLink && (
              <Link
                to={ctaLink}
                className={`group relative ml-auto inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#46344E]/25 py-1.5 pl-5 pr-1.5 font-sans text-sm font-bold ${FOCUS}`}
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-[#46344E] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative transition-colors duration-500 group-hover:text-white">{ctaText}</span>
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#FAED26] text-[#46344E]">
                  <ArrowRight size={14} />
                </span>
              </Link>
            )}
          </div>

          <p className="mt-6 flex items-center gap-2 font-sans text-xs text-[#46344E]/55">
            <motion.span
              animate={reduced ? undefined : { x: [-4, 4, -4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="flex"
            >
              <MoveHorizontal size={15} />
            </motion.span>
            Drag the top card away to see the next story
          </p>
        </div>

        {/* right: the deck */}
        <div className="relative mx-auto h-[22.5rem] w-full max-w-[26rem] sm:h-[23.5rem] lg:mx-0" aria-live="polite">
          {order.slice(0, 3).map((idx, pos) => (
            <Card key={idx} item={items[idx]} tone={TONES[idx % TONES.length]} pos={pos} onThrow={next} reduced={reduced} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialSection;