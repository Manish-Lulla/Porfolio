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

    const draw = () => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      svg.setAttribute('width', width.toString());
      svg.setAttribute('height', height.toString());
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

      const isSmall = width < 200 || height < 60;
      const effectiveRoughness = isSmall ? Math.min(roughness, 1) : roughness;
      const effectiveBowing = isSmall ? Math.min(bowing, 1) : bowing;

      const options = {
        stroke: color,
        strokeWidth,
        roughness: effectiveRoughness,
        bowing: effectiveBowing,
        fill,
        fillStyle,
      };

      const pad = 4;
      let node: SVGElement;
      if (type === 'rectangle') {
        node = rc.rectangle(pad, pad, Math.max(width - pad * 2, 1), Math.max(height - pad * 2, 1), options);
      } else if (type === 'circle') {
        node = rc.ellipse(width / 2, height / 2, Math.max(width - pad * 2, 1), Math.max(height - pad * 2, 1), options);
      } else {
        node = rc.line(0, height / 2, width, height / 2, options);
      }
      svg.appendChild(node);
    };

    draw();

    const ro = new ResizeObserver(draw);
    ro.observe(container);
    return () => ro.disconnect();
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
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: -1, overflow: 'hidden' }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};