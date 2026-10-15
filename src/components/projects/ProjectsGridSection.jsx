import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { projectsData } from '../../data/projectsData';

const categories = ['All Projects', 'Eco-Resort', 'Ultra-Luxury Conversion', 'Wellness & Spa Retreat', 'Heritage & Experiential'];

const ProjectsGridSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Projects');

  const filteredProjects = activeCategory === 'All Projects'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section className="section-lg" id="portfolio-grid" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <div className="container">
        <SectionHeading
          align="center"
          badge="Our Track Record"
          title="Signature Hospitality & Event Engagements"
          lead="Review our recent wedding coordination, corporate conference management, resort stays, and operational advisory outcomes. Click any portfolio piece to view detailed scope information."
        />

        {/* Category Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.78rem', padding: '0.55rem 1.25rem', borderRadius: 'var(--radius-pill)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-2" style={{ gap: '2.5rem' }}>
          {filteredProjects.map((project, idx) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="card-luxury group"
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  className="hover-scale-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Category Badge */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span
                    className="badge-pill"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: 'var(--color-plum)',
                      fontWeight: 700,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Status Badge */}
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                  <span
                    style={{
                      backgroundColor: 'var(--color-plum)',
                      color: 'var(--color-terracotta)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-pill)',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-terracotta)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <MapPin size={13} />
                  <span>{project.location} • {project.year}</span>
                </div>

                <h3
                  style={{
                    fontSize: '1.6rem',
                    color: 'var(--color-primary-dark)',
                    marginBottom: '0.6rem',
                    lineHeight: 1.25
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-text-body)',
                    marginBottom: '1.2rem',
                    lineHeight: 1.6
                  }}
                >
                  {project.tagline}
                </p>

                <div
                  style={{
                    backgroundColor: 'var(--color-ivory-warm)',
                    padding: '1rem 1.2rem',
                    borderRadius: 'var(--radius-xs)',
                    marginBottom: '1.4rem',
                    fontSize: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                >
                  <div style={{ color: 'var(--color-text-muted)' }}>
                    <strong style={{ color: 'var(--color-primary-dark)' }}>Scope:</strong> {project.scope}
                  </div>
                  <div style={{ color: 'var(--color-text-muted)' }}>
                    <strong style={{ color: 'var(--color-primary-dark)' }}>Profile:</strong> {project.keys}
                  </div>
                  {project.investment && (
                    <div style={{ color: 'var(--color-text-muted)' }}>
                      <strong style={{ color: 'var(--color-primary-dark)' }}>Investment:</strong> {project.investment}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    marginTop: 'auto',
                    borderTop: '1px solid var(--color-ivory-border)',
                    paddingTop: '1.2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--color-text-light)',
                        display: 'block'
                      }}
                    >
                      Key Result
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-champ)' }}>
                      {project.metrics}
                    </span>
                  </div>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--color-terracotta)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    <span>View Project Details</span>
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGridSection;
