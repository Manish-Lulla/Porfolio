import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RoughBox } from '../components/RoughBox';
import { Doodle } from '../components/Doodle';
import { Polaroid } from '../components/Polaroid';
import { StickyNote } from '../components/StickyNote';

const phrases = [
  "I build web apps.",
  "I work with data.",
  "I tinker with AI.",
  "I write tests. Sometimes.",
  "I turn coffee into commits."
];

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const fullText = phrases[index % phrases.length];
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setIndex(index + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, typingSpeed]);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-24 relative">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE - Text Content */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="space-y-8 z-10"
        >
          <div className="flex items-center gap-2">
            <RoughBox type="circle" className="w-3 h-3 bg-green-500 animate-pulse" />
            <span className="font-hand text-xl dark:text-chalk">recently graduated · available for full-time roles</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-hand leading-tight dark:text-chalk">
            Hi, I'm <span className="text-marker-red dark:text-chalk-red">Manish</span>
            <span className="inline-block w-2.5 h-2.5 md:w-4 md:h-4 rounded-full bg-ink dark:bg-chalk ml-2 md:ml-3 transition-all hover:scale-150" />
          </h1>

          <div className="h-12">
            <span className="font-mono text-xl md:text-2xl text-gray-600 dark:text-gray-400">
              {text}
              <span className="animate-blink">|</span>
            </span>
          </div>

          <p className="text-lg md:text-xl font-sans max-w-xl dark:text-gray-300 leading-relaxed opacity-90">
            I'm a recent B.E. IT graduate from Mumbai. I build across the stack — frontend, backend, data, AI, browser extensions — basically whatever the idea needs. Always learning, always shipping.
          </p>

          <div className="flex flex-wrap items-center pt-4 gap-8 pl-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="mr-4"
            >
              <RoughBox 
                fill="rgba(230, 57, 70, 0.15)" 
                className="px-8 py-4 font-bold text-lg text-marker-red dark:text-chalk-red"
                color="#E63946"
                strokeWidth={3}
              >
                See what I've built →
              </RoughBox>
            </motion.button>
            
            <motion.a
              href="/Manish_Lulla_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4"
            >
              <RoughBox 
                fill="rgba(42, 157, 143, 0.15)" 
                className="px-8 py-4 font-bold text-lg text-marker-teal dark:text-chalk-teal"
                color="#2A9D8F"
                strokeWidth={3}
              >
                View my resume →
              </RoughBox>
            </motion.a>
          </div>
        </motion.div>

        {/* RIGHT SIDE - Profile Polaroid */}
        <div className="flex justify-center md:justify-end items-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
             animate={{ opacity: 1, scale: 1, rotate: 4 }}
             transition={{ delay: 0.5, duration: 0.8 }}
             className="relative group"
          >
            <Polaroid 
              caption="that's me 👋" 
              imageUrl="/Profile.png"
              className="w-64 md:w-72 shadow-2xl"
            />
            
            <div className="absolute -top-10 -right-12 md:-right-16 z-20">
              <StickyNote rotation={-8} color="teal" className="p-3 w-36 aspect-video text-xs h-auto">
                Exams done, awaiting results
              </StickyNote>
            </div>

            <Doodle type="rocket" className="absolute -bottom-10 -right-8 w-14 h-14 text-marker-teal opacity-50" />
            <Doodle type="spiral" className="absolute -top-12 -left-12 w-16 h-16 text-marker-yellow opacity-30" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};