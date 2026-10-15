import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { servicesData } from '../../data/servicesData';

const ServicesGridSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto border-t border-taupe/15">
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
        <span className="inline-flex items-center px-3.5 py-1.5 bg-coral text-white text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase rounded-none shadow-sm mb-2.5">
          Full Practice Portfolio
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-extrabold sm:font-black text-plum tracking-tight leading-[1.08]">
          Our Eight Core Hospitality Services
        </h2>
        <p className="text-xs sm:text-sm lg:text-[15px] text-taupe-dark tracking-wide font-sans mt-2 max-w-2xl mx-auto leading-relaxed">
          Every service is led by dedicated hospitality coordinators and senior advisors to ensure personalized excellence.
        </p>
      </div>

      {/* 8 Distinct Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {servicesData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Card Image */}
            <div className="relative h-48 w-full overflow-hidden bg-stone-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center filter brightness-[0.96]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md text-plum text-[10px] font-bold font-sans tracking-wider uppercase rounded-full shadow-sm">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold text-coral uppercase tracking-wider block">
                  {item.stats}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-display text-lg sm:text-[20px] font-bold text-plum mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-taupe-dark leading-relaxed font-sans mb-4">
                  {item.tagline}
                </p>

                {/* Bullet points */}
                <div className="space-y-1.5 pt-3 border-t border-stone-100 mb-4">
                  {item.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-600 font-sans">
                      <CheckCircle2 size={13} className="text-coral shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between font-sans">
                <Link
                  to={`/services/${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-coral hover:text-coral-dark transition-colors"
                >
                  <span>View Details</span>
                  <ArrowUpRight size={13} />
                </Link>
                <Link
                  to={`/contact?service=${encodeURIComponent(item.title)}`}
                  className="text-[11px] font-semibold text-stone-500 hover:text-plum transition-colors"
                >
                  Inquire
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesGridSection;
