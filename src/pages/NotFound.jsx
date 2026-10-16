import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="hero-wrapper">
      <div 
        className="hero-card-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2.5rem 1.5rem',
          backgroundColor: '#1F1A0E',
          border: '1px solid rgba(203, 189, 147, 0.25)'
        }}
      >
        <div style={{ maxWidth: '620px', position: 'relative', zIndex: 3 }}>
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(203, 189, 147, 0.15)',
            color: '#FAE8B4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '1px solid rgba(203, 189, 147, 0.4)'
          }}>
            <Compass size={40} strokeWidth={1.75} />
          </div>

          <div 
            className="eyebrow-badge center" 
            style={{ 
              backgroundColor: 'var(--color-primary-soft)', 
              borderColor: 'var(--color-primary-border)', 
              color: 'var(--color-primary)',
              marginBottom: '1rem' 
            }}
          >
            404 — Dossier Missing
          </div>

          <h1 className="hero-headline" style={{ marginBottom: '1rem' }}>
            <span className="yellow-highlight">Destination</span> Not Found
          </h1>

          <p className="hero-subtext" style={{ maxWidth: '520px', margin: '0 auto 2.5rem' }}>
            The hospitality page, event inquiry, or service details you are looking for has been relocated. Explore our eight core services directory or return home.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">
              <Home size={16} />
              <span>Return to Homepage</span>
            </Link>
            <Link 
              to="/#services" 
              className="btn btn-outline"
              style={{ borderColor: 'rgba(255, 255, 255, 0.4)', color: '#ffffff' }}
            >
              <span>Explore Advisory Services</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
