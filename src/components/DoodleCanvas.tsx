import React, { useEffect, useRef, useState } from 'react';

export const DoodleCanvas: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to exit
      if (e.key === 'Escape' && isActive) {
        setIsActive(false);
        return;
      }

      const nextKonami = [...konami, e.key.toLowerCase()].slice(-4);
      setKonami(nextKonami);
      if (nextKonami.join('') === 'draw') {
        setIsActive(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami, isActive]);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    return () => window.removeEventListener('resize', resize);
  }, [isActive]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.documentElement.classList.contains('dark') ? '#F5F5DC' : '#1A1A1A';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100] cursor-crosshair">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
        className="w-full h-full"
      />
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-paper dark:bg-chalkboard p-4 border-2 border-ink dark:border-chalk rounded-lg shadow-xl font-note pointer-events-none">
        go ahead, sign the page ✏️ (press ESC to exit)
      </div>
      <button 
        onClick={() => setIsActive(false)}
        className="fixed bottom-4 right-4 bg-marker-red text-white px-4 py-2 font-hand rounded-full z-[101]"
      >
        Clear & Close
      </button>
    </div>
  );
};