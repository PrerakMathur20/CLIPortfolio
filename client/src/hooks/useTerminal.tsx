import { useState, useCallback } from 'react';
import { portfolioData, achievements, positions, openSourceContributions } from '../data/portfolioData';

export interface TerminalState {
  currentPath: string;
  history: string[];
  historyIndex: number;
  output: Array<{ text: string; isCommand?: boolean; isError?: boolean }>;
}

export const useTerminal = () => {
  const [state, setState] = useState<TerminalState>({
    currentPath: '',
    history: [],
    historyIndex: -1,
    output: [
      { text: "Welcome to Prerak's Portfolio Terminal!" },
      { text: "Type 'help' for available commands." },
      { text: '' }
    ]
  });

  const addToOutput = useCallback((text: string, isCommand = false, isError = false) => {
    setState(prev => ({
      ...prev,
      output: [...prev.output, { text, isCommand, isError }]
    }));
  }, []);

  const updatePath = useCallback((newPath: string) => {
    setState(prev => ({ ...prev, currentPath: newPath }));
  }, []);

  const addToHistory = useCallback((command: string) => {
    setState(prev => ({
      ...prev,
      history: [...prev.history, command],
      historyIndex: prev.history.length + 1
    }));
  }, []);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    setState(prev => {
      if (direction === 'up' && prev.historyIndex > 0) {
        return { ...prev, historyIndex: prev.historyIndex - 1 };
      } else if (direction === 'down' && prev.historyIndex < prev.history.length) {
        return { ...prev, historyIndex: prev.historyIndex + 1 };
      }
      return prev;
    });
  }, []);

  const clearOutput = useCallback(() => {
    setState(prev => ({ ...prev, output: [] }));
  }, []);

  const commands = {
    help: () => {
      return [
        'Available commands:',
        '  cd [directory]    - Change directory',
        '  ls               - List directories/files',
        '  pwd              - Print working directory',
        '  clear            - Clear terminal',
        '  help             - Show this help message',
        '  whoami           - Display information about me',
        '',
        'Available directories:',
        '  career           - Professional experience',
        '  projects         - Personal and professional projects',
        '  education        - Educational background',
        '  skills           - Technical skills and certifications',
        '  contact          - Contact information',
        '  achievements     - Awards and recognition',
        '  contributions    - Open source contributions'
      ];
    },

    ls: () => {
      const currentDir = state.currentPath;
      
      if (currentDir === '') {
        return ['career/', 'projects/', 'education/', 'skills/', 'contact/', 'achievements/', 'contributions/'];
      } else if (currentDir === '/career') {
        return ['walmart/', 'zeko/', '../'];
      } else if (currentDir === '/projects') {
        return portfolioData.projects.items.map(p => p.name.toLowerCase().replace(/\s+/g, '-') + '/').concat(['../']);
      } else {
        return ['../'];
      }
    },

    pwd: () => {
      return [`/home/prerak${state.currentPath}`];
    },

    clear: () => {
      clearOutput();
      return [];
    },

    whoami: () => {
      return [
        'Prerak Mathur',
        'Software Development Engineer II @ Walmart Global Tech',
        'B.Tech IT from IIIT Lucknow (CGPA: 8.6/10.0)',
        'Email: mathur.prerak@gmail.com',
        'Phone: +91 967 261 4863',
        'Website: prerak.tech',
        'GitHub: PrerakMathur20'
      ];
    }
  };

  const handleCdCommand = useCallback((args: string[]) => {
    if (args.length === 0) {
      updatePath('');
      return ['Changed to home directory'];
    }

    const target = args[0].toLowerCase();
    const currentDir = state.currentPath;

    if (target === '..' || target === '../') {
      if (currentDir === '') {
        return ['Already at root directory'];
      }
      const pathParts = currentDir.split('/').filter(p => p !== '');
      pathParts.pop();
      const newPath = pathParts.length > 0 ? '/' + pathParts.join('/') : '';
      updatePath(newPath);
      return [`Changed to ${newPath || 'home'} directory`];
    }

    if (currentDir === '') {
      const validDirs = ['career', 'projects', 'education', 'skills', 'contact', 'achievements', 'contributions'];
      if (validDirs.includes(target)) {
        updatePath(`/${target}`);
        return [`Changed to /${target} directory`];
      } else {
        return [`Directory not found: ${target}`, 'Use "ls" to see available directories'];
      }
    } else if (currentDir === '/career') {
      if (target === 'walmart') {
        updatePath('/career/walmart');
        return ['Changed to /career/walmart directory'];
      } else {
        return [`Directory not found: ${target}`, 'Available: walmart'];
      }
    } else if (currentDir === '/projects') {
      const projectNames = portfolioData.projects.items.map(p => 
        p.name.toLowerCase().replace(/\s+/g, '-')
      );
      if (projectNames.includes(target)) {
        updatePath(`/projects/${target}`);
        return [`Changed to /projects/${target} directory`];
      } else {
        return [`Project not found: ${target}`, `Available: ${projectNames.join(', ')}`];
      }
    } else {
      return [`Cannot navigate further from ${currentDir}`];
    }
  }, [state.currentPath, updatePath]);

  const executeCommand = useCallback((input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return { output: [], path: state.currentPath };

    addToHistory(trimmedInput);
    addToOutput(`prerak@portfolio:~${state.currentPath}$ ${trimmedInput}`, true);

    const parts = trimmedInput.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let result: string[] = [];

    if (command === 'cd') {
      result = handleCdCommand(args);
    } else if (commands[command as keyof typeof commands]) {
      result = commands[command as keyof typeof commands]();
    } else {
      result = [`Command not found: ${command}`, 'Type "help" for available commands'];
      addToOutput(result[0], false, true);
      if (result[1]) addToOutput(result[1], false, true);
      return { output: state.output, path: state.currentPath };
    }

    result.forEach(line => {
      if (line) addToOutput(line);
    });

    return { output: state.output, path: state.currentPath };
  }, [state, addToHistory, addToOutput, handleCdCommand]);

  const getSuggestions = useCallback((input: string) => {
    const parts = input.trim().split(' ');
    const command = parts[0].toLowerCase();
    
    if (parts.length === 1) {
      const commandNames = Object.keys(commands);
      return commandNames.filter(cmd => cmd.startsWith(input.toLowerCase()));
    } else if (command === 'cd' && parts.length === 2) {
      const currentDir = state.currentPath;
      let dirs: string[] = [];
      
      if (currentDir === '') {
        dirs = ['career', 'projects', 'education', 'skills', 'contact', 'achievements', 'contributions'];
      } else if (currentDir === '/career') {
        dirs = ['walmart', '..'];
      } else if (currentDir === '/projects') {
        dirs = portfolioData.projects.items.map(p => 
          p.name.toLowerCase().replace(/\s+/g, '-')
        ).concat(['..']);
      } else {
        dirs = ['..'];
      }
      
      return dirs.filter(dir => dir.startsWith(parts[1].toLowerCase()));
    }
    
    return [];
  }, [state.currentPath]);

  const getHistoryCommand = useCallback((index: number) => {
    if (index >= 0 && index < state.history.length) {
      return state.history[index];
    }
    return '';
  }, [state.history]);

  return {
    state,
    executeCommand,
    getSuggestions,
    navigateHistory,
    getHistoryCommand,
    clearOutput
  };
};
