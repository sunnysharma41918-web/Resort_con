import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, MotionConfig, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

const workflowSteps = [
  {
    step: '01',
    stage: 'Prompt',
    category: 'Celebration vision',
    title: 'Personalized choreography',
    tagline: 'Bespoke timelines, decor styling, and event coordination.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1000&auto=format&fit=crop&q=80',
    deliverables: ['Master timelines', 'Theme styling', 'Vendor vetting'],
    guarantee: 'Flawless day-of execution',
    link: '/services/wedding-planning',
  },
  {
    step: '02',
    stage: 'Sketch',
    category: 'Venue & banquet vetting',
    title: 'Architectural blueprint',
    tagline: 'Ballroom vetting, capacity audits, and protected contracts.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f7?w=1000&auto=format&fit=crop&q=80',
    deliverables: ['Ballroom audits', 'Contract protection', 'F&B minimums'],
    guarantee: 'Preferred concessions',
    link: '/services/banquet-booking',
  },
  {
    step: '03',
    stage: 'Color',
    category: 'Hospitality staging',
    title: 'Curated guest stays',
    tagline: 'Luxury room blocks, charter transfers, and a concierge desk.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000&auto=format&fit=crop&q=80',
    deliverables: ['Room blocks', 'VIP charters', '24/7 concierge'],
    guarantee: 'Zero travel friction',
    link: '/services/resorts',
  },
  {
    step: '04',
    stage: 'Final',
    category: 'Operational rigor',
    title: 'Flawless execution',
    tagline: '100% on-time protocol, operational audits, and SOP governance.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80',
    deliverables: ['SOP checklists', 'Etiquette training', 'RevPAR growth'],
    guarantee: 'Proven standards',
    link: '/services/management-consultancy',
  },
];

// Each stage sits a step lower than the last, so the row reads as progress
const STAIRS = ['lg:mt-0', 'lg:mt-14', 'lg:mt-28', 'lg:mt-44'];

const Card = ({ item, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);

  return (
    <motion.li
      ref={ref}
      className={STAIRS[index]}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: index * 0.12, ease: EASE }}
    >
      <Link
        to={item.link}
        className="group block rounded-t-[999px] rounded-b-[28px] outline-none focus-visible:ring-2 focus-visible:ring-[#FAED26] focus-visible:ring-offset-4"
      >
        {/* arch photo */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-[#F4F0F2]">
          <motion.img
            src={item.image}
            alt=""
            loading="lazy"
            style={{ y }}
            className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-white px-3.5 py-1.5 font-sans text-xs font-bold text-[#46344E]">
            {item.step} &nbsp;{item.stage}
          </span>
          <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#46344E] text-white transition-colors duration-300 group-hover:bg-[#FAED26] group-hover:text-[#46344E]">
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </span>
        </div>

        {/* copy */}
        <div className="px-1 pt-5">
          <p className="mb-1.5 font-sans text-sm font-medium text-[#5A5560]">{item.category}</p>
          <h3 className="mb-2 font-display text-2xl font-black leading-[1.05] tracking-tight text-[#46344E] xl:text-[1.7rem]">
            {item.title}
          </h3>
          <p className="mb-4 font-sans text-sm leading-relaxed text-[#5A5560]">{item.tagline}</p>

          <ul className="divide-y divide-[#46344E]/10 border-y border-[#46344E]/10">
            {item.deliverables.map((d) => (
              <li key={d} className="py-2 font-sans text-[13px] text-[#46344E]">
                {d}
              </li>
            ))}
          </ul>

          <p className="mt-4 flex items-center gap-2 font-sans text-xs font-bold text-[#46344E]">
            <Check size={14} className="shrink-0 text-[#FAED26]" />
            {item.guarantee}
          </p>
        </div>
      </Link>
    </motion.li>
  );
};

const StrategicPillarsSection = ({
  ctaBadge = 'Start your plan',
  ctaLink = '/contact',
  title = 'Why Leading Clients Choose Us',
  lead = 'A four-stage path from first creative vision to flawless five-star execution.',
}) => {
  const words = title.split(' ');

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="why-choose-us"
        className="relative w-full overflow-hidden bg-white px-4 pt-8 pb-10 text-[#46344E] sm:px-8 lg:px-14 lg:pt-10 lg:pb-12 border-b border-[#46344E]/10"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          {/* headline: the one orchestrated entrance */}
          <h2 className="mb-6 font-display text-[clamp(2.6rem,7.4vw,7rem)] font-black leading-[1] tracking-[-0.045em] text-[#46344E] lg:mb-8">
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '115%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.08, ease: EASE }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              </React.Fragment>
            ))}
          </h2>

          <div className="mb-8 flex flex-col justify-between gap-6 border-t border-[#46344E]/15 pt-5 sm:flex-row sm:items-center lg:mb-10">
            <p className="max-w-sm font-sans text-sm leading-relaxed text-[#5A5560]">{lead}</p>
            {ctaBadge && (
              <Link
                to={ctaLink}
                className="group relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-full border border-[#46344E]/25 py-1.5 pl-5 pr-1.5 font-sans text-sm font-bold text-[#46344E] transition-colors duration-500 hover:text-white"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-[#46344E] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                <span className="relative">{ctaBadge}</span>
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#FAED26] text-[#46344E]">
                  <ArrowRight size={16} />
                </span>
              </Link>
            )}
          </div>

          {/* four stages, climbing left to right on desktop */}
          <ol className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-start lg:pb-2">
            {workflowSteps.map((item, i) => (
              <Card key={item.step} item={item} index={i} />
            ))}
          </ol>
        </div>
      </section>
    </MotionConfig>
  );
};

export default StrategicPillarsSection;