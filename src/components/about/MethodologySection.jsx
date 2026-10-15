import React from 'react';
import SectionHeading from '../SectionHeading';

const defaultStages = [
  {
    number: '01',
    title: 'Consultation & Discovery',
    description: 'We listen closely to your vision, guest profile, budget parameters, and scheduling preferences to build a comprehensive roadmap.'
  },
  {
    number: '02',
    title: 'Venue & Partner Vetting',
    description: 'Curating handpicked banquet halls, resorts, and hotels with verified reviews, comparative rate matrices, and protected contracts.'
  },
  {
    number: '03',
    title: 'Production & Logistics',
    description: 'From decor styling, culinary tastings, and AV staging to rooming rosters and charter logistics, every touchpoint is choreographed.'
  },
  {
    number: '04',
    title: 'On-Site Hospitality Care',
    description: 'Our senior directors and hospitality desks manage day-of operations, timeline compliance, and guest comfort from start to finish.'
  }
];

const MethodologySection = ({
  badge = 'Our Advisory Framework',
  title = 'The S4Consultancy 4-Stage Methodology',
  lead = 'A disciplined, client-centered delivery framework that eliminates stress and ensures extraordinary hospitality outcomes.',
  stages = defaultStages
}) => {
  return (
    <section className="section-lg section-warm">
      <div className="container">
        <SectionHeading
          align="center"
          badge={badge}
          title={title}
          lead={lead}
        />

        <div className="grid grid-4 mt-12">
          {stages.map((stage, idx) => (
            <div key={idx} className="card-luxury">
              <div className="text-3xl text-coral font-extrabold mb-2 font-champ">{stage.number}</div>
              <h3 className="text-xl font-bold mb-3 text-plum font-display">{stage.title}</h3>
              <p className="text-sm text-muted m-0 font-sans leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
