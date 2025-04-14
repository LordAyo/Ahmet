import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import './ProfileCard.css';
import profileImage from '../../IMG_8086.jpg';
import hoverSound from '../../sounds/hover.mp3';
import clickSound from '../../sounds/click.mp3';
import backgroundMusic from '../../sounds/background.mp3';
import ExpandedView from './ExpandedView';

// Profile data
const profileData = {
  name: 'Ayomide Abioye',
  title: 'UI/UX Designer | Front-End Developer',
  image: profileImage,
  bio: 'Passionate about creating beautiful, functional digital experiences. Specializing in user-centered design and modern web development.',
  email: 'ayozzabioye@gmail.com',
  phone: '647-825-7513',
  location: 'Toronto, Canada',
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/lordayo',
      icon: '👨‍💻'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/ayomide',
      icon: '💼'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/ayomide',
      icon: '🐦'
    }
  ]
};

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const animationConfig = useAnimationConfig();
  
  // Audio refs
  const hoverAudioRef = useRef(new Audio(hoverSound));
  const clickAudioRef = useRef(new Audio(clickSound));
  const backgroundAudioRef = useRef(new Audio(backgroundMusic));
  
  // Initialize background music
  useEffect(() => {
    backgroundAudioRef.current.volume = 0.2;
    backgroundAudioRef.current.loop = true;
    
    // Start playing background music when component mounts
    const playBackgroundMusic = async () => {
      try {
        await backgroundAudioRef.current.play();
      } catch (error) {
        console.log('Background music play failed:', error);
      }
    };
    
    playBackgroundMusic();
    
    // Cleanup function to stop music when component unmounts
    return () => {
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current.currentTime = 0;
    };
  }, []);
  
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
  
  // Handle hover sound
  useEffect(() => {
    if (isHovered) {
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current.volume = 0.3;
      hoverAudioRef.current.play().catch(error => console.log('Audio play failed:', error));
    }
  }, [isHovered]);
  
  // Memoized click handler
  const handleClick = useCallback(() => {
    clickAudioRef.current.currentTime = 0;
    clickAudioRef.current.volume = 0.5;
    clickAudioRef.current.play().catch(error => console.log('Audio play failed:', error));
    setIsExpanded(true);
  }, []);
  
  // Memoized close handler
  const handleClose = useCallback(() => {
    setIsExpanded(false);
  }, []);
  
  // Generate particles
  const particles = Array.from({ length: 10 }).map((_, index) => (
    <Particle key={index} index={index} />
  ));
  
  return (
    <motion.div 
      className="profile-card-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="profile-card"
        whileHover={{ scale: 1.02 }}
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="profile-image-container"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
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
        </motion.div>
        
        <motion.h2 
          className="profile-name"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {profileData.name}
        </motion.h2>
        
        <motion.p 
          className="profile-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {profileData.title}
        </motion.p>
        
        <motion.div 
          className="profile-location"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span>📍</span> {profileData.location}
        </motion.div>
        
        <motion.div 
          className="profile-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Click to view full profile
        </motion.div>
      </motion.div>

      <ExpandedView
        isOpen={isExpanded}
        onClose={handleClose}
        profileData={profileData}
      />
    </motion.div>
  );
};

export default React.memo(ProfileCard); 