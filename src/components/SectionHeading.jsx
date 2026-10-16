import React from 'react';


const SectionHeading = ({
  badge,
  title,
  lead,
  align = 'left',
  theme = 'light',
  className = ''
}) => {
  return (
    <div className={`section-heading ${align === 'center' ? 'center' : ''} ${className}`}>
      {badge && (
        <div className={`eyebrow-badge ${align === 'center' ? 'center' : ''}`}>
          {badge}
        </div>
      )}
      {title && (
        <h2 className="section-title" style={{ color: theme === 'dark' ? 'var(--color-ivory)' : undefined }}>
          {title}
        </h2>
      )}
      {lead && (
        <p className="section-lead" style={{ color: theme === 'dark' ? '#c4d7cd' : undefined }}>
          {lead}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
