import React from 'react';
import CTASection from '../components/CTASection';
import { ProjectsGridSection } from '../components/projects';

const Projects = () => {
  return (
    <div className="projects-page pt-20 sm:pt-24 lg:pt-28">
      {/* 1. Signature Projects Filter & Grid */}
      <ProjectsGridSection />

      {/* 2. Advisory Consultation CTA */}
      <CTASection
        title="Ready to Develop Your Next Signature Resort?"
        description="Connect with our practice to discuss master planning, feasibility underwriting, or operator selection."
        secondaryBtnText="View All Projects"
        secondaryBtnLink="/projects"
      />
    </div>
  );
};

export default Projects;
