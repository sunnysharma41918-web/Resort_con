import React from 'react';
import { Link } from 'react-router-dom';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import financeImg from '../../assets/hospitality-finance.jpg';

const EASE = [0.16, 1, 0.3, 1];

const stops = [
  {
    category: 'Celebrations & MICE',
    title: 'Wedding Planning & Milestones',
    tagline: 'Personalized wedding planning, vendor coordination, and seamless event execution.',
    editorialQuote: 'For milestone celebrations that refuse to compromise on grandeur, intimacy, and grace.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80',
    link: '/services/wedding-planning',
  },
  {
    category: 'Venue Advisory',
    title: 'Banquet Booking & Consultancy',
    tagline: 'Assistance with banquet venue selection, event requirements, and contract coordination.',
    editorialQuote: 'Contract pitfalls disappear. Hidden minimum spends vanish. Every ballroom audited for acoustics and guest comfort.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f7?w=1200&auto=format&fit=crop&q=80',
    link: '/services/banquet-booking-consultancy',
  },
  {
    category: 'Accommodations',
    title: 'Luxury Resorts & Private Villas',
    tagline: 'Resort discovery, property recommendations, venue consultancy, and hospitality solutions.',
    editorialQuote: 'Privileged group rates. Handpicked private villas. Unlocking sanctuary properties standard aggregators can never access.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&auto=format&fit=crop&q=80',
    link: '/services/resorts',
  },
  {
    category: 'Operational Rigor',
    title: 'Corporate Summits & Advisory',
    tagline: 'Hospitality operations consulting, operational audits, SOP development, and yield advisory.',
    editorialQuote: 'From 500-delegate corporate summits to resort yield diagnostics, we bring institutional rigor to every touchpoint.',
    image: financeImg,
    link: '/services/management-consultancy',
  },
];

// Placement of each service inside the 12-column bento
const PLACE = [
  { box: 'lg:col-span-5 lg:row-span-2', size: 'text-3xl lg:text-[2.7rem]' },
  { box: 'lg:col-span-7', size: 'text-2xl lg:text-[2.1rem]' },
  { box: 'lg:col-span-4', size: 'text-2xl lg:text-[1.8rem]' },
  { box: 'lg:col-span-3', size: 'text-xl lg:text-[1.5rem]' },
];

const pad = (n) => String(n).padStart(2, '0');

