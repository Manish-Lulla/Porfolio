import React from 'react';
import { Doodle } from '../components/Doodle';

export const Footer = () => {
  return (
    <footer className="relative mt-24">
      {/* Final Sign-off */}
      <div className="flex flex-col items-center mb-16 relative px-4 text-center">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="font-hand text-4xl md:text-5xl dark:text-chalk">
              Thanks for stopping by!
            </h2>
            <p className="font-hand text-2xl dark:text-gray-400">
              Peace out! ✌️
            </p>
            <div className="pt-4">
              <Doodle type="arrow" className="w-16 h-16 rotate-90 mx-auto text-marker-teal opacity-50" />
            </div>
          </div>
      </div>

      {/* Torn edge effect */}
      <div className="h-8 w-full bg-paper dark:bg-chalkboard" style={{ clipPath: 'polygon(0% 100%, 5% 70%, 10% 100%, 15% 80%, 20% 100%, 25% 75%, 30% 100%, 35% 85%, 40% 100%, 45% 70%, 50% 100%, 55% 80%, 60% 100%, 65% 75%, 70% 100%, 75% 85%, 80% 100%, 85% 70%, 90% 100%, 95% 80%, 100% 100%, 100% 0%, 0% 0%)' }} />
      
      <div className="py-12 bg-gray-100 dark:bg-gray-900 border-t-2 border-dashed border-gray-300 dark:border-gray-700">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 px-6 text-center">
          <div className="flex gap-12 text-gray-400 dark:text-gray-600">
             <Doodle type="coffee" className="w-12 h-12" />
             <Doodle type="smile" className="w-12 h-12" />
             <Doodle type="spiral" className="w-12 h-12" />
          </div>
          
          <div>
            <p className="font-hand text-2xl dark:text-chalk">
              © 2026 Manish Lulla — drawn with coffee and too many late nights
            </p>
            <p className="font-note text-lg text-gray-500 dark:text-gray-400 mt-2">
              built with React, Tailwind, Framer Motion & rough.js
            </p>
          </div>
          
          <div className="flex gap-4">
             <a href="https://github.com/Manish-Lulla" target="_blank" rel="noreferrer" className="font-flair text-sm hover:text-marker-red transition-colors dark:text-chalk opacity-50 hover:opacity-100">github</a>
             <a href="mailto:manisshh.ml@gmail.com" className="font-flair text-sm hover:text-marker-red transition-colors dark:text-chalk opacity-50 hover:opacity-100">email</a>
             <span className="font-flair text-sm dark:text-chalk opacity-30">Ulhasnagar, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};