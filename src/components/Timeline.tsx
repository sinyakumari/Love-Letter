'use client';

import { useState } from 'react';
import Section from './Section';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Heart, MessageCircle, Sparkles } from 'lucide-react';

const milestones = [
  {
    title: "First Message",
    icon: <MessageCircle size={18} className="text-pink-400" />,
    image: "/images/First Message.jpg",
    caption: "The start of something beautiful..."
  },
  {
    title: "First Meetup",
    icon: <Heart size={18} className="text-rose-400" />,
    image: "/images/firstMeetup.jpg",
    caption: "Curosity, hugs, and lovely moments."
  },
  {
    title: "Long Distance",
    icon: <MapPin size={18} className="text-purple-400" />,
    image: "/images/longDistance.jpg",
    caption: "Patience, Love, Care and Trust."
  },
  {
    title: "Proposal",
    icon: <Heart size={18} className="text-rose-500" />,
    image: "/images/proposal.jpg",
    caption: "Easiest 'Yes' ever! ❤️"
  }
];

export default function Timeline() {
  const [hoveredIndex, setHoveredIndex] = useState(3);

  return (
    <Section id="timeline" className="bg-gradient-to-b from-[#fbcfe8] via-[#e9d5ff] to-[#fde68a]/30 dark:from-[#2e1065] dark:to-[#1e1a45] relative overflow-hidden flex items-center justify-center">
      
      {/* Atmosphere Sparkles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/10 blur-[100px] rounded-full" />
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200/30 dark:bg-pink-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 px-6 z-10">
        
        <div className="w-full md:w-1/2">
           <div className="mb-8 md:mb-12 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-serif text-[#4c1d95] dark:text-white mb-2 italic">Our Milestones</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto md:mx-0" />
           </div>

           <div className="relative pl-10 md:pl-10 space-y-8 md:space-y-12">
              <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-pink-300 via-purple-300 to-pink-300 dark:from-pink-900 dark:to-purple-900" />
              
              {milestones.map((milestone, index) => (
                <motion.div 
                   key={index}
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: index * 0.1, duration: 0.5 }}
                   onMouseEnter={() => setHoveredIndex(index)}
                   onClick={() => setHoveredIndex(index)}
                   className="relative group cursor-pointer"
                >
                   {/* Dot */}
                   <div className={`absolute left-[-27px] w-[14px] h-[14px] rounded-full border-2 border-white dark:border-purple-900 z-10 transition-all duration-300 shadow-sm ${hoveredIndex === index ? 'bg-[#4c1d95] scale-150' : 'bg-white/80 dark:bg-white/20'}`} />
                   
                   <div className={`transition-all duration-300 ${hoveredIndex === index ? 'translate-x-4' : ''}`}>
                      <div className="flex items-center gap-4 mb-1">
                        <div className={`transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-60'}`}>
                          {milestone.icon}
                        </div>
                        <h3 className={`text-xl md:text-3xl font-serif italic transition-all duration-300 ${hoveredIndex === index ? 'text-[#4c1d95] dark:text-white font-bold' : 'text-[#4c1d95]/40 dark:text-white/30'}`}>
                          {milestone.title}
                        </h3>
                      </div>
                    </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Right Side: Floating Photo Cards */}
        <div className="w-full md:w-1/2 flex justify-center items-center h-[450px] md:h-[500px] relative mt-4 md:mt-0">
          <div className="relative w-full max-w-[280px] md:max-w-[340px] h-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {milestones.map((milestone, index) => (
                hoveredIndex === index && (
                  <motion.div
                    key={"card-" + index}
                    initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -10 : 10, y: 30 }}
                    animate={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? 2 : -2, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? 10 : -10, y: -30 }}
                    transition={{ type: "spring", damping: 15, stiffness: 100 }}
                    className="absolute shadow-2xl"
                  >
                    <div className="bg-white p-3 md:p-4 pb-6 md:pb-8 rounded-xl shadow-2xl border border-gray-100 relative group overflow-hidden w-[240px] md:w-[320px] min-h-[380px] md:min-h-[500px] flex flex-col">
                      {/* High quality image wrapper */}
                      <div className="relative w-full flex-1 min-h-[240px] md:min-h-[384px] overflow-hidden rounded-lg">
                        <Image 
                          src={milestone.image} 
                          alt={milestone.title} 
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                      
                      {/* Caption */}
                      <div className="mt-4 px-2 text-center">
                        <p className="text-[#4c1d95] font-serif italic text-base md:text-lg font-medium leading-relaxed">
                          {milestone.caption}
                        </p>
                      </div>

                      {/* Polaroid-style decoration (Restored) */}
                      <div className="absolute top-2 right-4 text-pink-400 rotate-12 opacity-40">
                        <Sparkles size={20} />
                      </div>
                    </div>

                    {/* Glowing backlight effect */}
                    <div className="absolute -inset-10 bg-pink-400/20 blur-[60px] -z-10 rounded-full" />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </Section>
  );
}

