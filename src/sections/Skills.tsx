import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { RoughBox } from '../components/RoughBox';
import { SKILLS } from '../data';
import { Doodle } from '../components/Doodle';

const categories = {
  frontend: 'FRONTEND',
  backend: 'BACKEND',
  data: 'DATA & DATABASES',
  ai: 'AI / LLMs',
  testing: 'TESTING & DEVOPS',
  analytics: 'DATA VIZ & ANALYTICS',
  tools: 'TOOLS',
  languages: 'LANGUAGES I\'VE WRITTEN'
};

export const Skills = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading doodle="rocket">My Toolbox</SectionHeading>
      <p className="font-hand text-2xl mb-12 dark:text-chalk">stuff I've used to build stuff</p>

      <div className="flex flex-wrap gap-x-8 gap-y-12 justify-center">
        {Object.entries(categories).map(([key, label], catIdx) => {
          const categorySkills = SKILLS.filter(s => s.category === key);
          if (categorySkills.length === 0) return null;

          return (
            <motion.div 
              key={key} 
              initial={{ opacity: 0, rotate: catIdx % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="max-w-md p-8 bg-paper dark:bg-chalkboard/40 border-2 border-dashed border-ink/10 dark:border-chalk/10 rounded-3xl relative"
              style={{ rotate: (catIdx % 2 === 0 ? -1 : 1) * 2 }}
            >
              <h3 className="font-note text-2xl font-bold dark:text-chalk-yellow mb-6 text-marker-red inline-block border-b-4 border-marker-red/20">{label}</h3>
              <div className="flex flex-wrap gap-3">
                {categorySkills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, zIndex: 50 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative"
                  >
                    <RoughBox 
                       type="rectangle" 
                       className="px-4 py-2 bg-white dark:bg-gray-800 cursor-help"
                       rotation={(idx % 2 === 0 ? 1 : -1) * (idx % 3 + 1.5)}
                    >
                      <span className="font-mono text-sm md:text-base font-medium dark:text-chalk">
                        {skill.name}
                      </span>
                    </RoughBox>
                    {skill.note && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-marker-yellow text-black px-3 py-1.5 rounded text-xs font-hand z-50 whitespace-nowrap shadow-lg pointer-events-none">
                         {skill.note}
                         <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-marker-yellow rotate-45" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 flex items-center gap-4">
         <Doodle type="star" className="text-marker-yellow h-8 w-8" />
         <span className="font-note text-xl dark:text-chalk">
            new tools go in here all the time — I learn whatever the project needs
         </span>
      </div>
    </section>
  );
};