import React from 'react';
import {
  ShieldCheck,
  Clock,
  Building2,
  Users,
  TrendingUp,
  Lock,
  CheckCircle2
} from 'lucide-react';

const tenets = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Fiduciary Client Alignment',
    tagline: 'Zero hidden vendor markups and 100% transparent commercial negotiations.',
    description: 'We act exclusively as our client’s advocate. Unlike traditional brokers, S4Consultancy does not accept hidden vendor kickbacks. Every hotel contract, banquet minimum spend, and decorator estimate is presented with complete transparency.',
    metrics: '100% Transparent Terms',
    points: [
      'Direct-to-property transparent contracting',
      'Protected cancellation & attrition clauses',
      'Unbiased venue comparison reports'
    ]
  },
  {
    number: '02',
    icon: Clock,
    title: 'Minute-by-Minute Operational Rigor',
    tagline: 'Master run-sheets, contingency protocols, and zero timeline variance.',
    description: 'Luxury hospitality leaves no room for improvisation. We map every wedding ceremony, banquet transition, and corporate agenda down to the minute, backed by secondary power, weather, and vendor contingencies.',
    metrics: 'Zero Protocol Variance',
    points: [
      'Master timeline run-sheets for all stakeholders',
      'Live backstage and stage floor directorship',
      'Pre-event technical, acoustic & rehearsal audits'
    ]
  },
  {
    number: '03',
    icon: Building2,
    title: 'Institutional Venue Vetting',
    tagline: 'A comprehensive 48-point physical and commercial inspection of every property.',
    description: 'Before recommending any banquet hall, resort, or heritage palace, our senior hoteliers inspect kitchen sanitation, service elevator capacities, HVAC cooling under full guest loads, and noise decibel ordinances.',
    metrics: '48-Point Property Inspection',
    points: [
      'Pillarless sightline & acoustic testing',
      'Kitchen hygiene & F&B license verification',
      'Redundant power & emergency egress compliance'
    ]
  },
  {
    number: '04',
    icon: Users,
    title: 'Senior Director On-Site Presence',
    tagline: 'Partner-level leadership on the ground, not junior handoffs.',
    description: 'At S4Consultancy, the senior hoteliers and event strategists who plan your project are the very professionals executing it on the day of the event, supervising guest arrivals, hotel room blocks, and VIP protocols.',
    metrics: 'Senior Partner Attendance',
    points: [
      'Dedicated on-site hospitality helpdesks',
      'Direct line to General Managers & Banquet Directors',
      'Immediate crisis resolution & protocol enforcement'
    ]
  },
  {
    number: '05',
    icon: TrendingUp,
    title: 'Commercial Value Maximization',
    tagline: 'Volume bargaining leverage passed directly to private hosts and developers.',
    description: 'Through our sustained advisory engagements across premier hotel groups, we unlock preferred banquet pricing, complimentary suite upgrades, waived corkage, and strictly controlled attrition thresholds.',
    metrics: 'Measurable Cost Savings',
    points: [
      'Preferred room block and banquet tier rates',
      'F&B minimum spend optimizations',
      'Waived audio-visual & royalty surcharge protection'
    ]
  }
];

const StandardTenetsSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F4F0F2] border-y border-[#9D8D8F]/25 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="inline-flex items-center px-3.5 py-1.5 bg-[#FAED26] text-[#46344E] text-[11px] sm:text-xs font-champ font-bold tracking-[0.22em] uppercase rounded-none shadow-sm mb-3">
            The Five Tenets
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-plum tracking-tight leading-[1.08] mb-3">
            How We Protect Your Interests
          </h2>
          <p className="text-xs sm:text-sm lg:text-[15px] text-taupe-dark font-sans tracking-wide max-w-xl mx-auto leading-relaxed">
            Five non-negotiable principles embedded into every wedding, banquet negotiation, hotel stay, and operational audit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {tenets.map((tenet, idx) => {
            const Icon = tenet.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 lg:p-8 border border-stone-200/90 shadow-[0_6px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-coral/10 text-coral font-champ font-bold text-xs uppercase tracking-wider">
                      Tenet {tenet.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-sand/30 text-coral flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-plum mb-2 leading-snug">
                    {tenet.title}
                  </h3>

                  <div className="text-xs font-sans font-semibold text-coral mb-3">
                    {tenet.tagline}
                  </div>

                  <p className="font-sans text-xs sm:text-[13px] text-taupe-dark leading-relaxed mb-5">
                    {tenet.description}
                  </p>

                  {/* Specific Deliverable Points */}
                  <div className="space-y-2 pt-4 border-t border-stone-100">
                    {tenet.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-700 font-sans">
                        <CheckCircle2 size={13} className="text-coral shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric Pill */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] font-rader font-bold text-stone-400 uppercase tracking-wider">
                    Standard
                  </span>
                  <span className="text-xs font-champ font-bold text-coral">
                    {tenet.metrics}
                  </span>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Institutional Code of Conduct */}
          <div className="bg-[#46344E] text-white rounded-3xl p-6 sm:p-7 lg:p-8 border border-[#5A5560]/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#FAED26]/15 text-[#FAED26] font-champ font-bold text-xs uppercase tracking-wider">
                  Governance
                </span>
                <div className="w-10 h-10 rounded-full bg-white/10 text-sand flex items-center justify-center">
                  <Lock size={18} />
                </div>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-2 leading-snug">
                Confidentiality & Discretion
              </h3>

              <div className="text-xs font-sans font-semibold text-sand mb-3">
                Protected NDAs for private families and corporate boards.
              </div>

              <p className="font-sans text-xs sm:text-[13px] text-stone-300 leading-relaxed mb-5">
                We respect the absolute privacy of our high-profile clients, business executives, and celebration hosts. All guest lists, financial negotiations, and bespoke arrangements are strictly protected under formal Non-Disclosure Agreements.
              </p>

              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex items-start gap-2 text-xs text-stone-300 font-sans">
                  <CheckCircle2 size={13} className="text-sand shrink-0 mt-0.5" />
                  <span>Non-disclosure agreements on all projects</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-stone-300 font-sans">
                  <CheckCircle2 size={13} className="text-sand shrink-0 mt-0.5" />
                  <span>Strict media and photo embargo protocols</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-rader font-bold text-stone-400 uppercase tracking-wider">
                Assurance
              </span>
              <span className="text-xs font-champ font-bold text-sand">
                100% Discretion
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandardTenetsSection;
