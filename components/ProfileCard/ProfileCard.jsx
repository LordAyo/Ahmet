import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ProfileCard.css';
import profileImage from '../../IMG_8086.jpg';

// Custom hook for animation timing
const useAnimationConfig = () => {
  return {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96], // Custom easeInOut curve
  };
};

// Particle component for the animation effect
const Particle = ({ index }) => {
  const randomOffset = () => (Math.random() - 0.5) * 100;
  
  return (
    <motion.div
      className="particle"
      initial={{ 
        x: 0, 
        y: 0, 
        opacity: 0,
        scale: 0 
      }}
      animate={{ 
        x: randomOffset(), 
        y: randomOffset(), 
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        delay: index * 0.1,
        ease: "easeInOut"
      }}
    />
  );
};

const ProfileCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const animationConfig = useAnimationConfig();
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Open portfolio in new tab
  const openPortfolio = () => {
    window.open('https://lordayo.github.io/ayomide-portfolio/', '_blank');
  };
  
  // Generate particles
  const particles = Array.from({ length: 10 }).map((_, index) => (
    <Particle key={index} index={index} />
  ));
  
  return (
    <motion.div 
      className="profile-card-container"
      whileHover={{ scale: 1.05 }}
      onClick={openPortfolio}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ 
        duration: animationConfig.duration, 
        ease: animationConfig.ease,
      }}
    >
      <div className="profile-card">
        <div className="profile-image-container">
          <img 
            src={profileImage} 
            alt="Ayomide Abioye" 
            className="profile-image" 
          />
          {isHovered && (
            <motion.div 
              className="image-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{
                duration: animationConfig.duration,
                ease: animationConfig.ease
              }}
            />
          )}
          {isHovered && (
            <div className="particles-container">
              {particles}
            </div>
          )}
        </div>
        
        <div className="profile-info">
          <motion.h2 
            className="profile-name"
            animate={{ y: isHovered ? -5 : 0, color: isHovered ? '#0c8' : '#333' }}
            transition={{
              duration: animationConfig.duration,
              ease: animationConfig.ease
            }}
          >
            Ayomide Abioye
          </motion.h2>
          
          <motion.p 
            className="profile-title"
            animate={{ 
              y: isHovered ? 5 : 0,
              opacity: isHovered ? 1 : 0.9 
            }}
            transition={{
              duration: animationConfig.duration,
              ease: animationConfig.ease
            }}
          >
            UI/UX Designer | Front-End Developer
          </motion.p>
          
          <motion.div 
            className="profile-location"
            animate={{ 
              opacity: isHovered ? 1 : 0.7
            }}
            transition={{
              duration: animationConfig.duration,
              ease: animationConfig.ease
            }}
          >
            <span className="location-icon">📍</span> Toronto, Canada
          </motion.div>
        </div>
        
        <div className="profile-hint">
          Hover to preview • Click to open portfolio
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard; 