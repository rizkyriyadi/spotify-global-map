'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingNotesProps {
  show: boolean;
  centerX: number;
  centerY: number;
}

const musicNotes = ['♪', '♫', '♬', '♩', '♭', '♯'];

export function FloatingNotes({ show, centerX, centerY }: FloatingNotesProps) {
  if (!show) return null;

  return (
    <div className="fixed pointer-events-none z-40" style={{ left: centerX - 100, top: centerY - 100 }}>
      {Array.from({ length: 6 }).map((_, index) => {
        const angle = (index * 60) * (Math.PI / 180); // 60 degrees apart
        const radius = 60 + Math.random() * 40; // Random radius between 60-100px
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const note = musicNotes[index % musicNotes.length];
        const delay = index * 0.2;

        return (
          <motion.div
            key={index}
            className="absolute text-spotify-green text-xl font-bold"
            style={{
              left: 100 + x,
              top: 100 + y,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0.8],
              rotate: [0, 360],
              y: [0, -20, -40, -60],
            }}
            transition={{
              duration: 3,
              delay,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
          >
            {note}
          </motion.div>
        );
      })}
    </div>
  );
}