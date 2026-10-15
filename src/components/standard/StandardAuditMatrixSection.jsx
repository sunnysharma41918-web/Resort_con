import React from 'react';
import {
  FileText,
  Sparkles,
  Compass,
  Award,
  CheckCircle2
} from 'lucide-react';

const auditCategories = [
  {
    icon: FileText,
    title: 'Banquet & Venue Rigor',
    items: [
      'Pillarless sightlines and ceiling clearance checks',
      'HVAC capacity at 100% guest density',
      'Food license hygiene & commercial kitchen audits',
      'Dedicated green rooms & VIP holding chambers',
      'Valet turnaround capacity & egress safety routes'
    ]
  },
  {
    icon: Sparkles,
    title: 'Weddings & Celebrations',
    items: [
      'Floral freshness climate-controlled staging',
      'Fire-safe pyrotechnics & local sound permissions',
      'Dedicated bridal lounge & security lockers',
      'Uninterrupted sound, AV & dual generator backup',
      'Minute-by-minute protocol execution run-sheets'
    ]
  },
  {
    icon: Compass,
    title: 'Resorts & Stays',
    items: [
      'Property buyout privacy & guest security protocols',
      'Linen, bedding & bathroom five-star standards',
      'Luggage distribution & swift check-in batching',
      'Specialised culinary menus (Jain, Vegan, Allergen-free)',
      '24-hour on-call medical & concierge liaison'
    ]
  },
  {
    icon: Award,
    title: 'Advisory & Asset Rigor',
    items: [
      'Pre-opening readiness 90-day checklist',
      'Departmental Standard Operating Procedures (SOPs)',
      'Service etiquette & staff grooming benchmarks',
      'Food waste reduction & kitchen yield engineering',
      'Guest feedback NPS & digital reputation audits'
    ]
  }
];

const StandardAuditMatrixSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
        <span className="inline-flex items-center px-3.5 py-1.5 bg-coral text-white text-[11px] sm:text-xs font-champ font-bold tracking-[0.22em] uppercase rounded-none shadow-sm mb-3">
          Inspection Protocol
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-plum tracking-tight leading-[1.08] mb-3">
          The 48-Point Quality Matrix
        </h2>
        <p className="text-xs sm:text-sm lg:text-[15px] text-taupe-dark font-sans tracking-wide max-w-xl mx-auto leading-relaxed">
          Every banquet hall, palace venue, resort, and vendor is thoroughly assessed across four comprehensive operational categories before we issue our endorsement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
        {auditCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-coral/10 text-coral flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>

                <h3 className="font-display text-lg font-bold text-plum mb-4 pb-2 border-b border-stone-100">
                  {cat.title}
                </h3>

                <ul className="space-y-3">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700 font-sans leading-relaxed">
                      <CheckCircle2 size={13} className="text-coral shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] font-champ font-bold text-coral uppercase tracking-wider">
                Audited & Verified
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StandardAuditMatrixSection;
