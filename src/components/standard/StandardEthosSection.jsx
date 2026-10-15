import React from 'react';
import { Compass, HeartHandshake } from 'lucide-react';
import solutionsImg from '../../assets/OURSOLUTIONS.jpg';

const StandardEthosSection = ({ image = solutionsImg }) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Big Philosophy Quote */}
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-coral text-white text-[11px] sm:text-xs font-champ font-bold tracking-[0.22em] uppercase rounded-none shadow-sm mb-4">
            <Compass size={13} className="text-white" />
            <span>Our Foundational Philosophy</span>
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-display font-extrabold sm:font-black text-plum tracking-tight leading-[1.08] mb-6">
            Hospitality is not merely a service—it is an exact discipline of precision, integrity, and heartfelt care.
          </h1>

          <p className="font-sans text-sm sm:text-base text-taupe-dark leading-relaxed mb-6">
            When families plan milestone weddings or corporate boards convene international summits, they place their reputation and trust in their advisors. S4Consultancy was founded to eliminate the opacity, unvetted vendors, and operational chaos that frequently plague the hospitality and event sector.
          </p>

          <p className="font-sans text-sm sm:text-base text-taupe-dark leading-relaxed mb-8">
            Every property we recommend, contract we negotiate, and timeline we choreograph is evaluated against our strict internal benchmarks. We believe that true luxury is defined not by excess, but by seamless execution, honest stewardship, and the peace of mind that comes from knowing every detail is protected.
          </p>

          {/* 3 Value Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-taupe/20">
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
              <div className="text-2xl font-champ font-extrabold text-coral mb-1">100%</div>
              <div className="text-xs font-bold font-plum font-sans">Fiduciary Alignment</div>
              <p className="text-[11px] text-taupe-dark mt-1">Zero hidden commissions.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
              <div className="text-2xl font-champ font-extrabold text-coral mb-1">48-Pt</div>
              <div className="text-xs font-bold font-plum font-sans">Property Vetting</div>
              <p className="text-[11px] text-taupe-dark mt-1">Audited before recommendations.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
              <div className="text-2xl font-champ font-extrabold text-coral mb-1">Zero</div>
              <div className="text-xs font-bold font-plum font-sans">Timeline Variance</div>
              <p className="text-[11px] text-taupe-dark mt-1">Immaculate day-of protocol.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Frame */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200/90 aspect-[4/5] bg-stone-100">
            <img
              src={image}
              alt="S4Consultancy Hospitality Standard"
              className="w-full h-full object-cover object-center filter brightness-[0.97]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-xl text-plum">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-rader font-bold text-coral uppercase tracking-wider">
                <HeartHandshake size={15} />
                <span>The S4 Seal of Trust</span>
              </div>
              <p className="font-sans text-xs text-stone-700 leading-snug">
                "We commit our senior directors to be present on-site from the first rehearsal to the final departure."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandardEthosSection;
