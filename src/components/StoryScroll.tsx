'use client';

import { useState } from 'react';
import Section from './Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Sun, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const stories = [
  {
    id: 'met',
    title: "How We Met",
    subtitle: "That magical first day...",
    icon: <Heart className="text-pink-400" fill="currentColor" size={24} />,
    delay: 0.1,
    content: "It all started by chance, but the moment I saw you, something felt different. Every word we spoke was effortless, and I didn't want the day to end.",
    image: "/images/how we met.jpg"
  },
  {
    id: 'memories',
    title: "Our Best Memories",
    subtitle: "Unforgettable moments together...",
    icon: <Sparkles className="text-pink-300" size={24} />,
    delay: 0.2,
    content: "From strangers to late-night long talks, every second spent with you becomes a core memory I'll cherish forever.",
    image: "/images/Our best memory.jpg"
  },
  {
    id: 'love',
    title: "What I Love About You",
    subtitle: "All the reasons you're amazing...",
    icon: <Heart className="text-rose-400" fill="currentColor" size={24} />,
    delay: 0.3,
    content: "Your smile, your laugh, your kindness. The way you make ordinary moments feel extraordinary. You are everything I never knew I needed.",
    image: "/images/What i love about you.jpg"
  },
  {
    id: 'future',
    title: "Our Future",
    subtitle: "Dreaming of our tomorrow...",
    icon: <Sun className="text-orange-400" fill="currentColor" size={24} />,
    delay: 0.4,
    content: "I can't wait for all our tomorrow's. Growing old together, seeing the world, and just being by your side through it all.",
    image: "/images/Our Future.jpg"
  }
];

export default function StoryScroll() {
  const [activeStory, setActiveStory] = useState<number | null>(null);

  const nextStory = () => {
    if (activeStory !== null) {
      setActiveStory((activeStory + 1) % stories.length);
    }
  };

  return (
    <Section className="bg-gradient-to-b from-[#f9d8e7] via-[#fbcfe8] to-[#f9d8e7] dark:from-[#2e1065] dark:to-[#4a1033] relative overflow-hidden flex flex-col md:flex-row items-center justify-center p-4">

      {/* Decorative Atmosphere */}
      <div className="absolute top-20 right-10 opacity-20 dark:opacity-10 blur-3xl w-64 h-64 bg-pink-300 rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-10 opacity-20 dark:opacity-10 blur-3xl w-64 h-64 bg-purple-300 rounded-full pointer-events-none" />

      {/* Cards Section (Left) */}
      <div className="max-w-md w-full z-10 flex flex-col items-center justify-center h-full transition-transform duration-500 ease-in-out md:-translate-x-[calc(clamp(0px,50vw-400px,200px))]">
        {/* Title */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-6 md:w-10 bg-[#581c87]/30 dark:bg-white/30" />
          <h2 className="text-2xl md:text-3xl font-serif text-[#581c87] dark:text-white px-2">
            Our Journey
          </h2>
          <div className="h-px w-6 md:w-10 bg-[#581c87]/30 dark:bg-white/30" />
        </div>

        {/* List of items */}
        <div className="space-y-3 w-full px-4">
          {stories.map((story, index) => {
            const isActive = activeStory === index;
            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: story.delay, duration: 0.6 }}
                onClick={() => setActiveStory(index)}
                className={`cursor-pointer backdrop-blur-md p-2.5 md:p-3 rounded-2xl flex items-center gap-3 shadow-sm transition-all duration-300 border ${isActive
                    ? 'bg-white/80 dark:bg-white/20 border-white/60 dark:border-white/30 scale-105 shadow-md shadow-pink-200/50 dark:shadow-purple-900/50'
                    : 'bg-white/40 dark:bg-white/5 border-white/30 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 hover:scale-[1.02]'
                  }`}
              >
                <div className="w-10 h-10 flex-shrink-0 bg-white dark:bg-white/20 rounded-xl flex items-center justify-center shadow-inner">
                  {story.icon}
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-base md:text-lg font-serif font-bold text-[#581c87] dark:text-white italic">
                    {story.title}
                  </h3>
                  <p className="text-[12px] md:text-sm text-[#581c87]/70 dark:text-white/60 font-medium line-clamp-1 md:line-clamp-none">
                    {story.subtitle}
                  </p>
                </div>
                {isActive && (
                  <motion.div layoutId="active-indicator" className="w-2 h-2 rounded-full bg-rose-400 absolute right-4" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Slide-in Panel (Right) */}
      <AnimatePresence>
        {activeStory !== null && (
          <>
            {/* Mobile Backdrop to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStory(null)}
              className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, x: 100, y: 0, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, y: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed md:absolute bottom-0 md:top-0 right-0 w-full md:w-[450px] h-[80vh] md:h-full z-30 p-4 md:p-6 flex flex-col justify-end md:justify-center"
            >
              <div className="bg-white/90 dark:bg-black/40 backdrop-blur-xl rounded-t-[2rem] md:rounded-3xl p-6 md:p-6 h-full max-h-[520px] border-t border-x md:border border-white/50 dark:border-white/20 shadow-[-10px_0_30px_rgba(0,0,0,0.05)] shadow-pink-200/50 dark:shadow-purple-900/50 relative flex flex-col m-0">

                {/* Close Button */}
                <button
                  onClick={() => setActiveStory(null)}
                  className="absolute top-4 right-4 p-2 bg-white/50 dark:bg-white/10 rounded-full hover:bg-white dark:hover:bg-white/20 transition-colors z-10"
                >
                  <X size={18} className="text-[#581c87] dark:text-white" />
                </button>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-8 pt-4">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-md border border-white/30 dark:border-white/10">
                    <Image
                      src={stories[activeStory].image}
                      alt={stories[activeStory].title}
                      fill
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/60 dark:bg-white/10 rounded-lg shadow-sm">
                      {stories[activeStory].icon}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#581c87] dark:text-white">
                      {stories[activeStory].title}
                    </h3>
                  </div>

                  <p className="text-[#581c87]/80 dark:text-gray-200 leading-relaxed font-serif text-lg">
                    {stories[activeStory].content}
                  </p>
                </div>

                {/* Next Arrow inside panel */}
                <button
                  onClick={nextStory}
                  className="absolute bottom-6 right-6 p-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center group"
                >
                  <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                <motion.div
                  key={"sparkles-" + activeStory}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 1 }}
                  className="absolute top-4 left-6 pointer-events-none"
                >
                  <Sparkles className="text-rose-400" size={24} />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </Section>
  );
}

