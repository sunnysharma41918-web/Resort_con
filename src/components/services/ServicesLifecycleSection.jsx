import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const engagementStages = [
  {
    stage: 'Stage 01',
    badge: 'Discovery & Scope',
    title: 'Consultation & Requirement Mapping',
    description: 'We listen to your event vision, dates, guest counts, and travel expectations to structure a cohesive delivery roadmap.',
    timeline: 'Initial 48h Turnaround',
    points: [
      'Personalized guest profile & requirements brief',
      'Preliminary budget structure & venue guidelines',
      'Date feasibility & seasonal availability review',
      'Dedicated lead consultant assignment'
    ]
  },
  {
    stage: 'Stage 02',
    badge: 'Venue & Partner Sourcing',
    highlight: true,
    title: 'Venue Selection & Contract Protection',
    description: 'We scout vetted resorts, banquets, or hotels, conduct comparative analyses, and negotiate optimal contract terms.',
    timeline: '1 to 3 Weeks Timeline',
    points: [
      'Comparative rate and inclusions matrix',
      'Contract clause review & deposit protection',
      'Site inspection reports & spatial feasibility maps',
      'Direct liaison with General Managers and chefs'
    ]
  },
  {
    stage: 'Stage 03',
    badge: 'Design & Logistics',
    title: 'Vendor Alignment & Choreography',
    description: 'From decor styling, sound and catering to rooming lists and airport charter logistics, every detail is engineered.',
    timeline: 'Continuous Milestones',
    points: [
      'Bespoke decor, stage design & floral moodboards',
      'Menu curation, tasting sessions & dietary alignment',
      'Room block management & attendee RSVP systems',
      'Master minute-by-minute run-sheet formulation'
    ]
  },
  {
    stage: 'Stage 04',
    badge: 'On-Site Delivery',
    title: 'Seamless On-Site Execution & Care',
    description: 'Our senior directors and hospitality desks are on the ground ensuring punctual schedules and unforgettable guest experiences.',
    timeline: 'Event Day & Post-Event Wrap',
    points: [
      'Dedicated on-site hospitality and check-in desks',
      'Vendor timeline enforcement & stage management',
      'VIP guest handling & emergency response readiness',
      'Transparent final billing reconciliation & debrief'
    ]
  }
];

const ServicesLifecycleSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white border-t border-taupe/15">
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="inline-flex items-center px-3.5 py-1.5 bg-[#FAE8B4] text-[#574A24] text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase rounded-full border border-[#CBBD93] shadow-sm mb-3">
            Delivery Framework
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold sm:font-black text-[#574A24] tracking-tight leading-[1.08]">
            The S4Consultancy Coordination Lifecycle
          </h2>
          <p className="text-xs sm:text-sm lg:text-[15px] text-[#80775C] tracking-wide font-sans mt-2 leading-relaxed">
            From the initial creative briefing to the final celebration or operational debrief, our disciplined coordination milestones ensure complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {engagementStages.map((stage, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                stage.highlight
                  ? 'bg-[#574A24] text-[#FAE8B4] border-[#574A24] shadow-xl'
                  : 'bg-[#FAF6EC] text-[#574A24] border-[#CBBD93]/35 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-sans font-bold uppercase tracking-wider ${stage.highlight ? 'text-[#FAE8B4]' : 'text-[#80775C]'}`}>
                    {stage.stage}
                  </span>
                  <span
                    className={`text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      stage.highlight
                        ? 'bg-[#FAE8B4] text-[#574A24]'
                        : 'bg-white border border-[#CBBD93]/40 text-[#574A24]'
                    }`}
                  >
                    {stage.badge}
                  </span>
                </div>

                <h3 className={`font-display text-lg sm:text-[21px] font-bold mb-2 leading-snug ${stage.highlight ? 'text-[#FAE8B4]' : 'text-[#574A24]'}`}>
                  {stage.title}
                </h3>

                <p className={`text-xs sm:text-[13px] leading-relaxed font-sans mb-5 ${stage.highlight ? 'text-[#FAE8B4]/80' : 'text-[#80775C]'}`}>
                  {stage.description}
                </p>

                <div className="space-y-2 mb-6">
                  {stage.points.map((pt, i) => (
                    <div key={i} className={`flex items-start gap-2 text-xs font-sans ${stage.highlight ? 'text-[#FAE8B4]/90' : 'text-[#574A24]'}`}>
                      <CheckCircle2 size={13} className={`shrink-0 mt-0.5 ${stage.highlight ? 'text-[#CBBD93]' : 'text-[#80775C]'}`} />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`pt-4 border-t flex items-center justify-between font-sans ${stage.highlight ? 'border-[#CBBD93]/20' : 'border-[#CBBD93]/25'}`}>
                <span className={`text-[11px] font-semibold ${stage.highlight ? 'text-[#FAE8B4]/70' : 'text-[#80775C]'}`}>
                  Timeline
                </span>
                <span className={`text-xs font-bold ${stage.highlight ? 'text-[#FAE8B4]' : 'text-[#574A24]'}`}>
                  {stage.timeline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesLifecycleSection;
