import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MatrixTransitionProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const MatrixTransition: React.FC<MatrixTransitionProps> = ({ isVisible, onComplete }) => {
  const [chars, setChars] = useState<Array<{ id: number; char: string; left: string; delay: number }>>([]);

  useEffect(() => {
    if (isVisible) {
      // Generate a massive amount of falling matrix characters for high density
      const newChars = Array.from({ length: 800 }, (_, i) => ({
        id: i,
        char: Math.random() > 0.5 ? '1' : '0',
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 0.8
      }));
      setChars(newChars);

      // Complete the transition after 2 seconds
      const timer = setTimeout(() => {
        onComplete();
        setChars([]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="matrix-transition"
    >
      {/* Black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Matrix rain - huge amount of 0s and 1s */}
      {chars.map((char) => (
        <motion.div
          key={char.id}
          className="absolute text-matrix-green font-mono text-lg font-bold opacity-90"
          style={{ left: char.left }}
          initial={{ y: '-10vh' }}
          animate={{ y: '110vh' }}
          transition={{
            duration: Math.random() * 1 + 0.8,
            delay: char.delay,
            ease: 'linear'
          }}
        >
          {char.char}
        </motion.div>
      ))}
    </motion.div>
  );
};
