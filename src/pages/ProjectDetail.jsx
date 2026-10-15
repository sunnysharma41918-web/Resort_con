import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Calendar, Building, Award } from 'lucide-react';
import { projectsData } from '../data/projectsData';

const ProjectDetail = () => {
  const { id } = useParams();

  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[projectIndex];

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[#FAF8F5]">
        <span className="inline-flex items-center px-3.5 py-1.5 bg-coral/10 text-coral text-xs font-bold tracking-widest uppercase mb-4">
          Project Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-plum mb-4">
          The requested project could not be found
        </h1>
        <p className="text-taupe-dark max-w-md mb-8 text-sm">
          The portfolio piece you are looking for may have been updated or archived. Explore our current signature engagements below.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Our Projects</span>
        </Link>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : projectsData[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-plum pt-6 pb-20">
      {/* Top Breadcrumb & Return Bar */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 pb-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-taupe/15 pb-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-taupe-dark hover:text-coral transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Our Projects</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-sans text-taupe-light">
            <Link to="/" className="hover:text-plum transition-colors">Home</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-plum transition-colors">Our Projects</Link>
            <span>/</span>
            <span className="text-plum font-semibold truncate max-w-[200px]">{project.title}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Project Header */}
        <div className="max-w-4xl mb-8 sm:mb-10">
          <div className="flex items-center gap-3 flex-wrap mb-3.5">
            <span className="inline-flex items-center px-3.5 py-1 bg-coral text-white text-[11px] font-bold tracking-widest uppercase rounded-none shadow-sm">
              {project.category}
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-plum text-cream text-[11px] font-bold tracking-wider uppercase rounded-none">
              {project.status}
            </span>
            <span className="text-xs text-taupe-dark font-sans flex items-center gap-1.5">
              <MapPin size={13} className="text-coral" />
              {project.location}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-display font-extrabold sm:font-black text-plum leading-[1.08] tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-taupe-dark font-sans leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Hero Showcase Image */}
        <div className="relative w-full h-[320px] sm:h-[460px] lg:h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-10 sm:mb-14">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center filter brightness-[0.98]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Floating Key Impact Badge on Image */}
          <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-xl border border-stone-200 shadow-xl max-w-sm">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-taupe-dark block mb-0.5">
              Verified Engagement Impact
            </span>
            <span className="text-lg sm:text-xl font-bold font-sans text-coral block leading-tight">
              {project.metrics}
            </span>
          </div>
        </div>

        {/* 4-Item Executive Facts Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-7 bg-white rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-12 sm:mb-16">
          <div className="border-r border-stone-100 last:border-none pr-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-taupe-light block mb-1 flex items-center gap-1.5">
              <MapPin size={13} className="text-coral" /> Location
            </span>
            <span className="text-sm sm:text-base font-bold text-plum block font-sans">
              {project.location}
            </span>
          </div>

          <div className="border-r border-stone-100 last:border-none pr-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-taupe-light block mb-1 flex items-center gap-1.5">
              <Building size={13} className="text-coral" /> Scale & Capacity
            </span>
            <span className="text-sm sm:text-base font-bold text-plum block font-sans">
              {project.keys}
            </span>
          </div>

          <div className="border-r border-stone-100 last:border-none pr-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-taupe-light block mb-1 flex items-center gap-1.5">
              <Calendar size={13} className="text-coral" /> Delivery Year
            </span>
            <span className="text-sm sm:text-base font-bold text-plum block font-sans">
              {project.year} ({project.status})
            </span>
          </div>

          <div>
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-taupe-light block mb-1 flex items-center gap-1.5">
              <Award size={13} className="text-coral" /> Key Metric
            </span>
            <span className="text-sm sm:text-base font-bold text-coral block font-sans">
              {project.metrics}
            </span>
          </div>
        </div>

        {/* Content Split: Detailed Overview (Left) + Project Metadata Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 sm:mb-20">
          {/* Left Main Editorial Body (8 cols) */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {/* About Section */}
            <div className="bg-white p-7 sm:p-9 rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-plum mb-4 pb-3 border-b border-stone-100 tracking-tight">
                About the Project
              </h2>
              <p className="text-sm sm:text-[15px] text-taupe-dark leading-relaxed font-sans mb-4">
                {project.description}
              </p>
              <p className="text-sm sm:text-[15px] text-taupe-dark leading-relaxed font-sans">
                Our hospitality practice acted as principal owner representatives, ensuring that every design decision, operational standard operating procedure (SOP), and capex line item supported long-term investor yields.
              </p>
            </div>

            {/* Strategic Challenge & S4Consultancy Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="w-9 h-9 rounded-lg bg-coral/10 text-coral flex items-center justify-center font-bold text-sm mb-3">
                  01
                </div>
                <h3 className="font-editorial text-lg font-bold text-plum mb-2">
                  The Strategic Challenge
                </h3>
                <p className="text-xs sm:text-[13px] text-taupe-dark leading-relaxed font-sans">
                  {project.challenge}
                </p>
              </div>

              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="w-9 h-9 rounded-lg bg-plum/10 text-plum flex items-center justify-center font-bold text-sm mb-3">
                  02
                </div>
                <h3 className="font-display text-lg font-bold text-plum mb-2">
                  S4Consultancy's Solution
                </h3>
                <p className="text-xs sm:text-[13px] text-taupe-dark leading-relaxed font-sans">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Achievements & Highlights */}
            <div className="bg-white p-7 sm:p-9 rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-plum mb-4 pb-3 border-b border-stone-100 flex items-center gap-2.5 tracking-tight">
                <Award size={20} className="text-coral" />
                Key Achievements & Highlights
              </h2>
              <div className="space-y-3 pt-2">
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-coral shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-sans font-medium text-stone-700 leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Engagement Profile & Advisory Scope (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Project Quick Specs Card */}
            <div className="bg-[#1E1D1C] text-white p-6 sm:p-7 rounded-2xl border border-stone-800 shadow-xl">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-coral block mb-3">
                Mandate Overview
              </span>
              <h3 className="font-editorial text-xl font-bold text-white mb-5 pb-3 border-b border-white/10">
                Asset Specifications
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-stone-400">Client / Sponsor</span>
                  <span className="text-white font-medium">{project.client}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-stone-400">Capital Volume</span>
                  <span className="text-coral font-bold">{project.investment}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-stone-400">Advisory Timeline</span>
                  <span className="text-white font-medium">{project.timeline}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-stone-400">Primary Sector</span>
                  <span className="text-white font-medium">{project.category}</span>
                </div>
              </div>

              {/* Advisory Scope Pills */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-400 block mb-3">
                  Scope & Deliverables
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.deliverables.map((deliv, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white/10 text-white text-[11px] rounded-sm font-sans"
                    >
                      {deliv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Inquiry Action Card */}
            <div className="bg-coral/10 border border-coral/30 p-6 sm:p-7 rounded-2xl text-center">
              <h4 className="font-display text-xl font-bold text-plum mb-2">
                Inquire With S4Consultancy
              </h4>
              <p className="text-xs text-taupe-dark font-sans leading-relaxed mb-5">
                Discuss weddings, banquet bookings, group hotel reservations, or hospitality management with our senior advisors.
              </p>
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold text-xs sm:text-sm py-3 px-5 rounded-lg transition-colors shadow-sm font-sans"
              >
                <span>Book S4Consultancy Consultation</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Adjacent Projects Carousel / Navigator */}
        <div className="border-t border-taupe/20 pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to={`/projects/${prevProject.id}`}
            className="flex items-center gap-3 p-4 rounded-xl bg-white border border-stone-200 hover:border-coral/50 transition-colors w-full sm:w-auto shadow-sm"
          >
            <ArrowLeft size={16} className="text-coral shrink-0" />
            <div className="text-left">
              <span className="text-[10px] font-sans uppercase font-bold text-taupe-light block">Previous Project</span>
              <span className="text-xs sm:text-sm font-bold text-plum font-sans truncate block max-w-[200px]">{prevProject.title}</span>
            </div>
          </Link>

          <Link
            to="/projects"
            className="text-xs font-bold font-sans text-taupe-dark hover:text-coral uppercase tracking-wider transition-colors py-2"
          >
            All Our Projects
          </Link>

          <Link
            to={`/projects/${nextProject.id}`}
            className="flex items-center justify-end gap-3 p-4 rounded-xl bg-white border border-stone-200 hover:border-coral/50 transition-colors w-full sm:w-auto shadow-sm text-right"
          >
            <div className="text-right">
              <span className="text-[10px] font-sans uppercase font-bold text-taupe-light block">Next Project</span>
              <span className="text-xs sm:text-sm font-bold text-plum font-sans truncate block max-w-[200px]">{nextProject.title}</span>
            </div>
            <ArrowRight size={16} className="text-coral shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
