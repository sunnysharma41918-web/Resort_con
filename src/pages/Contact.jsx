import React from 'react';
import { useLocation } from 'react-router-dom';

import SectionHeading from '../components/SectionHeading';
import { ContactForm, ContactInfoSection } from '../components/contact';

const Contact = () => {
  const location = useLocation();
  const serviceInterest = location.state?.serviceInterest || '';

  return (
    <div className="contact-page pt-20 sm:pt-24 lg:pt-28">
      <section className="section-lg" style={{ backgroundColor: 'var(--color-bg-page)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
            {/* Left: Contact Form UI */}
            <div id="inquiry-form">
              <SectionHeading
                badge="Service Inquiry"
                title="Schedule Your Consultation"
                lead="Select from our eight core hospitality services below. We will assign a dedicated specialist to tailor options for your specific dates, guest count, and vision."
              />
              <ContactForm initialService={serviceInterest} />
            </div>

            {/* Right: Direct Touchpoints & Advisory Standards */}
            <ContactInfoSection />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
