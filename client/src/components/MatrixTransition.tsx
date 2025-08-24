import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MatrixTransitionProps {
  isVisible: boolean;
  onComplete: () => void;
  onModeSwitch: () => void;
}

interface MatrixChar {
  id: number;
  char: string;
  left: string;
  top: string;
  delay: number;
  duration: number;
}

export const MatrixTransition: React.FC<MatrixTransitionProps> = ({ 
  isVisible, 
  onComplete, 
  onModeSwitch 
}) => {
  const [phase, setPhase] = useState<'part1' | 'part2' | 'part3'>('part1');
  const [chars, setChars] = useState<MatrixChar[]>([]);

  useEffect(() => {
    if (isVisible) {
      // Part 1: Generate a few falling characters (30 chars)
      const part1Chars = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        char: Math.random() > 0.5 ? '1' : '0',
        left: `${Math.random() * 100}%`,
        top: `${-10 - Math.random() * 20}%`,
        delay: Math.random() * 0.3,
        duration: 2 + Math.random()
      }));
      
      setChars(part1Chars);
      setPhase('part1');

      // After 800ms, move to Part 2
      const part2Timer = setTimeout(() => {
        // Part 2: Generate MANY more characters to fill screen (200 chars)
        const part2Chars = Array.from({ length: 200 }, (_, i) => ({
          id: i + 30,
          char: Math.random() > 0.5 ? '1' : '0',
          left: `${Math.random() * 100}%`,
          top: `${-10 - Math.random() * 30}%`,
          delay: Math.random() * 0.2,
          duration: 1.5 + Math.random()
        }));
        
        setChars(prev => [...prev, ...part2Chars]);
        setPhase('part2');
        
        // Switch the mode now so new screen loads in background
        onModeSwitch();
      }, 800);

      // After 1600ms, move to Part 3
      const part3Timer = setTimeout(() => {
        setPhase('part3');
      }, 1600);

      // Complete the transition after 2800ms total
      const completeTimer = setTimeout(() => {
        onComplete();
        setChars([]);
        setPhase('part1');
      }, 2800);

      return () => {
        clearTimeout(part2Timer);
        clearTimeout(part3Timer);
        clearTimeout(completeTimer);
      };
    }
  }, [isVisible, onComplete, onModeSwitch]);

  if (!isVisible) return null;

  return (
    <>
      {/* Black background overlay */}
      <motion.div
        className="fixed inset-0 bg-black z-40"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase === 'part1' ? 0.8 : 
                  phase === 'part2' ? 1 : 
                  0
        }}
        transition={{ 
          duration: phase === 'part3' ? 1.2 : 0.8,
          ease: 'easeInOut' 
        }}
        data-testid="matrix-overlay"
      />

      {/* Matrix characters */}
      <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {chars.map((char) => (
            <motion.div
              key={char.id}
              className="absolute text-matrix-green font-mono text-lg"
              style={{ left: char.left }}
              initial={{ 
                top: char.top,
                opacity: 0 
              }}
              animate={{ 
                top: '110%',
                opacity: phase === 'part1' ? 0.7 :
                        phase === 'part2' ? 1 :
                        0
              }}
              transition={{
                top: {
                  duration: char.duration,
                  delay: char.delay,
                  ease: 'linear'
                },
                opacity: {
                  duration: phase === 'part3' ? 1 : 0.4,
                  ease: 'easeOut'
                }
              }}
            >
              {char.char}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};