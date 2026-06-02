import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { PROJECTS } from '../data';
import { RoughBox } from '../components/RoughBox';
import { Doodle } from '../components/Doodle';
import { ExternalLink, Github } from 'lucide-react';

export const Projects = () => {
  const featured = PROJECTS.filter(p => p.featured);
  const others = PROJECTS.filter(p => !p.featured);

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto bg-[#f8f5e9] dark:bg-[#151a15] rounded-2xl sm:rounded-3xl sm:-rotate-1 shadow-[inset_0_0_50px_rgba(0,0,0,0.05)] border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden">
      <SectionHeading doodle="star">Stuff I have Built</SectionHeading>
      <div className="flex items-start sm:items-center gap-2 mb-8 sm:mb-12">
        <span className="font-note text-base sm:text-xl text-gray-600 dark:text-gray-400">
          a mix of frontend, full-stack, data, AI, and the occasional weekend experiment. variety is kind of the point.
        </span>
        <Doodle type="arrow" className="w-6 h-6 sm:w-8 sm:h-8 text-marker-red rotate-90 flex-shrink-0" />
      </div>

      <div className="grid gap-16 sm:gap-20 md:gap-24 mb-20 sm:mb-32">
        {featured.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={"flex flex-col md:flex-row gap-8 sm:gap-12 items-center " + (idx % 2 === 1 ? 'md:flex-row-reverse' : '')}
          >
            <div className="flex-1 relative group w-full max-w-md mx-auto md:max-w-none">
              <div
                className="w-full aspect-video p-1 border-2 border-ink dark:border-chalk/30 bg-white dark:bg-gray-800 shadow-md md:rotate-0"
                style={{ transform: window.innerWidth >= 768 ? `rotate(${project.rotation || 0}deg)` : 'rotate(0deg)' }}
              >
                <div className="w-full h-full overflow-hidden bg-gray-50 dark:bg-gray-800 relative">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <span className="text-5xl font-black opacity-20 dark:text-chalk select-none">
                        {project.title.charAt(0)}
                      </span>
                      <span className="text-xs font-mono opacity-40 mt-2 uppercase tracking-widest">{project.tag}</span>
                    </div>
                  )}
                </div>
              </div>

              {project.note && (
                <div className={"absolute z-20 hidden md:block " + (idx % 2 === 0 ? '-top-12 -right-8' : '-bottom-12 -left-8')}>
                  <div
                    className="bg-marker-yellow/40 dark:bg-chalk-yellow/20 p-4 w-40 text-sm font-note font-bold dark:text-chalk text-center shadow-lg"
                    style={{ transform: `rotate(${idx % 2 === 0 ? 5 : -5}deg)` }}
                  >
                    {project.note}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4 sm:space-y-6 w-full">
              <span className="font-hand text-marker-red dark:text-chalk-red text-lg sm:text-2xl font-bold">
                PROJECT {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="text-3xl sm:text-4xl font-hand dark:text-chalk">{project.title}</h3>
              <p className="text-lg sm:text-2xl font-note text-marker-teal dark:text-chalk-teal leading-tight">
                "{project.pitch}"
              </p>
              <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>

              {project.note && (
                <p className="md:hidden font-note text-sm text-marker-teal dark:text-chalk-teal italic border-l-4 border-marker-yellow pl-3 py-1">
                  "{project.note}"
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {project.stack.map(tag => (
                  <span key={tag} className="font-mono text-[10px] sm:text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md dark:text-chalk opacity-70">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 sm:pt-4">
                {project.demoUrl && (
                  <motion.a href={project.demoUrl} target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <RoughBox fill="rgba(230, 57, 70, 0.1)" color="#E63946" className="px-4 sm:px-6 py-2 sm:py-3 font-bold flex items-center gap-2 text-sm sm:text-base text-marker-red dark:text-chalk-red">
                      Live Demo <ExternalLink size={16} />
                    </RoughBox>
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a href={project.githubUrl} target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <RoughBox fill="rgba(42, 157, 143, 0.1)" className="px-4 sm:px-6 py-2 sm:py-3 font-bold flex items-center gap-2 text-sm sm:text-base text-marker-teal dark:text-chalk-teal" color="#2A9D8F">
                      Code <Github size={16} />
                    </RoughBox>
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-8 sm:space-y-12">
        <h3 className="text-2xl sm:text-3xl font-hand dark:text-chalk flex flex-wrap items-center gap-2">
          OTHER PROJECTS <span className="opacity-50 text-lg sm:text-2xl">/ the side quests</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {others.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="md:rotate-0"
              style={{ transform: typeof window !== 'undefined' && window.innerWidth >= 768 ? `rotate(${(idx % 2 === 0 ? 2 : -2)}deg)` : 'none' }}
            >
              <div className="p-5 sm:p-6 bg-white dark:bg-gray-800 h-full flex flex-col justify-between group cursor-default border-2 border-ink dark:border-chalk/30 shadow-md rounded-sm">
                <div>
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <span className="font-flair text-xs text-marker-red dark:text-chalk-red uppercase">{project.tag}</span>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-marker-teal transition-colors">
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                  <h4 className="text-lg sm:text-xl font-hand font-bold mb-2 dark:text-chalk">{project.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">{project.pitch}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  {project.stack.slice(0, 3).map(s => (
                    <span key={s} className="text-[10px] font-mono border border-gray-400 dark:border-gray-500 px-1 rounded">
                      {s}
                    </span>
                  ))}
                </div>

                {project.note && (
                  <div className="mt-4 pt-4 border-t border-dashed border-gray-300 dark:border-gray-700 font-note text-xs text-marker-teal dark:text-chalk-teal">
                    "{project.note}"
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12 sm:mt-16 flex flex-col items-center">
        <Doodle type="arrow" className="w-10 h-10 sm:w-12 sm:h-12 rotate-[-90deg] text-marker-red mb-2" />
        <p className="font-hand text-lg sm:text-xl dark:text-chalk text-center">
          I add new ones all the time. Check my GitHub.
        </p>
      </div>
    </section>
  );
};