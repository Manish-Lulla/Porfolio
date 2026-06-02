import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RoughBox } from '../components/RoughBox';
import { Doodle } from '../components/Doodle';
import { Polaroid } from '../components/Polaroid';

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
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-24 relative">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8 z-10 order-2 md:order-1"
        >
          <div className="flex items-center gap-2">
            <RoughBox type="circle" className="w-3 h-3 bg-green-500 animate-pulse flex-shrink-0" />
            <span className="font-hand text-base sm:text-xl dark:text-chalk">
              recently graduated, available for full-time roles
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-hand leading-tight dark:text-chalk">
            Hi, I'm <span className="text-marker-red dark:text-chalk-red">Manish</span>
            <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-ink dark:bg-chalk ml-2 md:ml-3 transition-all hover:scale-150" />
          </h1>

          <div className="h-10 sm:h-12">
            <span className="font-mono text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400">
              {text}
              <span className="animate-blink">|</span>
            </span>
          </div>

          <p className="text-base sm:text-lg md:text-xl font-sans max-w-xl dark:text-gray-300 leading-relaxed opacity-90">
            I am a recent B.E. IT graduate from Mumbai. I build across the stack - frontend, backend, data, AI, browser extensions - basically whatever the idea needs. Always learning, always shipping.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center pt-2 sm:pt-4 gap-3 sm:gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto"
            >
              <RoughBox
                fill="rgba(230, 57, 70, 0.15)"
                className="px-5 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-lg text-marker-red dark:text-chalk-red text-center"
                color="#E63946"
                strokeWidth={3}
              >
                See what I have built
              </RoughBox>
            </motion.button>

            <motion.a
              href="/Manish_Lulla_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto block"
            >
              <RoughBox
                fill="rgba(42, 157, 143, 0.15)"
                className="px-5 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-lg text-marker-teal dark:text-chalk-teal text-center"
                color="#2A9D8F"
                strokeWidth={3}
              >
                View my resume
              </RoughBox>
            </motion.a>
          </div>
        </motion.div>

        <div className="flex justify-center md:justify-end items-center order-1 md:order-2 pt-8 md:pt-0 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative group"
          >
            <Polaroid
              caption="that is me"
              imageUrl="/Profile.png"
              className="w-52 sm:w-64 md:w-72 shadow-2xl"
            />

            <div className="absolute -top-6 -right-2 sm:-top-8 sm:-right-12 md:-right-16 z-20">
              <div
                className="bg-marker-teal/30 dark:bg-chalk-teal/20 px-3 py-2 sm:p-3 w-28 sm:w-36 text-[10px] sm:text-xs font-note font-bold dark:text-chalk text-center leading-tight shadow-md"
                style={{ transform: 'rotate(-8deg)' }}
              >
                Exams done, awaiting results
              </div>
            </div>

            <Doodle type="rocket" className="absolute -bottom-8 -right-6 sm:-bottom-10 sm:-right-8 w-10 h-10 sm:w-14 sm:h-14 text-marker-teal opacity-50" />
            <Doodle type="spiral" className="absolute -top-8 -left-8 sm:-top-12 sm:-left-12 w-12 h-12 sm:w-16 sm:h-16 text-marker-yellow opacity-30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};