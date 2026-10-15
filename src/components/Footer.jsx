import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="brand-logo" aria-label="S4Consultancy Home">
              <span className="brand-name">S4Consultancy</span>
            </Link>
            <p>
              Where hospitality meets excellence. S4Consultancy is a premium hospitality, hotels, resorts, and event management consultancy brand dedicated to personalized weddings, executive summits, banquet venue solutions, and strategic property advisory.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/standard" className="footer-link">The S4 Standard</Link></li>
              <li><Link to="/services" className="footer-link">Our Services</Link></li>
              <li><Link to="/projects" className="footer-link">Our Portfolio</Link></li>
              <li><Link to="/blog" className="footer-link">Hospitality Insights</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="footer-heading">Core Services</h4>
            <ul className="footer-links">
              <li><Link to="/services/wedding-planning" className="footer-link">Wedding Planning</Link></li>
              <li><Link to="/services/banquet-booking-consultancy" className="footer-link">Banquet Booking & Consultancy</Link></li>
              <li><Link to="/services/resorts" className="footer-link">Resorts</Link></li>
              <li><Link to="/services/hotel-stays" className="footer-link">Hotel Stays</Link></li>
              <li><Link to="/services/corporate-events" className="footer-link">Corporate Events</Link></li>
              <li><Link to="/services/destination-weddings" className="footer-link">Destination Weddings</Link></li>
              <li><Link to="/services/management-consultancy" className="footer-link">Management Consultancy</Link></li>
              <li><Link to="/services/group-booking" className="footer-link">Group Booking</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="footer-heading">Connect With S4</h4>
            <div className="footer-contact-item">
              <Mail size={16} />
              <span>inquiry@s4consultancy.com</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} />
              <span>+91 (0) 98765 43210</span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>Luxury Hospitality & Event Advisory Hub</span>
            </div>

            <div style={{ marginTop: '1.2rem' }}>
              {subscribed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>Thank you for subscribing to S4Consultancy Insights.</span>
                </div>
              ) : (
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <div className="newsletter-input-wrap">
                    <input
                      type="email"
                      placeholder="Enter your email..."
                      className="newsletter-input"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} S4Consultancy. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms of Advisory</Link>
            <Link to="/contact">Event Coordination SLA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
