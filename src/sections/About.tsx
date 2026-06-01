import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { StickyNote } from '../components/StickyNote';
import { Doodle } from '../components/Doodle';

export const About = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <SectionHeading doodle="smile">About Me</SectionHeading>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-300"
        >
          <p>
            I'm a recent B.E. IT graduate from Thadomal Shahani Engineering College. I like building things — and I'm not picky about what.
          </p>
          <p>
            Some weeks it's a React frontend, some weeks it's a Python scraper, some weeks it's a full-stack app with an AI model bolted on. I care about details: hover states, error toasts, the way a chart animates in, the way an API responds. The small stuff is the whole job.
          </p>
          <p className="text-lg md:text-xl">
            As a fresher, my biggest strength is range — I've worked across frontend, backend, data, AI, testing, and even browser extensions. I learn fast, I ship often, and I'm looking for a team where I can keep doing both.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:gap-8 relative p-4 md:p-12">
          <StickyNote rotation={-8} color="yellow" className="translate-y-4 md:translate-y-8">
            <span className="text-3xl block">7.01</span>
            <span className="text-sm">CGPA (B.E. IT)</span>
          </StickyNote>
          <StickyNote rotation={6} color="teal" className="-translate-y-2 md:-translate-y-4">
            <span className="text-3xl block">5+</span>
            <span className="text-sm">projects built</span>
          </StickyNote>
          <StickyNote rotation={12} color="red" className="translate-x-4 md:translate-x-8">
            <span className="text-3xl block">6+</span>
            <span className="text-sm">domains explored</span>
          </StickyNote>
          <StickyNote rotation={-4} color="blue" className="-translate-x-2 md:-translate-x-4">
            <span className="text-3xl block">2026</span>
            <span className="text-sm">grad</span>
          </StickyNote>
          
          <div className="absolute -bottom-20 left-0 md:-left-12 max-w-[250px]">
             <Doodle type="arrow" className="w-12 h-12 rotate-[-150deg] text-marker-teal" />
             <span className="font-hand text-lg dark:text-chalk leading-tight block ml-4">
                full stack, AI, data, and automation — I build it all.
             </span>
          </div>
        </div>
      </div>
    </section>
  );
};