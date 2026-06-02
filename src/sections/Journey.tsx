import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { TIMELINE } from '../data';

export const Journey = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-16 sm:py-24 px-4 sm:px-6 max-w-3xl mx-auto relative">
      <SectionHeading doodle="spiral">How I Got Here</SectionHeading>

      <div className="relative pt-8 sm:pt-12">
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-[20px] top-0 bottom-0 w-1 bg-ink dark:bg-chalk opacity-20 rounded-full"
        />

        <div className="space-y-8 sm:space-y-12">
          {TIMELINE.map((entry, idx) => (
            <div key={idx} className="relative pl-10 sm:pl-12">
              <div className="absolute left-[-4px] top-6 w-12 h-12 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-ink dark:bg-chalk border-4 border-paper dark:border-chalkboard z-10" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="bg-white/50 dark:bg-gray-800/50 p-5 sm:p-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 backdrop-blur-sm -rotate-1 hover:rotate-0 transition-transform">
                  <span className="font-hand text-marker-red dark:text-chalk-red text-lg sm:text-xl font-bold">{entry.year}</span>
                  <h3 className="text-xl sm:text-2xl font-hand mt-1 dark:text-chalk">{entry.title}</h3>
                  {entry.organization && <p className="font-note text-marker-teal dark:text-chalk-teal text-base sm:text-lg">{entry.organization}</p>}
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-sans italic">{entry.description}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
