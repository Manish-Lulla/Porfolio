import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cursor } from './components/Cursor';
import { ThemeToggle } from './components/ThemeToggle';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Journey } from './sections/Journey';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { DoodleCanvas } from './components/DoodleCanvas';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const touchDevice = window.matchMedia('(hover: none) and (pointer: coarse)');
    const update = () => setIsDesktop(!touchDevice.matches);
    update();
    touchDevice.addEventListener('change', update);
    return () => touchDevice.removeEventListener('change', update);
  }, []);

  return isDesktop;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors duration-300 relative selection:bg-marker-yellow selection:text-ink overflow-x-hidden custom-cursor">
      <div className="paper-texture" />

      {isDesktop && <Cursor />}
      <Navbar />
      <ThemeToggle />
      {isDesktop && <DoodleCanvas />}

      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-paper dark:bg-chalkboard flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-hand mb-6 sm:mb-8"
              initial={{ width: 0, overflow: 'hidden' }}
              animate={{ width: 'auto' }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              Opening Notebook<span className="animate-pulse">...</span>
            </motion.h1>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-3xl sm:text-4xl"
            >
              o
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects" className="bg-paper/30 dark:bg-black/10"><Projects /></section>
        <section id="journey"><Journey /></section>
        <section id="contact"><Contact /></section>
        <Footer />
      </main>

      <div className="coffee-stain top-[15%] left-[5%] opacity-20 rotate-12 hidden sm:block" />
      <div className="coffee-stain top-[45%] right-[5%] opacity-10 -rotate-45 hidden sm:block" />
      <div className="coffee-stain bottom-[10%] left-[8%] opacity-15 rotate-180 hidden sm:block" />
    </div>
  );
}
