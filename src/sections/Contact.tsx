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

  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);

    // Honeypot check — if filled, it's a bot
    if (formData.get('botcheck')) {
      // Silently "succeed" so the bot doesn't know
      setStatus('success');
      return;
    }

    // Build payload
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('subject', `New portfolio message from ${formData.get('name')}`);
    formData.append('from_name', 'Portfolio Contact Form');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        formRef.current?.reset();
        
        // 🎉 Celebration confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E63946', '#2A9D8F', '#FFD93D'],
        });

        // Auto-dismiss success after 6 seconds
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
      // Auto-dismiss error after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading doodle="heart">Let's Build Something</SectionHeading>
      
      <div className="grid md:grid-cols-2 gap-16">
        {/* LEFT — Contact Info */}
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

        {/* RIGHT — Form */}
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
             
             <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot — invisible to humans, traps bots */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label className="font-note text-sm mb-2 block dark:text-gray-400">Name</label>
                  <RoughBox className="bg-gray-50 dark:bg-gray-900 p-2">
                    <input 
                      type="text" 
                      name="name"
                      required 
                      minLength={2}
                      disabled={status === 'sending'}
                      className="w-full bg-transparent border-none outline-none p-2 dark:text-chalk disabled:opacity-50" 
                      placeholder="Your name" 
                    />
                  </RoughBox>
                </div>

                <div>
                  <label className="font-note text-sm mb-2 block dark:text-gray-400">Email</label>
                  <RoughBox className="bg-gray-50 dark:bg-gray-900 p-2">
                    <input 
                      type="email" 
                      name="email"
                      required 
                      disabled={status === 'sending'}
                      className="w-full bg-transparent border-none outline-none p-2 dark:text-chalk disabled:opacity-50" 
                      placeholder="example@email.com" 
                    />
                  </RoughBox>
                </div>

                <div>
                  <label className="font-note text-sm mb-2 block dark:text-gray-400">Message</label>
                  <RoughBox className="bg-gray-50 dark:bg-gray-900 p-2">
                    <textarea 
                      name="message"
                      required 
                      minLength={10}
                      disabled={status === 'sending'}
                      className="w-full bg-transparent border-none outline-none p-2 min-h-[120px] resize-none dark:text-chalk disabled:opacity-50" 
                      placeholder="What's on your mind?" 
                    />
                  </RoughBox>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full group disabled:cursor-not-allowed"
                  disabled={status === 'sending'}
                >
                  <RoughBox 
                    fill={status === 'sending' ? "rgba(150, 150, 150, 0.1)" : "rgba(230, 57, 70, 0.1)"} 
                    className="p-4 font-hand text-2xl font-bold dark:text-chalk transition-opacity"
                  >
                    <div className="flex items-center justify-center gap-3">
                      {status === 'sending' ? (
                        <>
                          <span>Sending</span>
                          <Loader2 className="animate-spin" size={22} />
                        </>
                      ) : (
                        <>
                          <span>Send it</span>
                          <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={22} />
                        </>
                      )}
                    </div>
                  </RoughBox>
                </button>

                {/* Inline error message */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-marker-red font-note text-sm text-center"
                  >
                    ❌ {errorMessage}
                  </motion.div>
                )}
             </form>
             
             {/* Success overlay */}
             {status === 'success' && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="absolute inset-0 bg-paper dark:bg-chalkboard flex flex-col items-center justify-center z-10 p-6"
               >
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                   className="text-6xl mb-4"
                 >
                   ✅
                 </motion.div>
                 <p className="font-note text-2xl dark:text-chalk text-center">
                   Got it! I'll get back to you soon ✌️
                 </p>
                 <button 
                   onClick={() => setStatus('idle')} 
                   className="mt-8 font-hand text-marker-red underline hover:text-marker-red/70 transition-colors"
                 >
                   send another
                 </button>
               </motion.div>
             )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};