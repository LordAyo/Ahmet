import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProfileCard.css';
import ExpandedView from './ExpandedView';

const profileData = {
  name: 'Ayomide Abioye',
  title: 'Software Developer',
  bio: 'Passionate software developer with expertise in React, Node.js, and modern web technologies. Creating innovative solutions and delivering exceptional user experiences.',
  email: 'ayozzabioye@gmail.com',
  phone: '647-825-7513',
  location: 'Toronto, Canada',
  image: '/assets/images/profile.jpg',
  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com/yourusername',
      icon: 'github'
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/yourusername',
      icon: 'linkedin'
    },
    {
      platform: 'twitter',
      url: 'https://twitter.com/yourusername',
      icon: 'twitter'
    }
  ]
};

const ProfileCard = React.memo(() => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleHover = useCallback((isEntering) => {
    setIsHovered(isEntering);
  }, []);

  const handleClick = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const cardVariants = useMemo(() => ({
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5 }
  }), []);

  return (
    <>
      <motion.div
        className="profile-card"
        variants={cardVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        onHoverStart={() => handleHover(true)}
        onHoverEnd={() => handleHover(false)}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
      >
        <div className="laser-beam top" />
        <div className="laser-beam bottom" />
        
        <motion.div className="profile-image-container">
          <img
            src={profileData.image || "/assets/images/profile.jpg"}
            alt={profileData.name}
            className="profile-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/images/profile.jpg";
            }}
          />
        </motion.div>

        <motion.div className="profile-info">
          <motion.h2>{profileData.name}</motion.h2>
          <motion.h3>{profileData.title}</motion.h3>
          <motion.p className="location">{profileData.location}</motion.p>
          <motion.p className="hint">Click for full profile</motion.p>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <ExpandedView
            profileData={profileData}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
});

export default ProfileCard; 