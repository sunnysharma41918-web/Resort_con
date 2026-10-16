import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

const steps = [
  {
    step: '01', stage: 'Prompt', category: 'Celebration vision',
    title: 'Personalized choreography',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&auto=format&fit=crop&q=80',
    deliverables: ['Master timelines', 'Theme styling', 'Vendor vetting'],
    guarantee: 'Flawless day-of execution',
    link: '/services/wedding-planning',
  },
  {
    step: '02', stage: 'Sketch', category: 'Venue & banquet vetting',
    title: 'Architectural blueprint',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f7?w=1400&auto=format&fit=crop&q=80',
    deliverables: ['Ballroom audits', 'Contract protection', 'F&B minimums'],
    guarantee: 'Preferred concessions',
    link: '/services/banquet-booking-consultancy',
  },
  {
    step: '03', stage: 'Color', category: 'Hospitality staging',
    title: 'Curated guest stays',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&auto=format&fit=crop&q=80',
    deliverables: ['Room blocks', 'VIP charters', '24/7 concierge'],
    guarantee: 'Zero travel friction',
    link: '/services/resorts',
  },
  {
    step: '04', stage: 'Final', category: 'Operational rigor',
    title: 'Flawless execution',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&auto=format&fit=crop&q=80',
    deliverables: ['SOP checklists', 'Etiquette training', 'RevPAR growth'],
    guarantee: 'Proven standards',
    link: '/services/management-consultancy',
  },
];

const SANS = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };

// circular text that slowly turns, with a link in the middle
const SpinBadge = ({ to, text }) => (
  <Link
    to={to}
    aria-label="Start your plan"
    className="group relative flex h-[104px] w-[104px] shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#574A24] focus-visible:ring-offset-4"
  >
    <motion.svg
      viewBox="0 0 120 120"
      className="absolute inset-0 h-full w-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
      aria-hidden="true"
    >
      <defs>
        <path id="spin-circle" d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" />
      </defs>
      <text fontSize="10.5" fill="#574A24" textLength="296" lengthAdjust="spacing" style={SANS}>
        <textPath href="#spin-circle">{text}</textPath>
      </text>
    </motion.svg>
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#CBBD93] text-[#574A24] transition-transform duration-500 group-hover:rotate-45">
      <ArrowUpRight size={20} />
    </span>
  </Link>
);

const StrategicPillarsSplit = ({
  titleLines = ['Why Leading', 'Clients', 'Choose Us'],
  eyebrow = 'A four-stage path to five-star events',
  lead = 'From first creative vision to flawless execution, every stage is planned, vetted and delivered by one team. Pick a stage to see what you get.',
  ctaBadge = 'Start your plan',
  ctaLink = '/contact',
  badgeText = 'from first vision to flawless execution ',
}) => {
  const [active, setActive] = useState(0);
  const cur = steps[active];

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="why-choose-us"
        className="w-full min-h-screen bg-white px-4 py-8 sm:px-8 sm:py-12 lg:px-14 lg:py-8 flex flex-col justify-center text-[#574A24]"
      >
        <div className="mx-auto grid w-full max-w-[1360px] flex-1 items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 my-auto">
          {/* left: copy */}
          <div className="flex flex-col justify-center py-2 lg:py-4" style={SANS}>
            <div className="flex items-start justify-between gap-4">
              <p className="pt-2 text-sm sm:text-base font-medium text-[#80775C]">{eyebrow}</p>
              <SpinBadge to={ctaLink} text={badgeText} />
            </div>

            <h2 className="mt-2 text-[clamp(2.5rem,4.8vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.035em] text-[#574A24]">
              {titleLines.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: '105%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: i * 0.1, ease: EASE }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </h2>

            <p className="mt-4 sm:mt-6 max-w-md text-[14px] sm:text-[15px] leading-relaxed text-[#574A24]/85">{lead}</p>

            <Link
              to={ctaLink}
              className="group mt-6 sm:mt-8 inline-flex w-fit items-center gap-6 rounded-full bg-[#574A24] py-2 pl-7 pr-2 text-sm font-semibold text-[#FAE8B4] outline-none transition-colors duration-300 hover:bg-[#43381a] focus-visible:ring-2 focus-visible:ring-[#574A24] focus-visible:ring-offset-4"
            >
              {ctaBadge}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CBBD93] text-[#574A24] transition-colors duration-300 group-hover:bg-[#FAE8B4]">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>

          {/* right: compact soft image panel with a frosted selector card */}
          <div className="relative h-[400px] sm:h-[460px] lg:h-[490px] w-full max-w-[500px] justify-self-center lg:justify-self-end overflow-hidden rounded-[24px] bg-[#FAE8B4]/30 lg:rounded-[32px] shadow-xl">
            {steps.map((s, i) => (
              <img
                key={s.step}
                src={s.image}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-out ${i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                  }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-br from-[#CBBD93]/35 via-transparent to-[#574A24]/40 mix-blend-multiply" />

            <div
              className="absolute inset-x-3 bottom-3 rounded-[20px] border border-[#FAE8B4]/40 bg-[#574A24]/80 p-3.5 text-[#FAE8B4] shadow-lg backdrop-blur-xl sm:left-auto sm:right-4 sm:bottom-4 sm:w-[280px] lg:bottom-auto lg:right-5 lg:top-5 lg:rounded-[24px] lg:p-4"
              style={SANS}
            >
              <div className="flex items-center gap-2.5" role="group" aria-label="Choose a stage">
                {steps.map((s, i) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    aria-label={`${s.step} ${s.stage}`}
                    className={`relative h-11 w-11 overflow-hidden rounded-full border-2 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#CBBD93] ${i === active ? 'scale-110 border-[#CBBD93]' : 'border-white/40 opacity-80 hover:opacity-100'
                      }`}
                  >
                    <img src={s.image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>

              <p className="mt-4 text-xs font-medium text-[#FAE8B4]/85">
                {cur.step} &nbsp;{cur.stage} &nbsp;&nbsp;{cur.category}
              </p>
              <h3 className="mt-1 text-xl font-medium leading-tight tracking-[-0.02em]">{cur.title}</h3>

              <ul className="mt-3 space-y-1 text-[13px] text-[#FAE8B4]/90">
                {cur.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>

              <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#CBBD93]">
                <Check size={14} className="shrink-0" />
                {cur.guarantee}
              </p>

              <Link
                to={cur.link}
                className="group mt-4 inline-flex items-center gap-3 rounded-full bg-[#FAE8B4] py-1.5 pl-4 pr-1.5 text-sm font-semibold text-[#574A24] outline-none transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-[#FAE8B4]"
              >
                See more
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#574A24] text-[#FAE8B4] transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export { StrategicPillarsSplit as StrategicPillarsSection };
export default StrategicPillarsSplit;