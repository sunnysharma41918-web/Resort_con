import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import headVideo from '../assets/HEAD.mp4';

/* ------------------------------------------------------------------ */
/*  Full-screen video hero.                                            */
/*  One resort video plays behind everything, under a soft dark veil.  */
/*  The headline rises out of masks, the lead and buttons follow, and  */
/*  the video drifts and scales slowly as you scroll. Until the video  */
/*  is ready (or if the file is missing) a drifting colour glow shows. */
/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1];
const DEFAULT_HEADLINE = ['Where Hospitality', 'Meets Excellence.'];
const DEFAULT_LEAD =
  'S4Consultancy is your trusted partner for luxury event planning, banquet booking, resort and hotel stays, destination weddings, and strategic hospitality management consultancy.';

const DEFAULT_VIDEO = { src: headVideo };

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FAED26]';

/* ---------- headline: words rise out of masks ---------- */
const lineV = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } };
const wordV = {
  hidden: { y: '112%', rotate: 4 },
  visible: { y: 0, rotate: 0, transition: { duration: 1.2, ease: EASE } },
};
const Line = ({ text }) => (
  <motion.span variants={lineV} className="block">
    {text.split(' ').map((w, i) => (
      <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom">
        <motion.span variants={wordV} className="inline-block origin-bottom-left">
          {w}
        </motion.span>
      </span>
    ))}
  </motion.span>
);

