import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import './ExpandedView.css';

const ExpandedView = ({ profileData, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  
  // Handle click outside to close
  const handleClickOutside = useCallback((e) => {
    if (overlayRef.current && contentRef.current && 
        !contentRef.current.contains(e.target) && 
        overlayRef.current.contains(e.target)) {
      onClose();
    }
  }, [onClose]);
  
  // Handle escape key press to close
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);
  
  useEffect(() => {
    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    // Lock body scroll when expanded view is open
    document.body.style.overflow = 'hidden';
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleClickOutside, handleKeyDown]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3, 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };
  
  return (
    <motion.div 
      className="expanded-overlay"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={overlayRef}
    >
      <motion.div 
        className="expanded-content"
        ref={contentRef}
        variants={containerVariants}
      >
        <motion.button 
          className="close-button" 
          onClick={onClose}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Close profile"
        >
          &times;
        </motion.button>
        
        <motion.div className="expanded-image-container" variants={itemVariants}>
          <img 
            src={`https://i.pravatar.cc/300?img=12`} 
            alt={profileData.name} 
            className="expanded-image"
          />
        </motion.div>
        
        <motion.h1 className="expanded-name" variants={itemVariants}>
          {profileData.name}
        </motion.h1>
        
        <motion.h2 className="expanded-title" variants={itemVariants}>
          {profileData.title}
        </motion.h2>
        
        <motion.div className="expanded-section bio" variants={itemVariants}>
          <h3>About Me</h3>
          <p>{profileData.bio}</p>
        </motion.div>
        
        <motion.div className="expanded-section social" variants={itemVariants}>
          <h3>Connect With Me</h3>
          <div className="social-links">
            {profileData.socialLinks.map((link, index) => (
              <motion.a 
                key={link.platform} 
                href={link.url}
                className={`social-link ${link.icon}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
                custom={index}
                aria-label={`Visit ${link.platform} profile`}
              >
                <span className="platform-name">{link.platform}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        <motion.div className="expanded-section contact" variants={itemVariants}>
          <h3>Contact Information</h3>
          <div className="contact-info">
            <motion.div className="contact-item" variants={itemVariants}>
              <div className="contact-label">Email:</div>
              <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
            </motion.div>
            
            <motion.div className="contact-item" variants={itemVariants}>
              <div className="contact-label">Phone:</div>
              <a href={`tel:${profileData.phone}`}>{profileData.phone}</a>
            </motion.div>
            
            <motion.div className="contact-item" variants={itemVariants}>
              <div className="contact-label">Location:</div>
              <span>{profileData.location}</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ExpandedView); 