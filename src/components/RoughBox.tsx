import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';
import { cn } from '../lib/utils';

interface RoughBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'rectangle' | 'circle' | 'line';
  color?: string;
  strokeWidth?: number;
  roughness?: number;
  bowing?: number;
  fill?: string;
  fillStyle?: 'solid' | 'hachure' | 'zigzag' | 'cross-hatch' | 'dots' | 'sunburst' | 'dashed';
  rotation?: number;
}

export const RoughBox: React.FC<RoughBoxProps> = ({
  children,
  type = 'rectangle',
  color = 'currentColor',
  strokeWidth = 2,
  roughness = 1.5,
  bowing = 1.5,
  fill,
  fillStyle = 'hachure',
  rotation = 0,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = svgRef.current;
    const container = containerRef.current;
    const rc = rough.svg(svg);
    
    // Clear previous children
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const { width, height } = container.getBoundingClientRect();
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());

    const options = {
      stroke: color,
      strokeWidth,
      roughness,
      bowing,
      fill,
      fillStyle,
    };

    let node: SVGElement;
    if (type === 'rectangle') {
      node = rc.rectangle(2, 2, width - 4, height - 4, options);
    } else if (type === 'circle') {
      node = rc.ellipse(width / 2, height / 2, width - 4, height - 4, options);
    } else {
      node = rc.line(0, height / 2, width, height / 2, options);
    }

    svg.appendChild(node);
  }, [type, color, strokeWidth, roughness, bowing, fill, fillStyle]);

  return (
    <div
      ref={containerRef}
      className={cn("relative group", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
      {...props}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 pointer-events-none overflow-visible"
        style={{ zIndex: -1 }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};