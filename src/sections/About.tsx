import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { StickyNote } from '../components/StickyNote';
import { Doodle } from '../components/Doodle';

export const About = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative overflow-hidden">
      <SectionHeading doodle="smile">About Me</SectionHeading>

      <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-5 sm:space-y-6 text-base sm:text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-300"
        >
          <p>
            I am a recent B.E. IT graduate from Thadomal Shahani Engineering College. I like building things and I am not picky about what.
          </p>
          <p>
            Some weeks it is a React frontend, some weeks it is a Python scraper, some weeks it is a full-stack app with an AI model bolted on. I care about details: hover states, error toasts, the way a chart animates in, the way an API responds. The small stuff is the whole job.
          </p>
          <p className="text-sm sm:text-lg md:text-xl">
            As a fresher, my biggest strength is range. I have worked across frontend, backend, data, AI, testing, and even browser extensions. I learn fast, I ship often, and I am looking for a team where I can keep doing both.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 relative p-2 sm:p-4 md:p-12">
          <StickyNote rotation={-4} color="yellow" className="md:translate-y-8">
            <span className="text-2xl sm:text-3xl block">7.01</span>
            <span className="text-xs sm:text-sm">CGPA (B.E. IT)</span>
          </StickyNote>
          <StickyNote rotation={3} color="teal" className="md:-translate-y-4">
            <span className="text-2xl sm:text-3xl block">5+</span>
            <span className="text-xs sm:text-sm">projects built</span>
          </StickyNote>
          <StickyNote rotation={4} color="red" className="md:translate-x-8">
            <span className="text-2xl sm:text-3xl block">6+</span>
            <span className="text-xs sm:text-sm">domains explored</span>
          </StickyNote>
          <StickyNote rotation={-2} color="blue" className="md:-translate-x-4">
            <span className="text-2xl sm:text-3xl block">2026</span>
            <span className="text-xs sm:text-sm">grad</span>
          </StickyNote>

          <div className="col-span-2 mt-4 md:absolute md:-bottom-20 md:left-0 md:mt-0 max-w-[250px] flex items-center gap-2">
            <Doodle type="arrow" className="w-10 h-10 rotate-[-150deg] text-marker-teal flex-shrink-0" />
            <span className="font-hand text-sm sm:text-lg dark:text-chalk leading-tight">
              full stack, AI, data, and automation. I build it all.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};