'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number, left: string, size: number, duration: number, delay: number, opacity: number, color: string, blur: string }[]>([]);

  useEffect(() => {
    const colors = ['#fbcfe8', '#f472b6', '#c084fc', '#e879f9'];
    const blurs = ['blur-[1px]', 'blur-[2px]', 'blur-[3px]', 'blur-none'];
    
    const newHearts = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 30 + 10, 
      duration: Math.random() * 10 + 15, // Slow float
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      blur: blurs[Math.floor(Math.random() * blurs.length)]
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          style={{ left: heart.left, position: 'absolute' }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ 
            y: '-10vh',
            opacity: [0, heart.opacity, 0],
            rotate: [0, 45, -45, 0]
          }}
          transition={{ 
            duration: heart.duration, 
            repeat: Infinity, 
            delay: heart.delay, 
            ease: "linear" 
          }}
          className={heart.blur}
        >
          <Heart 
            fill={heart.color}
            stroke="none"
            size={heart.size} 
          />
        </motion.div>
      ))}
    </div>
  );
}