/* ---------- count-up ---------- */
const CountUp = ({ value }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const str = String(value);
  const m = str.match(/^(\D*?)(\d[\d,]*\.?\d*)(.*)$/);
  const [text, setText] = useState(m && !reduced ? `${m[1]}0${m[3]}` : str);
  useEffect(() => {
    if (!m || reduced) {
      setText(str);
      return undefined;
    }
    if (!inView) return undefined;
    const target = parseFloat(m[2].replace(/,/g, ''));
    const dec = (m[2].split('.')[1] || '').length;
    const c = animate(0, target, {
      duration: 2,
      delay: 1,
      ease: EASE,
      onUpdate: (v) =>
        setText(
          `${m[1]}${v.toLocaleString('en-US', {
            minimumFractionDigits: dec,
            maximumFractionDigits: dec,
            useGrouping: m[2].includes(','),
          })}${m[3]}`
        ),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, str, reduced]);
  return <span ref={ref}>{text}</span>;
};

/* ---------- magnetic wrapper ---------- */
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

/* ---------- action as <a>, <Link> or <button> ---------- */
const ActionEl = ({ action, className, children, scrollToId }) => {
  const go = (e, id) => {
    if (!id) return;
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  if (action.to && action.to.startsWith('#'))
    return (
      <a href={action.to} onClick={(e) => go(e, action.to.substring(1))} className={className}>
        {children}
      </a>
    );
  if (action.to)
    return (
      <Link to={action.to} className={className}>
        {children}
      </Link>
    );
  return (
    <button type="button" className={className} onClick={(e) => (action.onClick ? action.onClick(e) : go(e, scrollToId))}>
      {children}
    </button>
  );
};

/* ================================================================== */

const HeroBanner = ({
  headline,
  title,
  lead,
  primaryAction,
  secondaryAction,
  stats,
  statNumber,
  statLabel,
  scrollToId,
  showStats = true,
  video: videoProp,
  backgroundVideo,
}) => {
  const reduced = useReducedMotion();
  const k = reduced ? 0 : 1;
  const rawVideo = videoProp !== undefined ? videoProp : backgroundVideo;
  const videoSrc =
    typeof rawVideo === 'string'
      ? rawVideo
      : rawVideo?.src ||
        rawVideo?.default ||
        (typeof DEFAULT_VIDEO === 'string' ? DEFAULT_VIDEO : DEFAULT_VIDEO?.src || DEFAULT_VIDEO?.default);

  const resolvedHeadline = headline || title || DEFAULT_HEADLINE;
  const resolvedLead = lead !== undefined ? lead : DEFAULT_LEAD;
  const resolvedPrimary =
    primaryAction !== undefined ? primaryAction : { text: 'Explore Our Services', to: '/services' };
  let resolvedStats = null;
  if (stats !== undefined) resolvedStats = stats;
  else if (statNumber) resolvedStats = [{ value: statNumber, label: statLabel || '' }];
  const statList = showStats && resolvedStats?.length > 0 ? resolvedStats.slice(0, 3) : [];
  const lines = Array.isArray(resolvedHeadline) ? resolvedHeadline.map(String) : [String(resolvedHeadline)];

  /* scroll: video eases in, words lift away */
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });
  const vScale = useTransform(p, [0, 1], [1.02, 1 + 0.16 * k]);
  const vY = useTransform(p, [0, 1], [0, 80 * k]);
  const textY = useTransform(p, [0, 1], [0, -90 * k]);
  const textOp = useTransform(p, [0, 0.7], [1, 0.1]);

  const mx = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const gx = useTransform(mx, (v) => (reduced ? 0 : v * 90));

  return (
    <section
      ref={ref}
      onMouseMove={(e) => mx.set(e.clientX / window.innerWidth - 0.5)}
      className="relative w-full overflow-hidden bg-[#0A1819] text-white"
    >
      {/* fallback: slow colour glows, always underneath the video */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,#1f3f3e_0%,#0F2322_55%,#0A1819_100%)]">
        <motion.div style={{ x: gx }} className="absolute -left-20 top-0 h-[34rem] w-[34rem]">
          <motion.div
            className="h-full w-full rounded-full bg-[#3AAFA9]/30 blur-3xl"
            animate={reduced ? undefined : { scale: [1, 1.2, 1], x: [0, 60, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.div
          className="absolute -right-24 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#FAED26]/25 blur-3xl"
          animate={reduced ? undefined : { scale: [1.1, 0.9, 1.1], y: [0, -50, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* the hero background video */}
      {videoSrc && (
        <motion.div
          style={{ scale: vScale, y: vY }}
          className="absolute inset-0 h-full w-full overflow-hidden"
        >
          <video
            ref={(el) => {
              if (el) {
                el.defaultMuted = true;
                el.muted = true;
                const p = el.play();
                if (p && typeof p.catch === 'function') p.catch(() => {});
              }
            }}
            key={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>
      )}

      {/* balanced veil keeps the video clear and words readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1819]/80 via-[#0A1819]/25 to-[#0A1819]/45" />

      <motion.div
        style={{ y: textY, opacity: textOp }}
        className="relative z-10 mx-auto flex min-h-svh max-w-[88rem] flex-col justify-end px-6 pb-14 pt-32 sm:px-10 lg:px-16 lg:pb-16"
      >
        <motion.h1
          initial={reduced ? false : 'hidden'}
          animate="visible"
          className="font-display text-[clamp(2.8rem,8vw,8.5rem)] font-medium leading-[0.96] tracking-[-0.045em] text-white"
        >
          {lines.map((l, i) => (
            <Line key={i} text={l} />
          ))}
        </motion.h1>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.1 }}
            className="max-w-md"
          >
            {resolvedLead && <p className="font-sans text-sm leading-relaxed text-white/85 sm:text-base">{resolvedLead}</p>}
            {(resolvedPrimary || secondaryAction) && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {resolvedPrimary && (
                  <Magnetic>
                    <ActionEl
                      action={resolvedPrimary}
                      scrollToId={scrollToId}
                      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#ECEBE4] py-1.5 pl-6 pr-1.5 font-sans text-sm font-bold text-[#46344E] ${FOCUS}`}
                    >
                      <span className="absolute inset-0 translate-y-full rounded-full bg-[#FAED26] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                      <span className="relative">{resolvedPrimary.text}</span>
                      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#46344E] text-[#FAED26] transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight size={16} strokeWidth={2.4} />
                      </span>
                    </ActionEl>
                  </Magnetic>
                )}
                {secondaryAction && (
                  <ActionEl
                    action={secondaryAction}
                    scrollToId={scrollToId}
                    className={`inline-flex items-center rounded-full border border-white/35 px-5 py-3 font-sans text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-500 hover:bg-white/15 ${FOCUS}`}
                  >
                    {secondaryAction.text}
                  </ActionEl>
                )}
              </div>
            )}
          </motion.div>

          {statList.length > 0 && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1.3 }}
              className="flex gap-10 font-sans"
            >
              {statList.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-medium tracking-tight sm:text-4xl">
                    <CountUp value={s.value} />
                  </div>
                  <div className="mt-1 text-xs text-white/75 sm:text-sm">{s.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;