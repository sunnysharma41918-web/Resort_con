import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Heart, Building2, BedDouble, Compass } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];
const TERRA = '#80775C';

/* ---------------------------------------------------------------
   Headline: words rise from behind a mask.
   Real heading tag + aria-label are kept, so SEO and screen readers
   see the full sentence.
---------------------------------------------------------------- */
const MaskedTitle = ({ text, as: Tag = 'h2', className, delay = 0, onScroll = true, id }) => {
  const reduce = useReducedMotion();
  const words = text ? text.split(' ') : [];

  return (
    <Tag id={id} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.12em] mr-[0.22em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: '115%' }}
            animate={!onScroll ? { y: 0 } : undefined}
            whileInView={onScroll ? { y: 0 } : undefined}
            viewport={onScroll ? { once: true, amount: 0.2 } : undefined}
            transition={{
              duration: 1.0,
              ease: EASE,
              delay: delay + i * 0.05
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export const defaultServices = [
  { icon: Heart, title: 'Weddings & events', text: 'Planning, vendors and decor for multi-day celebrations.' },
  { icon: Building2, title: 'Banquet advice', text: 'Venue comparisons and contract negotiation on your side.' },
  { icon: BedDouble, title: 'Stays & group travel', text: 'Hotels, villas, resort buyouts and room blocks.' },
  { icon: Compass, title: 'Management advisory', text: 'Service-standard guidance for hotel and resort owners.' }
];

export const defaultSteps = [
  { title: 'Listen', text: 'We start with your dates, guests, budget and the feeling you want the occasion to have.' },
  { title: 'Curate', text: 'You get a short list of venues, stays and vendors we would book ourselves, with honest comparisons.' },
  { title: 'Coordinate', text: 'We handle contracts, bookings and suppliers so you deal with one team.' },
  { title: 'Host', text: 'Our people are on site to look after guests while you enjoy the day.' }
];

export const defaultLeaders = [
  { name: 'S. Sharma', role: 'Managing Principal & Founder', initials: 'SS' },
  { name: 'A. Singhania', role: 'Partner, Venue Advisory & Group Stays', initials: 'AS' },
  { name: 'R. Kulkarni', role: 'Director of Hospitality Operations', initials: 'RK' }
];

/* Shared focus ring so every control is visible to keyboard users */
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CBBD93]';

/* Word component that illuminates on scroll */
const LeadWord = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.28em] transition-opacity">
      {word}
    </motion.span>
  );
};

