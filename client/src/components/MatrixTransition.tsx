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
      const newChars = Array.from({ length: 300 }, (_, i) => ({
        id: i,
        char: Math.random() > 0.5 ? '1' : '0',
        left: `${Math.random() * 100}%`,
        delay: i * 0.01
      }));
      setChars(newChars);

      const timer = setTimeout(() => {
        onComplete();
        setChars([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="matrix-transition"
    >
      {chars.map((char) => (
        <motion.div
          key={char.id}
          className="absolute text-matrix-green font-mono text-sm opacity-80"
          style={{ left: char.left }}
          initial={{ y: '-100vh' }}
          animate={{ y: '100vh' }}
          transition={{
            duration: Math.random() * 3 + 1,
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
