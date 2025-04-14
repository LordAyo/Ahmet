import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProfileCard.css';
import ExpandedView from './ExpandedView';

// Import sound effects
import hoverSound from '../../sounds/hover.mp3';
import clickSound from '../../sounds/click.mp3';
import backgroundMusic from '../../sounds/background.mp3';

const ProfileCard = () => {
  // Profile data object with all information
  const profileData = {
    name: "Ahmet Ayomide",
    title: "Software Developer",
    bio: `Experienced software developer with a passion for creating elegant, user-friendly applications. Specializing in React, Node.js, and modern JavaScript frameworks, I bring a creative approach to problem-solving and a commitment to writing clean, maintainable code. Always eager to learn new technologies and collaborate on innovative projects.`,
    email: "ayozzabioye@gmail.com",
    phone: "647-825-7513",
    location: "Toronto, Canada",
    social: {
      github: "https://github.com/ahmet",
      linkedin: "https://linkedin.com/in/ahmet",
      twitter: "https://twitter.com/ahmet",
      instagram: "https://instagram.com/ahmet"
    }
  };

  // State management
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Audio references
  const hoverAudio = useRef(new Audio(hoverSound));
  const clickAudio = useRef(new Audio(clickSound));
  const backgroundAudio = useRef(new Audio(backgroundMusic));

  // Initialize audio settings on mount
  useEffect(() => {
    hoverAudio.current.volume = 0.3;
    clickAudio.current.volume = 0.5;
    backgroundAudio.current.volume = 0.2;
    backgroundAudio.current.loop = true;

    try {
      // Try to play background music (may be blocked by browser autoplay policy)
      backgroundAudio.current.play().catch(err => {
        console.log('Autoplay prevented:', err);
        // We can inform the user they need to interact with the page to enable audio
      });
    } catch (error) {
      console.error('Error playing background music:', error);
    }

    // Cleanup function
    return () => {
      hoverAudio.current.pause();
      clickAudio.current.currentTime = 0;
      clickAudio.current.pause();
      clickAudio.current.currentTime = 0;
      backgroundAudio.current.pause();
      backgroundAudio.current.currentTime = 0;
    };
  }, []);

  // Handle window resize to update animations
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle hover effect with sound
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (hoverAudio.current) {
      hoverAudio.current.currentTime = 0;
      hoverAudio.current.play().catch(err => console.log('Hover sound prevented:', err));
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Handle click with sound and expanded view
  const handleCardClick = useCallback(() => {
    if (clickAudio.current) {
      clickAudio.current.currentTime = 0;
      clickAudio.current.play().catch(err => console.log('Click sound prevented:', err));
    }
    setIsExpanded(true);
  }, []);

  // Handle closing the expanded view
  const handleCloseExpanded = useCallback(() => {
    setIsExpanded(false);
  }, []);

  // Memoized animation variants to avoid recreating on every render
  const cardVariants = useMemo(() => {
    return {
      hover: {
        y: -15,
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px 5px rgba(0, 172, 255, 0.4)',
        transition: {
          y: { type: 'spring', stiffness: 300, damping: 15 },
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          boxShadow: { duration: 0.3 }
        }
      },
      initial: {
        y: 0,
        scale: 1,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 172, 255, 0.2)',
        transition: {
          y: { type: 'spring', stiffness: 300, damping: 20 },
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          boxShadow: { duration: 0.3 }
        }
      }
    };
  }, []);

  const imageVariants = useMemo(() => {
    return {
      hover: {
        scale: 1.1,
        transition: { duration: 0.4 }
      },
      initial: {
        scale: 1,
        transition: { duration: 0.4 }
      }
    };
  }, []);

  const textVariants = useMemo(() => {
    return {
      hover: {
        color: '#62ffe7',
        transition: { duration: 0.2 }
      },
      initial: {
        color: '#ffffff',
        transition: { duration: 0.2 }
      }
    };
  }, []);

  return (
    <>
      <motion.div
        className="profile-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        variants={cardVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        whileTap={{ scale: 0.95 }}
        aria-label="Click to view full profile"
        role="button"
        tabIndex="0"
      >
        <div className="laser-beam top" />
        <div className="laser-beam bottom" />
        
        <div className="card-content">
          <motion.div className="profile-image-container" variants={imageVariants}>
            <img 
              src="/profile.jpg" 
              alt={profileData.name} 
              className="profile-image" 
            />
          </motion.div>
          
          <motion.h2 className="name" variants={textVariants}>
            {profileData.name}
          </motion.h2>
          
          <motion.p className="title">
            {profileData.title}
          </motion.p>
          
          <div className="location">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{profileData.location}</span>
          </div>
          
          <div className="view-profile-hint">
            <span>Click for full profile</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <ExpandedView
            profileData={profileData}
            onClose={handleCloseExpanded}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(ProfileCard); 