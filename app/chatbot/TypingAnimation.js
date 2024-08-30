import React from 'react';
import { motion } from 'framer-motion';

export const TypingAnimation = ({ content }) => {
  if (typeof content !== 'string' || content.trim() === '') {
    return null;
  }

  const words = content.split(' ');

  return (
    <div className="typing-animation">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: index * 0.1
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </div>
  );
};
