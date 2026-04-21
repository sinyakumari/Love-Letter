'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !audioRef.current) return;

    const audio = audioRef.current;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    const handleFirstInteraction = () => {
      if (audio.paused) {
        audio.play().then(() => setIsPlaying(true)).catch(err => console.log("Autoplay blocked:", err));
      }
      
      const events = ['click', 'touchstart', 'scroll', 'keydown', 'mousedown'];
      events.forEach(e => window.removeEventListener(e, handleFirstInteraction));
    };

    const events = ['click', 'touchstart', 'scroll', 'keydown', 'mousedown'];
    events.forEach(e => window.addEventListener(e, handleFirstInteraction, { once: true }));

    return () => {
      events.forEach(e => window.removeEventListener(e, handleFirstInteraction));
    };
  }, [isMounted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (audioRef.current.readyState < 2) {
          audioRef.current.load();
        }
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.log("Play failed:", err);
            // Fallback: try loading again
            audioRef.current!.load();
            audioRef.current!.play().then(() => setIsPlaying(true));
          });
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-2">
      <motion.div
        className={cn(
          "p-3 rounded-full shadow-lg backdrop-blur-md border-2 bg-accent-rose text-white border-accent-rose"
        )}
      >
        <Music size={20} />
      </motion.div>

      <motion.button
        onClick={toggleMute}
        className="p-3 rounded-full shadow-lg backdrop-blur-md bg-white/50 dark:bg-purple-900/50 text-romantic-purple-dark dark:text-romantic-lavender border-2 border-romantic-pink dark:border-purple-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>

      <audio 
        ref={audioRef}
        src="/audio/tumHoTo.mp3"
        loop
        preload="auto"
        onError={(e) => console.log("Audio failed:", e)}
      />
    </div>
  );
}
