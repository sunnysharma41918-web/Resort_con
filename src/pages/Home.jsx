import React from 'react';
import {
  HeroBanner,
  DistinctionSection,
  StrategicPillarsSection,
  TestimonialSection,
  HomeContactSection
} from '../components/home';
import headVideo from '../assets/HEAD.mp4';

const Home = () => {
  return (
    <div className="home-page w-full overflow-hidden bg-white">
      {/* 1. S4Consultancy Luxury Hero Section */}
      <section id="hero" className="w-full relative bg-white">
        <HeroBanner
          video={headVideo}
          backgroundVideo={headVideo}
          badge="Hospitality & Event Management Consultancy"
          headline={['Where Hospitality', 'Meets Excellence.']}
          lead="S4Consultancy is your trusted partner for hospitality, events, accommodation, and management consultancy. We deliver personalized wedding planning, banquet bookings, curated resort stays, corporate summits, and operational advisory."
          primaryAction={{ text: 'Explore Our Services', to: '#services' }}
          secondaryAction={{ text: 'Contact Us', to: '/contact' }}
          showStats={false}
        />
      </section>

      {/* 2. Our Solutions / S4Consultancy Standard */}
      <section id="standard" className="w-full relative bg-white">
        <DistinctionSection />
      </section>

      {/* 3. Strategic Pillars Execution Framework / Services */}
      <section id="services" className="w-full relative bg-white">
        <div id="framework" className="w-full bg-white">
          <StrategicPillarsSection />
        </div>
      </section>

      {/* 6. Client Endorsements / Testimonials */}
      <section id="testimonials" className="w-full relative bg-white">
        <TestimonialSection />
      </section>

      {/* 7. Direct Touchpoints + Service Inquiry Contact Section */}
      <section id="contact-section" className="w-full relative bg-white">
        <HomeContactSection />
      </section>
    </div>
  );
};

export default Home;
