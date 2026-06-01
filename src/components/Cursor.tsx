import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const Cursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const pointsRef = useRef<{ x: number, y: number, age: number }[]>([]);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    let animationFrame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const points = pointsRef.current;
      const nextPoints = points
        .map(p => ({ ...p, age: p.age + 1 }))
        .filter(p => p.age < 20);
      
      if (nextPoints.length > 1) {
        for (let i = 1; i < nextPoints.length; i++) {
          const opacity = (20 - nextPoints[i].age) / 20;
          ctx.beginPath();
          ctx.moveTo(nextPoints[i-1].x, nextPoints[i-1].y);
          ctx.strokeStyle = document.documentElement.classList.contains('dark') 
            ? `rgba(245, 245, 220, ${opacity * 0.3})` 
            : `rgba(26, 26, 26, ${opacity * 0.2})`;
          ctx.lineWidth = 2 * opacity;
          ctx.lineCap = 'round';
          ctx.lineTo(nextPoints[i].x, nextPoints[i].y);
          ctx.stroke();
        }
      }
      
      pointsRef.current = nextPoints;
      animationFrame = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />
      <motion.div
        className="pencil-cursor flex items-center justify-center pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ink dark:text-chalk">
          <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 13L16.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 22L12 19L19 12L2 22Z" fill="currentColor" opacity="0.3"/>
          <path d="M2 22L5 12L12 19L2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </>
  );
};
