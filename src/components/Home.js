import React from 'react';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="home">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        Welcome to the Mental Health Hub
      </motion.h1>
      
      <motion.img 
        src="mind.png" 
        alt="Mental Health Illustration"
        className="w-2/3 md:w-1/3 mb-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      />

      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5, duration: 1 }}
      >
        Your journey to relaxation and well-being starts here.
      </motion.p>

      <motion.p 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ delay: 1, duration: 1 }}
      >
        Explore our features: Music, Chat Support, Guided Meditation, Sleep Aids, Therapy Sessions, and Self-Care Activities.
      </motion.p>

      <motion.button 
        className="cta-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.button>
    </div>
  );
}

export default Home;