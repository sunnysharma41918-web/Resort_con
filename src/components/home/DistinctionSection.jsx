import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  MotionConfig,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, ArrowUpRight, BedDouble, Gem, Landmark, TrendingUp } from 'lucide-react';
import solutionsImg from '../../assets/OURSOLUTIONS.jpg';
import moveVideo from '../../assets/MOVE.mp4';

const EASE = [0.16, 1, 0.3, 1];
const ICONS = [Gem, Landmark, BedDouble, TrendingUp];
const pad = (n) => String(n).padStart(2, '0');

/* statement word that fills in as you scroll past it */
const Word = ({ w, i, n, progress }) => {
  const start = (i / n) * 0.85;
  const opacity = useTransform(progress, [start, start + 0.15], [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.24em] inline-block">
      {w}
    </motion.span>
  );
};

/* one of the standards, as a column */
const Point = ({ text, i }) => {
  const Icon = ICONS[i % ICONS.length];
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
      className="group relative border-t border-[#46344E]/15 pb-2 pt-6"
    >
      <span className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-[#FAED26] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
      <div className="mb-8 flex items-center justify-between">
        <span className="font-display text-sm font-bold text-[#46344E]/40">{pad(i + 1)}</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4F0F2] text-[#5A5560] transition-colors duration-500 group-hover:bg-[#46344E] group-hover:text-[#FAED26]">
          <Icon size={19} strokeWidth={2.1} />
        </span>
      </div>
      <p className="font-display text-xl font-bold leading-[1.15] tracking-tight text-[#46344E] sm:text-[1.45rem]">
        {text}
      </p>
    </motion.li>
  );
};

/* button that leans toward the cursor */
const MagneticCta = ({ to, children }) => {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div style={{ x, y }} onMouseMove={onMove} onMouseLeave={reset} className="inline-block">
      <Link
        to={to}
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#46344E] py-1.5 pl-6 pr-1.5 font-sans text-sm font-bold text-white shadow-md"
      >
        <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-[#FAED26] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
        <span className="relative transition-colors duration-300 group-hover:text-[#46344E]">{children}</span>
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#FAED26] text-[#46344E] transition-transform duration-500 group-hover:rotate-[360deg] group-hover:bg-[#46344E] group-hover:text-[#FAED26]">
          <ArrowRight size={17} />
        </span>
      </Link>
    </motion.div>
  );
};

const DistinctionSection = ({
  id = 'solutions-section',
  badge = 'The S4Consultancy Standard',
  quote = 'Hospitality is more than just service—it is the art of curating unforgettable moments, seamless stays, and high-yield property operations with elegance, precision, and heartfelt care.',
  points = [
    'Personalized Wedding & Event Planning',
    'Banquet Booking & Contract Advisory',
    'Curated Resort & Hotel Stays',
    'Strategic Management Consultancy',
  ],
  buttonText = 'Discover The S4 Standard',
  buttonLink = '/standard',
  video = moveVideo,
  image = solutionsImg,
}) => {
  const quoteWords = quote.split(' ');

  // statement fills in with scroll
  const quoteRef = useRef(null);
  const { scrollYProgress: quoteP } = useScroll({
    target: quoteRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  // image band opens from a narrow window to full width
  const bandRef = useRef(null);
  const { scrollYProgress: bandP } = useScroll({
    target: bandRef,
    offset: ['start end', 'center center'],
  });
  const clip = useTransform(bandP, [0, 1], [
    'inset(0% 16% 0% 16% round 44px)',
    'inset(0% 0% 0% 0% round 32px)',
  ]);
  const imgScale = useTransform(bandP, [0, 1], [1.25, 1]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id={id}
        className="relative w-full overflow-hidden bg-white px-4 pt-6 pb-10 text-[#46344E] sm:px-8 lg:px-14 lg:pt-8 lg:pb-12 border-b border-[#46344E]/10"
      >
        <div className="mx-auto w-full max-w-[1360px]">
          {/* heading */}
          <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#46344E]/15 py-1.5 pl-3 pr-4 font-sans text-sm font-medium text-[#5A5560]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FAED26] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FAED26]" />
            </span>
            (S4) Hospitality &amp; Events
          </p>

          <h2 className="mb-8 font-display text-[clamp(3rem,10vw,9.5rem)] font-black leading-[0.9] tracking-[-0.055em] lg:mb-12">
            {badge.split(' ').map((w, i) => (
              <span key={i} className="mr-[0.2em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: '115%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: i * 0.1, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* statement, offset to the right like a magazine pull-quote */}
          <div className="mb-10 grid lg:mb-14 lg:grid-cols-12">
            <blockquote ref={quoteRef} className="m-0 lg:col-span-9 lg:col-start-4">
              <p className="font-display text-[clamp(1.6rem,3.5vw,3.4rem)] font-bold leading-[1.14] tracking-[-0.025em]">
                {quoteWords.map((w, i) => (
                  <Word key={i} w={w} i={i} n={quoteWords.length} progress={quoteP} />
                ))}
              </p>
            </blockquote>
          </div>

          {/* cinematic video band */}
          <div ref={bandRef} className="relative mb-10 lg:mb-14">
            <motion.div
              style={{ clipPath: clip }}
              className="relative h-[52vh] min-h-[340px] overflow-hidden bg-[#46344E] lg:h-[78vh]"
            >
              <motion.div style={{ scale: imgScale }} className="h-full w-full">
                <video
                  ref={(el) => {
                    if (el) {
                      el.defaultMuted = true;
                      el.muted = true;
                    }
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={image}
                  className="h-full w-full select-none object-cover object-center"
                >
                  <source src={video} type="video/mp4" />
                </video>
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#221827]/85 via-[#322538]/30 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white lg:inset-x-10 lg:bottom-9">
                <div>
                  <p className="font-display text-2xl font-black leading-tight tracking-tight lg:text-4xl">
                    S4Consultancy
                  </p>
                  <p className="mt-1 font-sans text-sm text-white/80">Hospitality &amp; Event Advisory</p>
                </div>
                <Link
                  to={buttonLink}
                  aria-label={buttonText}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#46344E] transition-colors duration-300 hover:bg-[#FAED26] hover:text-[#46344E] lg:h-20 lg:w-20"
                >
                  <ArrowUpRight size={26} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* standards */}
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
            <ul className="grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
              {points.map((p, i) => (
                <Point key={p} text={p} i={i} />
              ))}
            </ul>
            <div className="lg:col-span-3 lg:flex lg:justify-end">
              <MagneticCta to={buttonLink}>{buttonText}</MagneticCta>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default DistinctionSection;