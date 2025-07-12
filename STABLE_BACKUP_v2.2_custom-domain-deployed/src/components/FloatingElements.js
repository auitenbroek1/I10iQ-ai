import React from 'react';
import { motion } from 'framer-motion';

const FloatingShape = ({ delay = 0, duration = 4, className = "" }) => {
  return (
    <motion.div
      className={`absolute rounded-full opacity-20 ${className}`}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {/* Large floating shapes - moved away from bottom to prevent layout shifts */}
      <FloatingShape 
        delay={0}
        duration={6}
        className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 top-1/4 left-1/4"
      />
      <FloatingShape 
        delay={1}
        duration={8}
        className="w-24 h-24 bg-gradient-to-r from-teal-500 to-cyan-600 top-1/3 right-1/4"
      />
      <FloatingShape 
        delay={2}
        duration={5}
        className="w-20 h-20 bg-gradient-to-r from-navy to-blue-800 top-2/3 left-1/3"
      />
      <FloatingShape 
        delay={3}
        duration={7}
        className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 top-3/4 right-1/3"
      />
      
      {/* Medium floating shapes - all positioned from top */}
      <FloatingShape 
        delay={0.5}
        duration={4}
        className="w-12 h-12 bg-gradient-to-r from-blue-400 to-teal-500 top-1/2 left-1/5"
      />
      <FloatingShape 
        delay={1.5}
        duration={6}
        className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 top-1/6 right-1/5"
      />
      
      {/* Small floating particles - all positioned from top */}
      <FloatingShape 
        delay={2.5}
        duration={3}
        className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 top-1/5 right-1/2"
      />
      <FloatingShape 
        delay={3.5}
        duration={5}
        className="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-600 top-4/5 left-1/2"
      />
    </div>
  );
};

export default FloatingElements;