// light follows the cursor across a tile
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const Tile = ({ stop, index }) => (
  <motion.li
    className={`${PLACE[index].box} min-h-[420px] lg:min-h-0`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 1, delay: (index % 2) * 0.1, ease: EASE }}
  >
    <Link
      to={stop.link}
      onMouseMove={spot}
      className="group relative flex h-full min-h-[inherit] flex-col justify-between overflow-hidden rounded-[28px] bg-[#46344E] p-5 text-white outline-none focus-visible:ring-2 focus-visible:ring-[#FAED26] focus-visible:ring-offset-4 lg:rounded-[36px] lg:p-7 shadow-lg"
    >
      <img
        src={stop.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#221827]/90 via-[#322538]/25 to-[#322538]/30" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.22),transparent_60%)] group-hover:opacity-100" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <span className="rounded-full border border-white/35 bg-white/15 px-3.5 py-1.5 font-sans text-xs font-medium backdrop-blur-md">
          {pad(index + 1)} &nbsp;{stop.category}
        </span>
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#46344E] transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#FAED26] group-hover:text-[#46344E]"
        >
          <ArrowUpRight size={19} />
        </span>
      </div>

      <div className="relative z-10">
        <h3 className={`mb-2 font-display font-black leading-[1.03] tracking-[-0.03em] ${PLACE[index].size}`}>
          {stop.title}
        </h3>
        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-white/80">{stop.tagline}</p>
            {index < 2 && (
              <p className="mt-4 max-w-md border-l-2 border-[#FAED26] pl-4 font-display text-sm font-bold leading-snug">
                {stop.editorialQuote}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  </motion.li>
);

const FeaturedServicesSection = ({
  badge = 'Hospitality & Events Portfolio',
  title = 'Our Core Services',
  lead = 'Explore our eight specialized hospitality disciplines—from bespoke wedding choreography and banquet negotiations to luxury resort stays and management advisory.',
  ctaText = 'Explore All 8 Services In Detail',
  ctaLink = '/services',
}) => (
  <MotionConfig reducedMotion="user">
    <section className="relative w-full overflow-hidden bg-white px-4 pt-8 pb-10 text-[#46344E] sm:px-8 lg:px-14 lg:pt-10 lg:pb-12 border-b border-[#46344E]/10">
      <div className="mx-auto w-full max-w-[1360px]">
        <ul className="grid grid-cols-1 gap-4 lg:auto-rows-[340px] lg:grid-cols-12 lg:gap-5">
          {/* intro tile */}
          <li className="relative overflow-hidden rounded-[28px] bg-[#46344E] p-7 text-white sm:p-9 lg:col-span-8 lg:rounded-[36px] lg:p-12 shadow-xl">
            <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#FAED26]/20 blur-[110px]" />
            <div className="relative flex h-full flex-col justify-between gap-10">
              <p className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/25 py-1.5 pl-3 pr-4 font-sans text-sm font-medium text-[#F4F0F2]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FAED26] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FAED26]" />
                </span>
                {badge}
              </p>
              <div>
                <h2 className="mb-5 font-display text-[clamp(2.6rem,6.4vw,5.8rem)] font-black leading-[0.94] tracking-[-0.05em]">
                  {title.split(' ').map((w, i) => (
                    <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                      <motion.span
                        className="inline-block"
                        initial={{ y: '115%' }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: i * 0.09, ease: EASE }}
                      >
                        {w}&nbsp;
                      </motion.span>
                    </span>
                  ))}
                </h2>
                <p className="max-w-xl font-sans text-sm leading-relaxed text-[#F4F0F2]/80">{lead}</p>
              </div>
            </div>
          </li>

          {/* all-services tile */}
          {ctaText && ctaLink && (
            <li className="min-h-[300px] lg:col-span-4 lg:min-h-0">
              <Link
                to={ctaLink}
                className="group flex h-full min-h-[inherit] flex-col justify-between rounded-[28px] bg-[#F4F0F2] p-7 text-[#46344E] outline-none transition-colors duration-500 hover:bg-[#FAED26] hover:text-[#46344E] focus-visible:ring-2 focus-visible:ring-[#FAED26] focus-visible:ring-offset-4 lg:rounded-[36px] lg:p-9 shadow-md"
              >
                <div>
                  <span
                    className="block font-display text-[clamp(5rem,9vw,8rem)] font-black leading-none tracking-tighter text-transparent"
                    style={{ WebkitTextStroke: '2px #46344E' }}
                  >
                    {pad(servicesData.length)}
                  </span>
                  <p className="mt-1 font-display text-xl font-bold tracking-tight">disciplines, one team</p>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <span className="font-sans text-sm font-bold">{ctaText}</span>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#46344E] text-[#FAED26] transition-transform duration-500 group-hover:rotate-[-45deg]">
                    <ArrowRight size={22} />
                  </span>
                </div>
              </Link>
            </li>
          )}

          {/* service tiles */}
          {stops.map((stop, i) => (
            <Tile key={stop.title} stop={stop} index={i} />
          ))}
        </ul>

        {/* every service */}
        <ul className="mt-10 flex flex-wrap gap-2.5 border-t border-[#46344E]/10 pt-8 lg:mt-14">
          {servicesData.map((svc, i) => (
            <li key={svc.id}>
              <Link
                to={`/services/${svc.id}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-[#46344E]/15 py-2.5 pl-4 pr-5 font-sans text-sm font-semibold text-[#46344E] transition-colors duration-300 hover:border-[#46344E] hover:bg-[#46344E] hover:text-[#FAED26]"
              >
                <span className="font-display text-xs font-bold text-[#5A5560] transition-colors duration-300 group-hover:text-[#FAED26]">
                  {pad(i + 1)}
                </span>
                {svc.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </MotionConfig>
);

export default FeaturedServicesSection;