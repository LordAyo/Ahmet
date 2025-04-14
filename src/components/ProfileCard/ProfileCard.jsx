import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import './ProfileCard.css';
import profileImage from '../../IMG_8086.jpg';
import hoverSound from '../../sounds/hover.mp3';
import clickSound from '../../sounds/click.mp3';
import ExpandedView from './ExpandedView';

// Custom hook for animation timing
const useAnimationConfig = () => {
  return {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96], // Custom easeInOut curve
  };
};

// Custom hook for sound effects
const useSoundEffects = () => {
  const [canPlaySound, setCanPlaySound] = useState(false);
  
  // Create audio instances
  const hover = useMemo(() => typeof Audio !== 'undefined' ? new Audio(hoverSound) : null, []);
  const click = useMemo(() => typeof Audio !== 'undefined' ? new Audio(clickSound) : null, []);
  
  // Initialize audio on first user interaction
  useEffect(() => {
    // Set volume levels
    if (hover) hover.volume = 0.3;
    if (click) click.volume = 0.5;
    
    // Function to enable audio
    const enableAudio = () => {
      setCanPlaySound(true);
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };
    
    // Add event listeners
    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    document.addEventListener('keydown', enableAudio);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };
  }, [hover, click]);
  
  // Play sound functions
  const playHoverSound = useCallback(() => {
    if (canPlaySound && hover) {
      hover.currentTime = 0;
      const playPromise = hover.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Error playing hover sound:', error);
        });
      }
    }
  }, [canPlaySound, hover]);
  
  const playClickSound = useCallback(() => {
    if (canPlaySound && click) {
      click.currentTime = 0;
      const playPromise = click.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Error playing click sound:', error);
        });
      }
    }
  }, [canPlaySound, click]);
  
  return { playHoverSound, playClickSound };
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
  const { playHoverSound, playClickSound } = useSoundEffects();
  
  // Handle hover sound
  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
    playHoverSound();
  }, [playHoverSound]);
  
  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
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
  
  // Memoized click handler
  const handleClick = useCallback(() => {
    playClickSound();
    setIsExpanded(true);
  }, [playClickSound]);
  
  // Memoized close handler
  const handleClose = useCallback(() => {
    setIsExpanded(false);
  }, []);
  
  // Generate particles
  const particles = Array.from({ length: 10 }).map((_, index) => (
    <Particle key={index} index={index} />
  ));
  
  const profileData = {
    name: "Ayomide Abioye",
    title: "UI/UX Designer | Front-End Developer",
    bio: "Passionate about creating beautiful, intuitive, and performant user interfaces. Experienced in React, TypeScript, and modern web technologies.",
    image: profileImage,
    email: "ayozzabioye@gmail.com",
    phone: "647-825-7513",
    location: "Toronto, Canada",
    portfolio: [
      {
        title: "Interactive Profile Card",
        description: "A modern profile card with laser animations and interactive elements built with React and Framer Motion.",
        tags: ["React", "Framer Motion", "CSS Animations"],
        link: "https://github.com/yourusername/profile-card"
      },
      {
        title: "Portfolio Website",
        description: "Personal portfolio website showcasing my projects and skills.",
        tags: ["React", "Next.js", "Tailwind CSS"],
        link: "https://ayomideabioye.com"
      },
      {
        title: "Project 3",
        description: "Description of your third project",
        tags: ["TypeScript", "Node.js", "MongoDB"],
        link: "https://github.com/yourusername/project3"
      }
    ],
    socialLinks: [
      {
        name: "GitHub",
        icon: "📦",
        url: "https://github.com/yourusername"
      },
      {
        name: "LinkedIn",
        icon: "💼",
        url: "https://linkedin.com/in/yourusername"
      },
      {
        name: "Twitter",
        icon: "🐦",
        url: "https://twitter.com/yourusername"
      }
    ]
  };
  
  return (
    <div className="profile-card-container">
      {/* Full screen laser beams that activate on hover */}
      <div className="laser-beam beam-1"></div>
      <div className="laser-beam beam-2"></div>
      <div className="laser-beam beam-3"></div>
      <div className="laser-beam beam-4"></div>

      <motion.div
        className="profile-card"
        whileHover={{ scale: 1.02 }}
        onClick={handleClick}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Laser beams */}
        <div className="laser-beam top" />
        <div className="laser-beam bottom" />

        <motion.div 
          className="profile-image-container"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={profileData.image} 
            alt={profileData.name} 
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
    </div>
  );
};

export default React.memo(ProfileCard); 