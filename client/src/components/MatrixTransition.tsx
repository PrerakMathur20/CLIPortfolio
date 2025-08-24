import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MatrixTransitionProps {
  isVisible: boolean;
  onComplete: () => void;
  onModeSwitch: () => void;
}

export const MatrixTransition: React.FC<MatrixTransitionProps> = ({ isVisible, onComplete, onModeSwitch }) => {
  const [chars, setChars] = useState<Array<{ id: number; char: string; left: string; delay: number; speed: number }>>([]);
  const [phase, setPhase] = useState<'overlay' | 'intensify' | 'fadeOut'>('overlay');

  useEffect(() => {
    if (isVisible) {
      // Generate falling matrix characters
      const newChars = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        char: Math.random() > 0.5 ? '1' : '0',
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 0.4,
        speed: Math.random() * 2 + 1.5
      }));
      setChars(newChars);

      // Phase 1: Matrix overlays current screen (800ms)
      setPhase('overlay');
      
      const phase1Timer = setTimeout(() => {
        // Phase 2: Screen disappears, matrix intensifies (700ms)
        setPhase('intensify');
        onModeSwitch(); // Switch mode during intensify phase
      }, 800);

      const phase2Timer = setTimeout(() => {
        // Phase 3: New screen appears, matrix fades out (1000ms)
        setPhase('fadeOut');
      }, 1500);

      const completeTimer = setTimeout(() => {
        onComplete();
        setChars([]);
        setPhase('overlay');
      }, 2500);

      return () => {
        clearTimeout(phase1Timer);
        clearTimeout(phase2Timer);
        clearTimeout(completeTimer);
      };
    }
  }, [isVisible, onComplete, onModeSwitch]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
      data-testid="matrix-transition"
    >
      {/* Background overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase === 'overlay' ? 0 : phase === 'intensify' ? 1 : 0.2
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />

      {/* Matrix rain */}
      {chars.map((char) => (
        <motion.div
          key={char.id}
          className="absolute text-matrix-green font-mono text-sm"
          style={{ left: char.left }}
          initial={{ y: '-10vh', opacity: 0 }}
          animate={{ 
            y: '110vh',
            opacity: phase === 'overlay' ? 0.6 : 
                    phase === 'intensify' ? 0.9 : 
                    0
          }}
          transition={{
            y: {
              duration: char.speed,
              delay: char.delay,
              ease: 'linear',
              repeat: Infinity
            },
            opacity: {
              duration: phase === 'fadeOut' ? 1.0 : 0.6,
              ease: phase === 'fadeOut' ? 'easeOut' : 'easeIn'
            }
          }}
        >
          {char.char}
        </motion.div>
      ))}
    </motion.div>
  );
};
