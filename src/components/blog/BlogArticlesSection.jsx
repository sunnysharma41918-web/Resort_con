import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { blogData } from '../../data/blogData';

const BlogArticlesSection = () => {
  return (
    <section className="section-lg" id="articles-grid" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <div className="container">
        <SectionHeading
          align="center"
          badge="Thought Leadership"
          title="Latest Research & Executive Dispatches"
          lead="Read our analysis on macroeconomic trends, eco-tourism demand shifts, and master planning innovations."
        />

        <div className="grid grid-3" style={{ marginTop: '3rem' }}>
          {blogData.map((article, idx) => (
            <motion.article
              key={article.id}
              className="card-luxury"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge-pill badge-pill-green">{article.category}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--color-text-light)' }}>
                  <Clock size={13} />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '0.8rem', lineHeight: 1.3 }}>
                {article.title}
              </h3>

              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.5rem' }}>
                {article.excerpt}
              </p>

              <div style={{ borderTop: '1px solid var(--color-ivory-border)', paddingTop: '1.2rem', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>{article.author}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '2px' }}>
                    <Calendar size={11} />
                    <span>{article.date}</span>
                  </div>
                </div>

                <span className="btn-text" style={{ cursor: 'pointer' }}>
                  <span>Read Brief</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Special Whitepaper Feature Callout */}
        <div style={{ marginTop: '4rem', backgroundColor: 'var(--color-plum)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid rgba(232, 90, 79, 0.3)', color: '#ffffff' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
            <div style={{ maxWidth: '640px' }}>
              <span className="badge-pill badge-pill-yellow" style={{ marginBottom: '0.6rem', display: 'inline-block' }}>
                Annual Benchmark Report 2026
              </span>
              <h3 style={{ fontSize: '1.7rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                The 2026 Global Eco-Resort & Biophilic Hospitality Benchmark
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
                A 64-page quantitative survey covering 120+ luxury eco-resorts worldwide, analyzing average Capex per key, ADR premiums for vernacular designs, and debt financing structures.
              </p>
            </div>
            <a href="#request-report" onClick={(e) => { e.preventDefault(); alert("The 2026 Global Benchmark Report will be delivered to your inbox upon consultation request."); }} className="btn btn-primary">
              <BookOpen size={16} />
              <span>Request Executive Copy</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogArticlesSection;
