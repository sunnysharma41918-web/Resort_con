import React from 'react';
import { Link } from 'react-router-dom';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { projectsData } from '../../data/projectsData';

const EASE = [0.16, 1, 0.3, 1];

/* large lead project */
const Featured = ({ project }) => (
  <Link
    to={`/projects/${project.id}`}
    className="group flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-[#FAED26] focus-visible:ring-offset-4"
  >
    <div className="relative h-[380px] overflow-hidden rounded-[28px] bg-[#F4F0F2] sm:h-[480px] lg:h-[540px] lg:rounded-[36px]">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
      />
      <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3.5 py-1.5 font-sans text-xs font-bold text-[#46344E]">
        {project.category}
      </span>
      {project.status && (
        <span className="absolute right-5 top-5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 font-sans text-xs font-medium text-white backdrop-blur-md">
          {project.status}
        </span>
      )}
    </div>

    <div className="mt-6 flex items-end justify-between gap-6">
      <div className="min-w-0">
        <p className="mb-2 flex items-center gap-1.5 font-sans text-sm text-[#5A5560]">
          <MapPin size={14} />
          {project.location}, {project.year}
        </p>
        <h3 className="mb-3 font-display text-[clamp(1.7rem,3vw,2.8rem)] font-black leading-[1.03] tracking-[-0.03em] text-[#46344E]">
          {project.title}
        </h3>
        <p className="line-clamp-2 max-w-lg font-sans text-sm leading-relaxed text-[#5A5560]">
          {project.tagline}
        </p>
      </div>
      <span
        aria-label="View project"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#46344E] text-white transition-colors duration-300 group-hover:bg-[#FAED26] group-hover:text-[#46344E]"
      >
        <ArrowUpRight size={22} className="transition-transform duration-300 group-hover:rotate-45" />
      </span>
    </div>
  </Link>
);

/* compact project beside the featured one */
const Compact = ({ project }) => (
  <Link
    to={`/projects/${project.id}`}
    className="group flex h-full gap-4 rounded-[28px] border border-[#46344E]/10 p-3 outline-none transition-colors duration-500 hover:border-transparent hover:bg-[#F4F0F2] focus-visible:ring-2 focus-visible:ring-[#FAED26] sm:gap-5"
  >
    <div className="relative w-[42%] shrink-0 overflow-hidden rounded-[20px] bg-[#F4F0F2]">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
      />
    </div>

    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 py-2 pr-2">
      <div>
        <p className="mb-2 font-sans text-xs font-medium text-[#2B7A78]">
          {project.category}
          {project.status ? `, ${project.status}` : ''}
        </p>
        <h3 className="mb-2 font-display text-xl font-black leading-[1.08] tracking-tight text-[#46344E] sm:text-2xl">
          {project.title}
        </h3>
        <p className="flex items-center gap-1.5 font-sans text-xs text-[#5A5560]">
          <MapPin size={12} />
          {project.location}, {project.year}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#46344E]/10 pt-3">
        <span className="min-w-0 truncate font-sans text-sm font-semibold text-[#46344E]">{project.metrics}</span>
        <ArrowUpRight
          size={20}
          className="shrink-0 text-[#46344E]/40 transition-all duration-300 group-hover:rotate-45 group-hover:text-[#FAED26]"
        />
      </div>
    </div>
  </Link>
);

const FeaturedProjectsSection = ({
  badge = 'Our Portfolio',
  title = 'Signature Hospitality & Event Engagements',
  lead = 'Explore our portfolio of curated destination weddings, premier resort buyouts, executive corporate summits, and operational advisories delivered by S4Consultancy.',
  projects = projectsData.slice(0, 3),
  ctaText = 'View All Projects',
  ctaLink = '/projects',
}) => {
  const [first, ...rest] = projects;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative w-full overflow-hidden bg-white px-4 pt-8 pb-10 text-[#46344E] sm:px-8 lg:px-14 lg:pt-10 lg:pb-12 border-b border-[#46344E]/10">
        <div className="mx-auto w-full max-w-[1360px]">
          {/* header */}
          <header className="mb-8 grid gap-6 lg:mb-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#46344E]/15 py-1.5 pl-3 pr-4 font-sans text-sm font-medium text-[#5A5560]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FAED26] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FAED26]" />
                </span>
                {badge}
              </p>
              <h2 className="font-display text-[clamp(2.4rem,5.6vw,5.2rem)] font-black leading-[0.98] tracking-[-0.045em] text-[#46344E]">
                {title.split(' ').map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '115%' }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.07, ease: EASE }}
                    >
                      {w}&nbsp;
                    </motion.span>
                  </span>
                ))}
              </h2>
            </div>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-[#5A5560] lg:col-span-4 lg:justify-self-end">
              {lead}
            </p>
          </header>

          {/* one lead project + the rest */}
          {first && (
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <Featured project={first} />
              </div>
              {rest.length > 0 && (
                <div className="grid gap-5 lg:col-span-5 lg:auto-rows-fr">
                  {rest.map((p) => (
                    <div key={p.id} className="min-h-[220px]">
                      <Compact project={p} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {ctaText && ctaLink && (
            <div className="mt-8 flex justify-center">
              <Link
                to={ctaLink}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#46344E]/25 py-1.5 pl-6 pr-1.5 font-sans text-sm font-bold text-[#46344E] transition-colors duration-500 hover:text-white"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-[#46344E] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                <span className="relative">{ctaText}</span>
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#FAED26] text-[#46344E]">
                  <ArrowRight size={17} />
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
};

export default FeaturedProjectsSection;