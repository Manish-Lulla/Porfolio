import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { RoughBox } from './RoughBox';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  const colors = ['#E63946', '#2A9D8F', '#457B9D', '#FFD93D'];

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] hidden md:block">
        <RoughBox
          className="px-10 py-3 bg-paper/90 dark:bg-chalkboard/90 backdrop-blur-md shadow-xl"
          roughness={1.5}
          bowing={2}
        >
          <div className="flex gap-12 items-center">
            {links.map((link, idx) => {
              const color = colors[idx % colors.length];
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
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

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="md:hidden fixed top-4 left-4 z-[80] p-2 hover:scale-110 active:scale-95 transition-transform bg-paper/80 dark:bg-chalkboard/80 backdrop-blur-sm rounded-full"
      >
        <RoughBox
          type="circle"
          className="w-11 h-11 flex items-center justify-center bg-paper dark:bg-chalkboard"
          roughness={2}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="w-5 h-5 text-ink dark:text-chalk" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <Menu className="w-5 h-5 text-ink dark:text-chalk" />
              </motion.div>
            )}
          </AnimatePresence>
        </RoughBox>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-[70] bg-paper/95 dark:bg-chalkboard/95 backdrop-blur-md flex items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {links.map((link, idx) => {
                const color = colors[idx % colors.length];
                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleNavClick(link.id)}
                    className="font-hand text-5xl dark:text-chalk relative inline-block"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-3 w-full" style={{ backgroundColor: color, opacity: 0.3 }} />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};