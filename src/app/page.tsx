'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Envelope from '@/components/Envelope';
import StoryScroll from '@/components/StoryScroll';
import Timeline from '@/components/Timeline';
import ReasonsSection from '@/components/ReasonsSection';
import FinalSurprise from '@/components/FinalSurprise';
import MusicPlayer from '@/components/MusicPlayer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ChevronRight, ChevronLeft, Heart } from 'lucide-react';
import FloatingHearts from '@/components/FloatingHearts';

export default function Home() {
  const [hasOpened, setHasOpened] = useState(false);
  const [showSwipe, setShowSwipe] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    // Hide much earlier (when starting to enter the 3rd section out of 4)
    const threshold = container.clientWidth * 1.8; 
    if (container.scrollLeft > threshold) {
      setShowSwipe(false);
    } else {
      setShowSwipe(true);
    }
  };

  return (
    <ThemeProvider>
      <main className="relative selection:bg-accent-rose/30 h-screen overflow-hidden bg-romantic-cream dark:bg-romantic-purple-deep transition-colors duration-1000">

        {/* Level 50: Controls (Topmost) */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <MusicPlayer />
      </div>
        
        <AnimatePresence>
          {!hasOpened ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
              // Level 20: Envelope (Above hearts, below controls)
              className="absolute inset-0 z-20"
            >
              <FloatingHearts />
              <Envelope onOpen={() => setHasOpened(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              // Level 20: Main Content (Above hearts, below controls)
              className="h-full relative z-20"
            >
              {/* Horizontal Slider Container */}
              <div 
                className="h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
                onScroll={handleScroll}
              >
                <StoryScroll />
                <Timeline />
                <ReasonsSection />
                <FinalSurprise />
              </div>

              {/* Swipe Indicator (Bottom) */}
              <AnimatePresence>
                {showSwipe && (
                  <motion.div 
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#581c87]/40 dark:text-white/40 pointer-events-none z-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    transition={{ 
                      opacity: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <ChevronLeft size={16} />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Swipe to explore</span>
                      <ChevronRight size={16} />
                    </div>
                    <Heart fill="currentColor" size={12} className="opacity-50" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </ThemeProvider>
  );
}
