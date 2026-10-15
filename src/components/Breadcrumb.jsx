import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumb-wrapper" aria-label="Breadcrumb">
      <div className="container">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/" className="breadcrumb-link" aria-label="Home">
              <Home size={14} style={{ display: 'inline', verticalAlign: '-1px' }} />
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label || index} className="breadcrumb-item">
                <ChevronRight size={13} className="breadcrumb-separator" />
                {isLast || !item.to ? (
                  <span className="breadcrumb-current" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.to} className="breadcrumb-link">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
