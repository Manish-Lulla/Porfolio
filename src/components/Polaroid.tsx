import React from 'react';
import { motion } from 'motion/react';
import { RoughBox } from './RoughBox';
import { cn } from '../lib/utils';

interface PolaroidProps {
  children?: React.ReactNode;
  imageUrl?: string;
  caption?: string;
  rotation?: number;
  className?: string;
  tape?: boolean;
}

export const Polaroid: React.FC<PolaroidProps> = ({
  children,
  imageUrl,
  caption,
  rotation = 0,
  className,
  tape = true
}) => {
  return (
    <motion.div
      whileHover={{ y: -10, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={cn(
        "relative p-4 pb-12 shadow-xl",
        "bg-white dark:bg-chalk",
        className
      )}
      style={{ rotate: rotation }}
    >
      {/* Tape graphics */}
      {tape && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-8 bg-gray-200/60 dark:bg-gray-700/40 rotate-3 z-20 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-6 bg-gray-300/50 dark:bg-gray-600/40 -rotate-2 z-20 pointer-events-none" />
        </>
      )}

      {/* Main image area */}
      <RoughBox
        strokeWidth={1}
        roughness={0.5}
        className="aspect-square bg-gray-100 dark:bg-gray-200 overflow-hidden"
      >
        {imageUrl ? (
          <img src={imageUrl} alt={caption} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-hand text-4xl text-gray-300 dark:text-gray-500">
            {children}
          </div>
        )}
      </RoughBox>

      {/* Caption */}
      {caption && (
        <div className="absolute bottom-4 left-0 right-0 text-center font-hand text-xl px-2 text-gray-900">
          {caption}
        </div>
      )}
    </motion.div>
  );
};