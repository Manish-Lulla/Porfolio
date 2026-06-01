import React, { useState } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { useInView } from 'motion/react';
import { Doodle } from './Doodle';
import { cn } from '../lib/utils';

interface SectionHeadingProps {
  children: React.ReactNode;
  doodle?: 'star' | 'spiral' | 'arrow' | 'rocket' | 'heart' | 'scribble' | 'smile' | 'coffee';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children, doodle, className }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={cn("flex items-center gap-4 mb-12", className)}>
      <h2 className="text-4xl md:text-5xl font-hand dark:text-chalk">
        <RoughNotation
          type="highlight"
          show={isInView}
          color="rgba(255, 217, 61, 0.3)"
          strokeWidth={6}
          animationDuration={1500}
        >
          {children}
        </RoughNotation>
      </h2>
      {doodle && (
        <Doodle 
          type={doodle} 
          className="w-10 h-10 text-marker-red dark:text-chalk-red animate-pulse" 
        />
      )}
    </div>
  );
};
