'use client';

import { useState } from 'react';
import Section from './Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const reasons = [
  "Your beautiful smile that lights up my whole world 😍",
  "The way you make me laugh even on my hardest days",
  "Your kindness and the warmth you give to everyone",
  "How you always support my biggest dreams",
  "The way you look at me like I'm the only person in the room"
];

export default function ReasonsSection() {
  const [currentReason, setCurrentReason] = useState(0);
  const [showReason, setShowReason] = useState(false);

  const nextReason = () => {
    if (!showReason) {
      setShowReason(true);
    } else {
      setShowReason(false);
      setTimeout(() => {
        setCurrentReason((prev) => (prev + 1) % reasons.length);
        setShowReason(true);
      }, 300);
    }
  };

  return (
    <Section id="reasons" className="bg-gradient-to-b from-[#e9d5ff] via-[#fbcfe8] to-[#fbcfe8] dark:from-[#2e1065] dark:to-[#4a1033] relative overflow-hidden flex items-center justify-center">
      
      {/* Decorative Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-pink-200/20 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-200/20 blur-[100px] rounded-full" 
        />
      </div>

      <div className="max-w-2xl w-full z-10 flex flex-col items-center px-6">
        {/* Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#4c1d95] dark:text-white italic">
            Why I Love You
          </h2>
        </div>

        {/* Reveal Button */}
        <motion.button
          onClick={nextReason}
          className="group relative px-10 py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full font-bold text-lg shadow-[0_10px_30px_rgba(236,72,153,0.4)] hover:shadow-[0_15px_40px_rgba(236,72,153,0.6)] transition-all mb-16 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Click to see a reason <Heart size={18} fill="currentColor" />
          </span>
          <motion.div 
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>

        {/* Revealed Card */}
        <div className="h-60 w-full flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {showReason && (
              <motion.div
                key={currentReason}
                initial={{ opacity: 0, y: 40, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, y: -40, scale: 0.9, rotate: 2 }}
                className="w-full max-w-lg bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-[2rem] p-10 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-400/10 blur-3xl rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-400/10 blur-3xl rounded-full" />
                
                <div className="flex flex-col items-center gap-6 relative z-10">
                  <div className="p-3 bg-white dark:bg-white/20 rounded-2xl shadow-sm">
                    <Heart className="text-rose-500 fill-rose-500" size={28} />
                  </div>
                  <p className="text-2xl md:text-3xl font-serif italic text-[#4c1d95] dark:text-white text-center leading-relaxed">
                    "{reasons[currentReason]}"
                  </p>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-pink-300" />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Simple Instruction if not shown */}
          {!showReason && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="text-[#4c1d95] dark:text-white italic font-serif"
            >
              Every reason is my favorite one...
            </motion.p>
          )}
        </div>
      </div>
    </Section>
  );
}

