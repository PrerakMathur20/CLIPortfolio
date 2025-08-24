import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MatrixTransitionProps {
  isVisible: boolean;
  onComplete: () => void;
  onMidpoint: () => void;
}

export const MatrixTransition: React.FC<MatrixTransitionProps> = ({ isVisible, onComplete, onMidpoint }) => {
  const [chars, setChars] = useState<Array<{ id: number; char: string; left: string; delay: number; speed: number }>>([]);
  const [phase, setPhase] = useState<'fadeOut' | 'matrix' | 'fadeIn'>('fadeOut');

  useEffect(() => {
    if (isVisible) {
      // Generate falling matrix characters
      const newChars = Array.from({ length: 120 }, (_, i) => ({
        id: i,
        char: Math.random() > 0.5 ? '1' : '0',
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 0.3,
        speed: Math.random() * 1.5 + 1.5
      }));
      setChars(newChars);

      // Phase 1: Current UI fades out (600ms)
      setPhase('fadeOut');
      
      const phase1Timer = setTimeout(() => {
        // Phase 2: Full matrix rain (1000ms)
        setPhase('matrix');
        onMidpoint(); // Switch the mode during the matrix phase
      }, 600);

      const phase2Timer = setTimeout(() => {
        // Phase 3: Matrix fades while new UI appears (800ms)
        setPhase('fadeIn');
      }, 1600);

      const completeTimer = setTimeout(() => {
        onComplete();
        setChars([]);
        setPhase('fadeOut');
      }, 2400);

      return () => {
        clearTimeout(phase1Timer);
        clearTimeout(phase2Timer);
        clearTimeout(completeTimer);
      };
    }
  }, [isVisible, onComplete, onMidpoint]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
      data-testid="matrix-transition"
    >
      {/* Black background overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase === 'fadeOut' ? 0.7 : phase === 'matrix' ? 1 : 0.3
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Matrix rain */}
      <AnimatePresence>
        {chars.map((char) => (
          <motion.div
            key={char.id}
            className="absolute text-matrix-green font-mono text-sm"
            style={{ left: char.left }}
            initial={{ y: '-10vh', opacity: 0 }}
            animate={{ 
              y: '110vh',
              opacity: phase === 'fadeOut' ? [0, 0.8, 0.8] : 
                      phase === 'matrix' ? 0.9 : 
                      [0.9, 0.6, 0]
            }}
            transition={{
              duration: char.speed + (phase === 'fadeIn' ? 0.5 : 0),
              delay: char.delay,
              ease: 'linear',
              opacity: { 
                duration: phase === 'fadeIn' ? 1.2 : 0.8,
                ease: 'easeOut'
              }
            }}
          >
            {char.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
