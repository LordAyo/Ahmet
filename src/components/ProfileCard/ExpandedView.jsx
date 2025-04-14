import React, { useEffect, useRef, useCallback } from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import './ExpandedView.css';

const ExpandedView = ({ isOpen, onClose, profileData }) => {
  const expandedRef = useRef(null);

  // Handle click outside to close
  const handleClickOutside = useCallback((event) => {
    if (expandedRef.current && !expandedRef.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [handleClickOutside, isOpen]);

  if (!isOpen) return null;

  return (
    <ErrorBoundary>
      <div className="expanded-overlay" onClick={onClose}>
        <div
          ref={expandedRef}
          className="expanded-content"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

          {/* Profile Section */}
          <div className="profile-section">
            <div className="expanded-image-container">
              <img 
                src={profileData.image} 
                alt={profileData.name}
                loading="eager"
              />
            </div>
            <h2>{profileData.name}</h2>
            <h3>{profileData.title}</h3>
            <p className="bio">{profileData.bio}</p>
            
            {/* Portfolio Button */}
            <a
              href="https://lordayo.github.io/ayomide-portfolio/"
              className="portfolio-button"
              onClick={(e) => {
                e.preventDefault();
                // Add a fade-out effect to the modal
                const overlay = document.querySelector('.expanded-overlay');
                overlay.classList.add('fade-out');
                
                // After the fade animation, navigate to the portfolio
                setTimeout(() => {
                  window.location.href = "https://lordayo.github.io/ayomide-portfolio/";
                }, 300);
              }}
            >
              <span className="button-icon">🚀</span>
              View Full Portfolio
            </a>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <h3 className="section-title">Contact</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="icon">📧</span>
                <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
              </div>
              <div className="contact-item">
                <span className="icon">📱</span>
                <a href={`tel:${profileData.phone}`}>{profileData.phone}</a>
              </div>
              <div className="contact-item">
                <span className="icon">📍</span>
                <span>{profileData.location}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-links">
            {profileData.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="icon">{link.icon}</span>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(ExpandedView); 