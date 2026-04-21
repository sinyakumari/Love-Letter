'use client';

import { useState, useEffect } from 'react';
import Section from './Section';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

export default function FinalSurprise() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
    
    const end = Date.now() + 3 * 1000;
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <Section id="final" className="bg-gradient-to-br from-[#2e1065] via-[#831843] to-[#be185d] relative overflow-hidden">
      
      {/* Background Hearts Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              top: Math.random() * 100 + "%", 
              left: Math.random() * 100 + "%", 
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0 
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
              y: [0, -50, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute text-rose-500/30"
          >
            <Heart fill="currentColor" size={Math.random() * 40 + 20} />
          </motion.div>
        ))}
      </div>

      <div className="text-center z-10 relative">
        {!isRevealed ? (
          <motion.button
            onClick={handleReveal}
            className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full font-medium text-lg shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center gap-2 hover:shadow-[0_0_30px_rgba(236,72,153,0.7)] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            One last thing... <span className="text-sm opacity-60">&gt;</span>
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl"
            >
              <h2 className="text-4xl md:text-8xl font-serif text-white mb-6 leading-tight flex items-center justify-center gap-4 flex-wrap md:whitespace-nowrap md:flex-nowrap">
                Happy Anniversary! ❤️ 🥂
              </h2>
              <motion.p 
                className="text-xl md:text-3xl font-serif italic text-white/80 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                I'd choose you again and again.
              </motion.p>
              
              <motion.div 
                className="mt-12 flex items-center justify-center gap-6"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-2 h-2 rounded-full bg-rose-400 blur-sm" />
                <div className="w-1.5 h-1.5 rounded-full bg-rose-300 blur-sm" />
                <div className="w-2 h-2 rounded-full bg-rose-400 blur-sm" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      
      <footer className="absolute bottom-10 text-[10px] text-white/30 font-bold tracking-[0.5em] uppercase">
        Together Since 2019
      </footer>
    </Section>
  );
}

