import React from 'react';
import { MapPin, Phone, Mail, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const serviceHighlights = [
  'Wedding Planning & Decor Styling',
  'Banquet Booking & Venue Comparison',
  'Luxury Resort & Hotel Stay Curation',
  'Corporate Conferences & Summits',
  'Destination Weddings & Cross-Border Logistics',
  'Hospitality Management Consultancy',
  'Coordinated Group Bookings & Room Blocks'
];

const ContactInfoSection = () => {
  return (
    <div id="contact-info">
      <SectionHeading
        badge="Direct Touchpoints"
        title="S4Consultancy Advisory"
        lead="We assist private families, corporate event managers, and hotel property owners with hands-on dedication."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="card-luxury" style={{ padding: '1.6rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.8rem' }}>
            Central Inquiries & Coordination
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.6rem' }}>
            <MapPin size={17} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
            <span>Serving Premier Destinations Across India, Asia-Pacific & Globally</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.6rem' }}>
            <Phone size={17} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <span>+91 (0) 98765 43210</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <Mail size={17} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <span>inquiry@s4consultancy.com</span>
          </div>
        </div>

        {/* Scope Coverage Card */}
        <div className="card-luxury" style={{ padding: '1.6rem' }}>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={16} color="var(--color-primary)" />
            <span>What We Deliver</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {serviceHighlights.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-body)' }}>
                <CheckCircle2 size={14} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advisory Assurance */}
      <div style={{ backgroundColor: 'var(--color-plum)', border: '1px solid rgba(58, 175, 169, 0.35)', borderRadius: 'var(--radius-md)', padding: '1.5rem', color: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem', color: '#ffffff', fontWeight: 700, fontSize: '0.95rem' }}>
          <ShieldCheck size={18} color="var(--color-primary)" />
          <span>Transparent & Dedicated Service</span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0, lineHeight: 1.6 }}>
          S4Consultancy acts exclusively in your best interest. Whether negotiating banquet plate costs, vetting resort contracts, or choreographing destination logistics, our loyalty is 100% with our clients.
        </p>
      </div>
    </div>
  );
};

export default ContactInfoSection;
