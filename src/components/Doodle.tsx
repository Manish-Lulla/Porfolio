import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface DoodleProps {
  type: 'star' | 'spiral' | 'arrow' | 'rocket' | 'heart' | 'scribble' | 'smile' | 'coffee';
  className?: string;
  color?: string;
}

export const Doodle: React.FC<DoodleProps> = ({ type, className, color = 'currentColor' }) => {
  const getPath = () => {
    switch (type) {
      case 'star':
        return "M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z";
      case 'spiral':
        return "M12 12c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2";
      case 'arrow':
        return "M3 12h18m-6-6l6 6-6 6";
      case 'rocket':
        return "M12 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z M12 18v4 M9 20h6";
      case 'heart':
        return "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
      case 'scribble':
        return "M2 12s2-4 5-4 5 4 8 4 5-4 8-4";
      case 'smile':
        return "M12 15c2 0 4-1 4-3 M8 9h.01 M16 9h.01";
      case 'coffee':
        return "M5 8h12v7c0 3-2 5-6 5s-6-2-6-5V8z M17 10h2c1 0 2 1 2 2s-1 2-2 2h-2";
      default:
        return "";
    }
  };

  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-6 h-6 select-none pointer-events-none", className)}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <motion.path d={getPath()} />
    </motion.svg>
  );
};
