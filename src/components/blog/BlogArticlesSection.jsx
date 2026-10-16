import React, { useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Calendar, ArrowUpRight, BookOpen } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { blogData } from '../../data/blogData';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Blog articles, v3: "index + pinned report"                         */
/*  Desktop: a sticky dark whitepaper panel on the left, an editorial  */
/*  list of ruled article rows on the right. Mobile: stacked.          */
/*  Same blogData fields, SectionHeading props, theme variables and    */
/*  the whitepaper request behaviour as before. GSAP: row reveals and  */
/*  glow parallax. Motion-safe.                                        */
/* ------------------------------------------------------------------ */

const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]';
const BORDER = 'border-[var(--color-ivory-border,#e7e1d8)]';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CBBD93]';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

const BlogArticlesSection = () => {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.bl-item').forEach((el) => {
        gsap.from(el, {
          y: 36,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        });
      });
      gsap.to('.bl-glow', {
        yPercent: 60,
        ease: 'none',
        scrollTrigger: { trigger: '.bl-layout', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    blogPost: blogData.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      articleSection: a.category,
      author: { '@type': 'Person', name: a.author }
    }))
  };

  return (
    <section
      ref={rootRef}
      className="section-lg"
      id="articles-grid"
      style={{ backgroundColor: 'var(--color-ivory)', overflow: 'visible' }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container" style={{ overflow: 'visible' }}>
        <SectionHeading
          align="center"
          badge="Thought Leadership"
          title="Latest Research & Executive Dispatches"
          lead="Read our analysis on macroeconomic trends, eco-tourism demand shifts, and master planning innovations."
        />

        <div className="bl-layout mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
          {/* Left: whitepaper callout, pinned while the list scrolls */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="bl-item bl-paper relative isolate flex flex-col overflow-hidden p-7 text-[#FAE8B4] sm:p-10 lg:min-h-[30rem]"
              style={{ backgroundColor: 'var(--color-plum, #1F1A0E)', borderRadius: 'var(--radius-lg, 1.5rem)', border: '1px solid rgba(203, 189, 147, 0.25)' }}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="bl-glow absolute -right-24 -top-28 h-[26rem] w-[26rem] rounded-full bg-[var(--color-warm-sand,#CBBD93)] opacity-25 blur-[120px]" />
                <div className="absolute inset-0 opacity-[0.08] mix-blend-screen" style={{ backgroundImage: GRAIN }} />
              </div>

              <span className="badge-pill mb-4 inline-block self-start bg-[#FAE8B4] text-[#574A24] font-bold border border-[#CBBD93]">Annual Benchmark Report 2026</span>
              <h3 className="m-0 mb-4 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-black leading-[1.08] tracking-[-0.035em] text-[#FAE8B4]">
                The 2026 Global Eco-Resort & Biophilic Hospitality Benchmark
              </h3>
              <p className="m-0 mb-8 text-[14.5px] leading-relaxed text-[#FAE8B4]/85">
                A 64-page quantitative survey covering 120+ luxury eco-resorts worldwide, analyzing average Capex per key, ADR premiums for vernacular designs, and debt financing structures.
              </p>

              <a
                href="#request-report"
                onClick={(e) => {
                  e.preventDefault();
                  alert('The 2026 Global Benchmark Report will be delivered to your inbox upon consultation request.');
                }}
                className={`group mt-auto inline-flex items-center gap-3 self-start rounded-full bg-[#FAE8B4] py-2 pl-6 pr-2 text-[13px] font-bold text-[#574A24] no-underline transition hover:bg-[#CBBD93] ${FOCUS}`}
              >
                <span>Request Executive Copy</span>
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-[#574A24] text-[#FAE8B4] transition duration-500 ${EASE} group-hover:rotate-12 group-hover:scale-110`}
                >
                  <BookOpen size={16} />
                </span>
              </a>
            </div>
          </div>

          {/* Right: editorial index */}
          <div className={`border-b ${BORDER}`}>
            {blogData.map((article) => (
              <article
                key={article.id}
                className={`bl-item group relative border-t ${BORDER} px-2 py-7 transition-colors duration-500 hover:bg-white sm:px-5`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-[var(--color-primary,#574A24)] transition-transform duration-500 ${EASE} group-hover:scale-y-100`}
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="badge-pill bg-[#FAE8B4]/60 text-[#574A24] border border-[#CBBD93]/50 font-semibold">{article.category}</span>
                  <span className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-light,#80775C)]">
                    <Clock size={13} aria-hidden="true" />
                    {article.readTime}
                  </span>
                </div>

                <h3
                  className={`m-0 mt-4 font-display text-[clamp(1.2rem,2vw,1.65rem)] font-black leading-[1.15] tracking-[-0.03em] text-[var(--color-primary-dark,#574A24)] transition-transform duration-500 ${EASE} group-hover:translate-x-1.5`}
                >
                  {article.title}
                </h3>

                <p className="m-0 mt-3 max-w-[36rem] text-[14px] leading-relaxed text-[var(--color-text-muted,#80775C)]">
                  {article.excerpt}
                </p>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="text-[12px] text-[var(--color-text-muted,#80775C)]">
                    <div className="font-semibold text-[var(--color-primary-dark,#574A24)]">{article.author}</div>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <Calendar size={11} aria-hidden="true" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  <span className="flex items-center gap-2.5 text-[13px] font-bold text-[var(--color-primary-dark,#574A24)]">
                    Read Brief
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-current transition duration-500 ${EASE} group-hover:rotate-45 group-hover:border-transparent group-hover:bg-[#CBBD93] group-hover:text-[#574A24]`}
                    >
                      <ArrowUpRight size={14} />
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogArticlesSection;