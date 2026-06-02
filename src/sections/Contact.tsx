import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { RoughBox } from '../components/RoughBox';
import { Mail, Phone, MapPin, Github, Send, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '0e066931-561b-4a67-bc46-1519b509369e';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    if (formData.get('botcheck')) { setStatus('success'); return; }

    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('subject', 'New portfolio message from ' + formData.get('name'));
    formData.append('from_name', 'Portfolio Contact Form');

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        formRef.current?.reset();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#E63946', '#2A9D8F', '#FFD93D'] });
        setTimeout(() => setStatus('idle'), 6000);
      } else { throw new Error(data.message || 'Failed to send message'); }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      <SectionHeading doodle="heart">Let us Build Something</SectionHeading>
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div className="space-y-6 sm:space-y-8">
          <p className="font-note text-lg sm:text-2xl leading-relaxed dark:text-chalk opacity-80 decoration-marker-teal decoration-4 underline-offset-8 underline">
            Hey, if you have made it this far thanks for reading. I just wrapped up my B.E. IT exams and I am actively looking for internship and full-time roles in software engineering, frontend, full-stack, data, or anything where I can build, learn, and ship.
          </p>
          <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-8">
            <div className="flex items-center gap-3 sm:gap-4 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-marker-red/10 border-2 border-marker-red/30 flex-shrink-0">
                <Mail className="text-marker-red" size={20} strokeWidth={2.5} />
              </div>
              <a href="mailto:manisshh.ml@gmail.com" className="font-hand text-base sm:text-xl hover:text-marker-red dark:text-chalk transition-colors break-all">manisshh.ml@gmail.com</a>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-marker-teal/10 border-2 border-marker-teal/30 flex-shrink-0">
                <Phone className="text-marker-teal" size={20} strokeWidth={2.5} />
              </div>
              <span className="font-hand text-base sm:text-xl dark:text-chalk">+91 9767284222</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20 border-2 border-blue-400/30 flex-shrink-0">
                <MapPin className="text-blue-500" size={20} strokeWidth={2.5} />
              </div>
              <span className="font-hand text-base sm:text-xl dark:text-chalk">Ulhasnagar, Thane, India</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-400/30 dark:border-gray-600/30 flex-shrink-0">
                <Github size={20} strokeWidth={2.5} className="text-gray-700 dark:text-chalk" />
              </div>
              <a href="https://github.com/Manish-Lulla" target="_blank" rel="noreferrer" className="font-hand text-base sm:text-xl hover:text-marker-red dark:text-chalk transition-colors break-all">github.com/Manish-Lulla</a>
            </div>
          </div>
        </div>

        <motion.div className="relative">
          <div className="bg-white dark:bg-gray-800 p-5 sm:p-8 shadow-2xl border-l-[12px] sm:border-l-[20px] border-l-gray-200 dark:border-l-gray-700 relative">
            <h3 className="font-hand text-2xl sm:text-3xl mb-6 sm:mb-8 dark:text-chalk">Drop a message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              <div>
                <label className="font-note text-sm mb-2 block dark:text-gray-400">Name</label>
                <div className="bg-gray-50 dark:bg-gray-900 p-2 border-2 border-ink dark:border-chalk/40 rounded-sm">
                  <input type="text" name="name" required minLength={2} disabled={status === 'sending'} className="w-full bg-transparent border-none outline-none p-2 text-base dark:text-chalk disabled:opacity-50" placeholder="Your name" />
                </div>
              </div>
              <div>
                <label className="font-note text-sm mb-2 block dark:text-gray-400">Email</label>
                <div className="bg-gray-50 dark:bg-gray-900 p-2 border-2 border-ink dark:border-chalk/40 rounded-sm">
                  <input type="email" name="email" required disabled={status === 'sending'} className="w-full bg-transparent border-none outline-none p-2 text-base dark:text-chalk disabled:opacity-50" placeholder="example@email.com" />
                </div>
              </div>
              <div>
                <label className="font-note text-sm mb-2 block dark:text-gray-400">Message</label>
                <div className="bg-gray-50 dark:bg-gray-900 p-2 border-2 border-ink dark:border-chalk/40 rounded-sm">
                  <textarea name="message" required minLength={10} disabled={status === 'sending'} className="w-full bg-transparent border-none outline-none p-2 text-base min-h-[100px] sm:min-h-[120px] resize-none dark:text-chalk disabled:opacity-50" placeholder="What is on your mind?" />
                </div>
              </div>
              <button type="submit" className="w-full group disabled:cursor-not-allowed" disabled={status === 'sending'}>
                <RoughBox fill={status === 'sending' ? 'rgba(150, 150, 150, 0.1)' : 'rgba(230, 57, 70, 0.1)'} className="p-3 sm:p-4 font-hand text-xl sm:text-2xl font-bold dark:text-chalk transition-opacity">
                  <div className="flex items-center justify-center gap-3">
                    {status === 'sending' ? (<><span>Sending</span><Loader2 className="animate-spin" size={22} /></>) : (<><span>Send it</span><Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={22} /></>)}
                  </div>
                </RoughBox>
              </button>
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-marker-red font-note text-sm text-center">
                  {errorMessage}
                </motion.div>
              )}
            </form>
            {status === 'success' && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-paper dark:bg-chalkboard flex flex-col items-center justify-center z-10 p-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 200 }} className="text-5xl sm:text-6xl mb-4">OK</motion.div>
                <p className="font-note text-xl sm:text-2xl dark:text-chalk text-center">Got it! I will get back to you soon.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 sm:mt-8 font-hand text-marker-red underline hover:text-marker-red/70 transition-colors">send another</button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};