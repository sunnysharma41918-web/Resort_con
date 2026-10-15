import React from 'react';
import {
  StorySection,
  MethodologySection,
  LeadershipSection
} from '../components/about';

const About = () => {
  return (
    <div className="about-page pt-20 sm:pt-24 lg:pt-28">
      {/* 1. Story & Ethos */}
      <StorySection />

      {/* 2. 4-Stage Methodology */}
      <MethodologySection />

      {/* 3. Leadership Team */}
      <LeadershipSection />
    </div>
  );
};

export default About;
