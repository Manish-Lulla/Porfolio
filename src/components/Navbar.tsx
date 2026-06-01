import React from 'react';
import { motion } from 'motion/react';
import { RoughBox } from './RoughBox';

export const Navbar = () => {
  const links = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] hidden md:block">
      <RoughBox 
        className="px-10 py-3 bg-paper/90 dark:bg-chalkboard/90 backdrop-blur-md shadow-xl"
        roughness={1.5}
        bowing={2}
      >
        <div className="flex gap-12 items-center">
          {links.map((link, idx) => {
            const colors = ['#E63946', '#2A9D8F', '#457B9D', '#FFD93D'];
            const color = colors[idx % colors.length];
            
            return (
              <button
                key={link.id}
                onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative font-hand text-xl hover:text-ink dark:text-chalk transition-colors cursor-pointer px-2"
              >
                <span className="relative z-10">{link.name}</span>
                <motion.div 
                  className="absolute -bottom-1 left-0 h-2 w-0 group-hover:w-full transition-all duration-300 -z-0"
                  style={{ backgroundColor: color, opacity: 0.4 }}
                />
              </button>
            );
          })}
        </div>
      </RoughBox>
    </nav>
  );
};