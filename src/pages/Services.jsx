import React from 'react';
import CTASection from '../components/CTASection';
import {
  ServicesHeroSection,
  ServicesGridSection,
  ServicesLifecycleSection
} from '../components/services';

const Services = () => {
  return (
    <div className="services-page bg-[#FEFFFF] text-plum min-h-screen">
      {/* 1. Services Hero Banner & Interactive Showcase Slider */}
      <ServicesHeroSection />

      {/* 2. Full 8-Service Directory with Visual Feature Cards */}
      <ServicesGridSection />

      {/* 3. 4-Stage Coordination Lifecycle Framework */}
      <ServicesLifecycleSection />

      {/* 4. Bottom Call To Action */}
      <CTASection
        badge="Ready to Coordinate?"
        title="Connect With S4Consultancy For Your Next Event or Stay"
        description="Whether you are planning a dream destination wedding, booking corporate room blocks, evaluating banquet venues, or seeking management advisory, our senior partners are prepared to assist."
        primaryBtnText="Book Consultation"
        primaryBtnLink="/contact"
        secondaryBtnText="Explore Our Portfolio"
        secondaryBtnLink="/projects"
      />
    </div>
  );
};

export default Services;
