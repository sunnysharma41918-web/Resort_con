import React from 'react';
import CTASection from '../components/CTASection';
import { BlogArticlesSection } from '../components/blog';

const Blog = () => {
  return (
    <div className="blog-page pt-20 sm:pt-24 lg:pt-28">
      {/* 1. Research & Articles Grid with Benchmark Report Callout */}
      <BlogArticlesSection />

      {/* 2. Advisory Consultation CTA */}
      <CTASection
        title="Need Custom Hospitality Feasibility or Research?"
        description="Our advisory practice conducts tailored underwriting, competitive compset studies, and destination analyses."
      />
    </div>
  );
};

export default Blog;
