import React from 'react';
import { motion } from 'motion/react';
import { RoughBox } from './RoughBox';
import { cn } from '../lib/utils';

interface StickyNoteProps {
  children: React.ReactNode;
  color?: 'yellow' | 'teal' | 'red' | 'blue';
  rotation?: number;
  className?: string;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  children,
  color = 'yellow',
  rotation = 0,
  className
}) => {
  const colors = {
    yellow: 'bg-marker-yellow/30 dark:bg-chalk-yellow/15',
    teal: 'bg-marker-teal/25 dark:bg-chalk-teal/15',
    red: 'bg-marker-red/25 dark:bg-chalk-red/15',
    blue: 'bg-blue-200/40 dark:bg-blue-900/15'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: rotation + (rotation > 0 ? 2 : -2) }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      style={{ rotate: rotation }}
      className={cn("relative min-w-[140px] aspect-square shadow-lg", colors[color], className)}
    >
      {/* Rough border drawn on top of the colored background */}
      <div className="absolute inset-0 pointer-events-none">
        <RoughBox
          strokeWidth={1}
          roughness={1}
          className="w-full h-full"
        />
      </div>
      
      {/* Content centered inside */}
      <div className="relative w-full h-full p-4 flex flex-col items-center justify-center text-center font-note text-lg md:text-xl font-bold dark:text-chalk">
        {children}
      </div>
    </motion.div>
  );
};