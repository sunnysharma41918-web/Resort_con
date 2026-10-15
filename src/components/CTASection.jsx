import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, HeartHandshake, ArrowRight } from 'lucide-react';

const CTASection = ({
  badge = 'Hospitality & Event Advisory',
  title = 'Where Hospitality Meets Excellence',
  description = 'Whether curating an unforgettable wedding celebration, booking luxury hotel stays, securing premier banquet venues, or seeking management advisory, our dedicated consultants are ready to assist.',
  primaryBtnText = 'Schedule a Consultation',
  primaryBtnLink = '/contact',
  secondaryBtnText = 'Explore All 8 Services',
  secondaryBtnLink = '/services'
}) => {
  return (
    <div className="py-2 px-3 sm:px-6">
      <section className="cta-banner">
        <div className="container cta-container">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {badge && (
              <div className="eyebrow-badge center bg-[#FAED26]/15 text-[#FAED26] border border-[#FAED26]/40 mb-5 font-sans">
                {badge}
              </div>
            )}
            <h2 className="cta-title font-display">{title}</h2>
            <p className="cta-desc font-sans">{description}</p>

            <div className="cta-buttons">
              <Link to={primaryBtnLink} className="btn btn-white font-sans">
                <span>{primaryBtnText}</span>
                <ArrowRight size={16} />
              </Link>
              {secondaryBtnText && (
                <Link
                  to={secondaryBtnLink}
                  className="btn btn-outline border-white/40 text-white hover:bg-[#FAED26] hover:text-[#46344E] hover:border-[#FAED26] font-sans"
                >
                  <span>{secondaryBtnText}</span>
                </Link>
              )}
            </div>

            <div className="cta-trust-points font-sans">
              <div className="trust-item">
                <ShieldCheck size={16} color="#FAED26" />
                <span>Dedicated Client Advocacy</span>
              </div>
              <div className="trust-item">
                <Award size={16} color="#FAED26" />
                <span>Verified Five-Star Standards</span>
              </div>
              <div className="trust-item">
                <HeartHandshake size={16} color="#FAED26" />
                <span>Transparent Commercial Terms</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CTASection;
