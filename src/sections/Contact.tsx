import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { RoughBox } from '../components/RoughBox';
import { Mail, Phone, MapPin, Github, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setStatus('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E63946', '#2A9D8F', '#FFD93D']
    });
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading doodle="scribble">Let's Build Something</SectionHeading>
      
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <p className="font-note text-2xl leading-relaxed dark:text-chalk opacity-80 decoration-marker-teal decoration-4 underline-offset-8 underline">
            Hey, if you've made it this far — thanks for reading. I just wrapped up my B.E. IT exams and I'm actively looking for internship and full-time roles in software engineering, frontend, full-stack, data, or anything where I can build, learn, and ship.
          </p>
          
          <div className="space-y-6 pt-8">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-marker-red/10 border-2 border-marker-red/30">
                <Mail className="text-marker-red" size={22} strokeWidth={2.5} />
              </div>
              <a href="mailto:manisshh.ml@gmail.com" className="font-hand text-xl hover:text-marker-red dark:text-chalk transition-colors">manisshh.ml@gmail.com</a>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-marker-teal/10 border-2 border-marker-teal/30">
                <Phone className="text-marker-teal" size={22} strokeWidth={2.5} />
              </div>
              <span className="font-hand text-xl dark:text-chalk">+91 9767284222</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20 border-2 border-blue-400/30">
                <MapPin className="text-blue-500" size={22} strokeWidth={2.5} />
              </div>
              <span className="font-hand text-xl dark:text-chalk">Ulhasnagar, Thane, India</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-400/30 dark:border-gray-600/30">
                <Github size={22} strokeWidth={2.5} className="text-gray-700 dark:text-chalk" />
              </div>
              <a href="https://github.com/Manish-Lulla" target="_blank" rel="noreferrer" className="font-hand text-xl hover:text-marker-red dark:text-chalk transition-colors">github.com/Manish-Lulla</a>
            </div>
          </div>
        </div>

        <motion.div
           initial={{ rotate: 1 }}
           whileHover={{ rotate: 0 }}
           className="relative"
        >
          <div className="bg-white dark:bg-gray-800 p-8 shadow-2xl border-l-[20px] border-l-gray-200 dark:border-l-gray-700 relative">
             <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-gray-300 -rotate-45 translate-x-12" />
             </div>
             
             <h3 className="font-hand text-3xl mb-8 dark:text-chalk">Drop a message</h3>
             
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-note text-sm mb-2 block dark:text-gray-400">Name</label>
                  <RoughBox className="bg-gray-50 dark:bg-gray-900 p-2">
                    <input type="text" required className="w-full bg-transparent border-none outline-none p-2 dark:text-chalk" placeholder="Your name" />
                  </RoughBox>
                </div>
                <div>
                  <label className="font-note text-sm mb-2 block dark:text-gray-400">Email</label>
                  <RoughBox className="bg-gray-50 dark:bg-gray-900 p-2">
                    <input type="email" required className="w-full bg-transparent border-none outline-none p-2 dark:text-chalk" placeholder="example@email.com" />
                  </RoughBox>
                </div>
                <div>
                  <label className="font-note text-sm mb-2 block dark:text-gray-400">Message</label>
                  <RoughBox className="bg-gray-50 dark:bg-gray-900 p-2">
                    <textarea required className="w-full bg-transparent border-none outline-none p-2 min-h-[120px] resize-none dark:text-chalk" placeholder="What's on your mind?" />
                  </RoughBox>
                </div>
                
                <button type="submit" className="w-full group">
                  <RoughBox fill="rgba(230, 57, 70, 0.1)" className="p-4 font-hand text-2xl font-bold dark:text-chalk">
                    <div className="flex items-center justify-center gap-3">
                      <span>Send it</span>
                      <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={22} />
                    </div>
                  </RoughBox>
                </button>
             </form>
             
             {status === 'success' && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="absolute inset-0 bg-paper dark:bg-chalkboard flex flex-col items-center justify-center z-10"
               >
                 <div className="text-6xl mb-4">✅</div>
                 <p className="font-note text-2xl dark:text-chalk">got it! I'll get back to you soon ✌️</p>
                 <button onClick={() => setStatus('idle')} className="mt-8 font-hand text-marker-red underline">send another</button>
               </motion.div>
             )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};