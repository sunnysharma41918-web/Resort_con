import React from 'react';
import SectionHeading from '../SectionHeading';

const defaultLeadership = [
  {
    name: 'S. Sharma',
    title: 'Managing Principal & Founder',
    background: 'Two decades orchestrating royal weddings, multi-day destination celebrations, and luxury resort takeovers across premier global destinations.',
    specialty: 'Wedding Planning & Destination Celebrations'
  },
  {
    name: 'A. Singhania',
    title: 'Partner, Venue Advisory & Group Stays',
    background: 'Former regional director for premier hotel ballrooms; specializes in banquet negotiations, group room blocks, and corporate conference production.',
    specialty: 'Banquet Booking & Group Stays'
  },
  {
    name: 'R. Kulkarni',
    title: 'Director of Hospitality Operations',
    background: 'Senior hotelier advising resort owners and developers on pre-opening countdowns, staff service culture, F&B choreography, and GOPPAR optimization.',
    specialty: 'Hospitality Management Consultancy'
  }
];

const LeadershipSection = ({
  badge = 'Our Advisory Leadership',
  title = 'Senior Hospitality Partners Guiding Your Journey',
  lead = 'Every S4Consultancy engagement is led directly by experienced hospitality specialists with hands-on dedication.',
  leaders = defaultLeadership
}) => {
  return (
    <section className="section-lg bg-cream-100">
      <div className="container">
        <SectionHeading
          align="center"
          badge={badge}
          title={title}
          lead={lead}
        />

        <div className="grid grid-3 mt-12">
          {leaders.map((partner, idx) => (
            <div key={idx} className="card-luxury">
              <span className="badge-pill badge-pill-green mb-4 inline-block font-sans">
                {partner.specialty}
              </span>
              <h3 className="text-2xl font-bold mb-1 text-plum font-display">{partner.name}</h3>
              <div className="text-xs text-coral uppercase tracking-wider font-semibold mb-4 font-sans">
                {partner.title}
              </div>
              <p className="text-sm text-muted leading-relaxed m-0 font-sans">
                {partner.background}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
