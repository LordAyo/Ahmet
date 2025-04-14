import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimations } from '../../hooks/useAnimations';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import './ExpandedView.css';

const ExpandedView = ({ isOpen, onClose, profileData }) => {
  const expandedRef = useRef(null);
  const { containerVariants, itemVariants, overlayVariants } = useAnimations();

  // Handle click outside to close
  const handleClickOutside = useCallback((event) => {
    if (expandedRef.current && !expandedRef.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <ErrorBoundary>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="expanded-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          >
            <motion.div
              ref={expandedRef}
              className="expanded-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <motion.button
                className="close-button"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>

              {/* Profile Section */}
              <motion.div variants={itemVariants} className="profile-section">
                <motion.div 
                  className="expanded-image-container"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={profileData.image} 
                    alt={profileData.name}
                    className="profile-image"
                  />
                </motion.div>
                <h2>{profileData.name}</h2>
                <h3>{profileData.title}</h3>
                <p className="bio">{profileData.bio}</p>
                
                {/* Portfolio Button */}
                <motion.a
                  href="https://ayomideabioye.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-button"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(77, 171, 247, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="button-icon">🚀</span>
                  View Full Portfolio
                </motion.a>
              </motion.div>

              {/* Contact Section */}
              <motion.div variants={itemVariants} className="contact-section">
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
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="social-links">
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
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default React.memo(ExpandedView); 