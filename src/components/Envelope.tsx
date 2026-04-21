'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(onOpen, 2000); 
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#f9d8e7] via-[#fbcfe8] to-[#e9d5ff] p-4">
      
      {/* Animated Floating Hearts in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: Math.random() * 100 + "vw", scale: Math.random() * 0.5 + 0.5, opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.4, 0] }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 10 }}
            className="absolute text-pink-300 dark:text-purple-400"
          >
            <Heart fill="currentColor" size={24} />
          </motion.div>
        ))}
      </div>

      <div className="z-10 flex flex-col items-center gap-12 mb-20">
        {/* Top Welcome Text - Using absolute type layout to avoid jumping when it disappears */}
        <div className="h-40 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
                className="text-center"
              >
                <h1 className="text-3xl md:text-6xl font-serif text-[#4c1d95] dark:text-white leading-tight px-4 max-w-4xl">
                  Hey, I made something for you <span className="inline-block animate-bounce">❤️</span>
                </h1>
                <p className="mt-4 text-[#4c1d95]/60 dark:text-white/60 font-medium tracking-[0.4em] uppercase text-xs md:text-sm">
                  A Journey Through Our Love
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          className="relative"
          onClick={!isOpen ? handleOpen : undefined}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={!isOpen ? { scale: 1.02 } : {}}
        >
          {/* Enhanced Envelope Body with Paper Texture effect */}
          <div className="relative w-[300px] h-[190px] md:w-[500px] md:h-[320px] bg-[#fffaf0] rounded-b-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-white/50 flex items-center justify-center overflow-visible">
            
            {/* Inner Paper (The Letter) */}
            <motion.div 
              className="absolute top-4 w-[92%] h-[92%] bg-white rounded-lg shadow-inner flex flex-col items-center justify-start p-8 z-10"
              initial={{ y: 0 }}
              animate={isOpen ? { y: -40, opacity: 0 } : { y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            >
              <div className="w-16 h-0.5 bg-pink-100 mb-6" />
              <div className="space-y-4 w-full">
                <div className="h-2 w-full bg-pink-50/50 rounded" />
                <div className="h-2 w-5/6 bg-pink-50/50 rounded" />
                <div className="h-2 w-full bg-pink-50/50 rounded" />
                <div className="h-2 w-4/6 bg-pink-50/50 rounded" />
              </div>
            </motion.div>

            {/* Back Flaps (Complex Envelope Structure) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Bottom Triangle */}
              <div 
                className="absolute inset-0"
                style={{ 
                  clipPath: "polygon(0 100%, 100% 100%, 50% 45%)", 
                  background: "linear-gradient(to top, #fff9e6, #fffcf5)",
                  boxShadow: "inset 0 -10px 30px rgba(0,0,0,0.03)"
                }}
              />
              {/* Side Triangles */}
              <div 
                className="absolute inset-0"
                style={{ 
                  clipPath: "polygon(0 0, 50% 50%, 0 100%)", 
                  background: "#fffdfa",
                  boxShadow: "inset 10px 0 20px rgba(0,0,0,0.02)"
                }}
              />
              <div 
                className="absolute inset-0"
                style={{ 
                  clipPath: "polygon(100% 0, 50% 50%, 100% 100%)", 
                  background: "#fffdfa",
                  boxShadow: "inset -10px 0 20px rgba(0,0,0,0.02)"
                }}
              />
            </div>

            {/* Top Flap (Animated) */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-full z-30 origin-top pointer-events-none"
              animate={isOpen ? { rotateX: 160, zIndex: 5 } : { rotateX: 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              style={{ 
                clipPath: "polygon(0 0, 100% 0, 50% 55%)", 
                background: "linear-gradient(to bottom, #fff5e6, #fffbf2)",
                filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.1))"
              }}
            >
              {/* Subtle inner shadow on the flap */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-black/5 blur-sm" />
            </motion.div>

            {/* Detailed Wax Seal */}
            {!isOpen && (
              <motion.div 
                className="absolute z-40 top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="relative group">
                  {/* Irregular wax edges effect */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-red-700/90 rounded-full shadow-[0_8px_20px_rgba(153,27,27,0.5)] flex items-center justify-center border-b-4 border-r-4 border-red-900/40 relative">
                     {/* Inner circle for depth */}
                     <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-red-500/30 flex items-center justify-center">
                        <Heart fill="white" className="text-white w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" />
                     </div>
                  </div>
                  {/* Wax drip effects (CSS circles) */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-700 rounded-full shadow-sm" />
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-red-800 rounded-full shadow-sm" />
                  
                  {/* Shine effect */}
                  <div className="absolute top-3 left-4 w-1/3 h-1/4 bg-white/10 blur-sm rounded-full -rotate-45" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Interaction Prompt Below Envelope */}
          {!isOpen && (
            <motion.div 
              className="absolute -bottom-24 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="text-[#4c1d95]/40 dark:text-white/40 font-bold tracking-[0.5em] uppercase text-[10px] mb-3">
                Click to open
              </p>
              <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-[#4c1d95]/20 to-transparent mx-auto" />
            </motion.div>
          )}
        </motion.div>
      </div>

    </div>
  );
}
