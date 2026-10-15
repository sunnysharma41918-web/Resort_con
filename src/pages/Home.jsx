import React from 'react';
import CTASection from '../components/CTASection';
import {
  HeroBanner,
  DistinctionSection,
  FeaturedServicesSection,
  StrategicPillarsSection,
  FeaturedProjectsSection,
  TestimonialSection
} from '../components/home';
import headVideo from '../assets/HEAD.mp4';

const Home = () => {
  return (
    <div className="home-page">
      {/* 1. S4Consultancy Luxury Hero Section */}
      <HeroBanner
        video={headVideo}
        backgroundVideo={headVideo}
        badge="Hospitality & Event Management Consultancy"
        headline={['Where Hospitality', 'Meets Excellence.']}
        lead="S4Consultancy is your trusted partner for hospitality, events, accommodation, and management consultancy. We deliver personalized wedding planning, banquet bookings, curated resort stays, corporate summits, and operational advisory."
        primaryAction={{ text: 'Explore Our Services', to: '/services' }}
        secondaryAction={{ text: 'Contact Us', to: '/contact' }}
        showStats={false}
      />

      {/* 2. Our Solutions / S4Consultancy Standard */}
      <DistinctionSection />

      {/* 3. Core 8 Services Grid */}
      <FeaturedServicesSection />

      {/* 4. Strategic Pillars Execution Framework */}
      <StrategicPillarsSection />

      {/* 5. Our Portfolio / Projects */}
      <FeaturedProjectsSection />

      {/* 6. Client Endorsements */}
      <TestimonialSection />

      {/* 7. Call To Action Banner */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 bg-gradient-to-b from-white via-[#F4F0F2]/60 to-[#46344E]">
        <CTASection
          badge="Plan Your Event or Stay"
          title="Experience Hospitality Excellence with S4Consultancy"
          description="Whether curating a bespoke wedding celebration, booking luxury hotel stays, securing premier banquet venues, or seeking management advisory, our dedicated consultants are ready to assist."
          primaryBtnText="Contact Us"
          primaryBtnLink="/contact"
          secondaryBtnText="Explore All 8 Services"
          secondaryBtnLink="/services"
        />
      </div>
    </div>
  );
};

export default Home;
