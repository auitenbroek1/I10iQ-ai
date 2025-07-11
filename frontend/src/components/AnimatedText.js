import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ 
  texts = ["Cut Through the", "Navigate Beyond the", "Rise Above the"], 
  staticEnd = "AI Hype",
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000 
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const targetText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(prev => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex(prev => (prev + 1) % texts.length);
        }
      } else {
        if (currentText.length < targetText.length) {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      }
    }, isPaused ? pauseTime : isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <div className={className}>
      {/* Fixed height container to prevent layout shifts on mobile */}
      <div className="h-16 md:h-20 flex items-end justify-center">
        <span className="inline-block text-center leading-tight">
          {currentText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-1 h-full bg-purple-600 ml-1"
          >
            |
          </motion.span>
        </span>
      </div>
      <span className="text-purple-600 block text-center">{staticEnd}</span>
    </div>
  );
};

export default AnimatedText;