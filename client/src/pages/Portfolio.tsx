import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CLIMode } from '../components/CLIMode';
import { PortfolioGUI } from '../components/PortfolioGUI';
import { MatrixTransition } from '../components/MatrixTransition';

export default function Portfolio() {
  const [mode, setMode] = useState<'cli' | 'gui'>('cli');
  const [displayMode, setDisplayMode] = useState<'cli' | 'gui'>('cli');
  const [showTransition, setShowTransition] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  const switchMode = (newMode: 'cli' | 'gui') => {
    if (newMode === mode) return;
    
    setShowTransition(true);
  };

  const handleTransitionMidpoint = () => {
    // Switch the actual mode during the matrix phase
    setMode(mode === 'cli' ? 'gui' : 'cli');
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setDisplayMode(mode);
  };

  const handlePathChange = (path: string) => {
    setCurrentPath(path);
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Mode Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <div className="bg-gray-900 rounded-full p-1 border border-gray-700">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => switchMode('cli')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                mode === 'cli'
                  ? 'text-matrix-green bg-gray-800'
                  : 'text-gray-400 hover:text-white'
              }`}
              data-testid="cli-toggle"
            >
              <i className="fas fa-terminal mr-2"></i>CLI
            </button>
            <button
              onClick={() => switchMode('gui')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                mode === 'gui'
                  ? 'text-matrix-green bg-gray-800'
                  : 'text-gray-400 hover:text-white'
              }`}
              data-testid="gui-toggle"
            >
              <i className="fas fa-desktop mr-2"></i>GUI
            </button>
          </div>
        </div>
      </div>

      {/* Matrix Transition */}
      <MatrixTransition 
        isVisible={showTransition} 
        onComplete={handleTransitionComplete}
        onMidpoint={handleTransitionMidpoint}
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {displayMode === 'cli' ? (
          <motion.div
            key="cli"
            initial={{ opacity: showTransition ? 1 : 0 }}
            animate={{ opacity: showTransition ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: showTransition ? 0.8 : 0.6, ease: 'easeInOut' }}
          >
            <CLIMode currentPath={currentPath} onPathChange={handlePathChange} />
          </motion.div>
        ) : (
          <motion.div
            key="gui"
            initial={{ opacity: showTransition ? 1 : 0 }}
            animate={{ opacity: showTransition ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: showTransition ? 0.8 : 0.6, ease: 'easeInOut' }}
          >
            <PortfolioGUI />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