/* ---------- Service card: spotlight follows the cursor, gentle 3D tilt ---------- */
const ServiceCard = ({ service }) => {
  const cardRef = useRef(null);
  const Icon = service.icon;
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
    const rx = -((y - 50) / 50) * 8;
    const ry = ((x - 50) / 50) * 8;
    setTilt({ rx, ry });
  };

  const handlePointerLeave = () => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <li className="list-none">
      <div
        ref={cardRef}
        onPointerEnter={() => setHovered(true)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
        }}
        className="group relative overflow-hidden rounded-3xl border border-[#CBBD93]/30 bg-white/70 p-7 min-h-[17rem] h-full flex flex-col justify-between will-change-transform shadow-sm hover:shadow-lg"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(380px circle at ${coords.x}% ${coords.y}%, rgba(203, 189, 147, 0.2), transparent 60%)`
          }}
        />
        <span
          className="relative grid place-items-center w-12 h-12 rounded-full border border-[#CBBD93]/40 text-[#80775C] transition-all duration-500 group-hover:bg-[#574A24] group-hover:text-[#FAE8B4] group-hover:border-transparent"
          aria-hidden="true"
        >
          <Icon size={20} />
        </span>
        <div className="relative">
          <h3 className="font-display text-2xl font-extrabold text-[#574A24] m-0 mb-2 tracking-tight">
            {service.title}
          </h3>
          <p className="text-sm sm:text-base text-[#80775C] m-0 max-w-xs leading-relaxed">
            {service.text}
          </p>
        </div>
      </div>
    </li>
  );
};

/* ---------- Page 1: who we are (type-led, no imagery) ---------- */
const PageOne = ({ title, lead, label, services }) => {
  const reduce = useReducedMotion();
  const leadRef = useRef(null);
  const words = lead ? lead.split(' ') : [];

  const { scrollYProgress: leadProgress } = useScroll({
    target: leadRef,
    offset: ['start 85%', 'end 50%']
  });

  return (
    <section className="bg-[#FEFFFF] relative overflow-hidden" aria-labelledby="about-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-[38rem] h-[38rem] rounded-full blur-3xl opacity-25"
        style={{ background: 'radial-gradient(circle, #CBBD93, transparent 65%)' }}
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-24 sm:pt-32 pb-20 sm:pb-28">
        <motion.p
          className="text-sm font-semibold mb-6 mt-0"
          style={{ color: TERRA }}
          initial={reduce ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          {label}
        </motion.p>

        <MaskedTitle
          as="h1"
          id="about-title"
          text={title}
          onScroll={false}
          delay={0.15}
          className="m-0 max-w-[16ch] sm:max-w-[19ch] lg:max-w-[21ch] font-display font-black text-[#574A24] tracking-[-0.035em] leading-[0.95] text-[clamp(2.7rem,8.6vw,8rem)]"
        />

        {/* Lead: offset to the right column for an asymmetric, editorial feel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 mt-14 sm:mt-24">
          <p
            ref={leadRef}
            className="lg:col-start-6 lg:col-span-7 m-0 font-display font-bold text-[#574A24] leading-snug text-[clamp(1.4rem,2.6vw,2.2rem)]"
          >
            <span className="sr-only">{lead}</span>
            <span aria-hidden="true">
              {words.map((w, i) => {
                const start = i / words.length;
                const end = (i + 1) / words.length;
                return reduce ? (
                  <span key={i} className="inline-block mr-[0.28em] text-[#574A24]">
                    {w}
                  </span>
                ) : (
                  <LeadWord key={i} word={w} progress={leadProgress} range={[start, end]} />
                );
              })}
            </span>
          </p>
        </div>

        <ul
          aria-label="What we do"
          className="m-0 p-0 mt-20 sm:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ---------- Page 2: how we work + who leads ---------- */
const PageTwo = ({ title, lead, steps, leaders }) => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#FAF8F9] border-t border-[#574A24]/10 relative overflow-hidden" aria-labelledby="process-title">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
        {/* Left Column: Heading, Lead & Leadership List */}
        <div className="lg:col-span-5">
          <MaskedTitle
            id="process-title"
            text={title}
            className="m-0 mb-5 font-display font-black text-[#574A24] tracking-[-0.025em] leading-[1.02] text-[clamp(2.2rem,5vw,4rem)]"
          />
          <p className="lead m-0 mb-10 max-w-md text-[#80775C] text-base sm:text-lg leading-relaxed">
            {lead}
          </p>

          <ul className="m-0 p-0 list-none flex flex-col gap-4" aria-label="Leadership">
            {leaders.map((p) => (
              <motion.li
                key={p.name}
                className="flex items-center gap-4 w-fit"
                whileHover={reduce ? undefined : { x: 8 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <motion.span
                  aria-hidden="true"
                  className="w-12 h-12 shrink-0 rounded-full bg-[#574A24] text-[#FAE8B4] grid place-items-center font-display font-black text-sm shadow-md"
                  whileHover={reduce ? undefined : { scale: 1.1, rotate: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  {p.initials}
                </motion.span>
                <span>
                  <span className="block font-display font-extrabold text-[#574A24] text-base">{p.name}</span>
                  <span className="block text-xs sm:text-sm text-[#80775C] font-medium">{p.role}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Steps: a real sequence, so numbered; one open at a time */}
        <ol className="lg:col-span-7 m-0 p-0 list-none border-b border-[#CBBD93]/30 relative">
          <span aria-hidden="true" className="absolute right-0 top-0 h-full w-px bg-[#CBBD93]/30 hidden sm:block">
            <span className="block w-full h-full origin-top" style={{ background: TERRA }} />
          </span>

          {steps.map((s, i) => {
            const on = open === i;
            return (
              <li key={s.title} className="border-t border-[#CBBD93]/30 sm:pr-8">
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`step-panel-${i}`}
                  id={`step-btn-${i}`}
                  onClick={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  className={`w-full flex items-center gap-5 sm:gap-8 py-7 sm:py-10 bg-transparent border-0 text-left cursor-pointer transition-colors ${FOCUS}`}
                >
                  <span
                    className="font-display font-black text-4xl sm:text-5xl leading-none transition-all duration-300"
                    style={{
                      color: on ? TERRA : 'transparent',
                      WebkitTextStroke: on ? '0' : `1.5px ${TERRA}`
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display font-black tracking-tight transition-all duration-300 text-[clamp(2rem,5vw,4rem)] ${on ? 'text-[#574A24] translate-x-2' : 'text-[#574A24]/40'
                      }`}
                  >
                    {s.title}
                  </span>
                </button>
                <motion.div
                  id={`step-panel-${i}`}
                  role="region"
                  aria-labelledby={`step-btn-${i}`}
                  initial={false}
                  animate={{ height: on ? 'auto' : 0, opacity: on ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="text-[#5A5560] text-base sm:text-lg leading-relaxed max-w-lg m-0 pb-9 pl-[4.5rem] sm:pl-[6.5rem]">
                    {s.text}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

/* ---------- The page ---------- */
const AboutPage = ({
  label = 'About S4Consultancy',
  title = 'Hospitality planned entirely on your side of the table',
  lead = 'We plan weddings, compare banquet halls, secure luxury stays and advise hotel owners, with no venue or hotel paying us to steer you.',
  services = defaultServices,
  processTitle = 'How we work, and who leads it',
  processLead = 'Four steps, one team, and senior partners involved in every engagement.',
  steps = defaultSteps,
  leaders = defaultLeaders
}) => {
  /* Structured data for search engines */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: title,
    description: lead,
    about: { '@type': 'Organization', name: 'S4Consultancy' }
  };

  return (
    <main className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageOne title={title} lead={lead} label={label} services={services} />
      <PageTwo title={processTitle} lead={processLead} steps={steps} leaders={leaders} />
    </main>
  );
};

export { AboutPage, AboutPage as AboutSection };
export default AboutPage;