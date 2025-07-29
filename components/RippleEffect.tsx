'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RippleEffectProps {
  x: number;
  y: number;
  trigger: boolean;
  onComplete?: () => void;
}

export function RippleEffect({ x, y, trigger, onComplete }: RippleEffectProps) {
  const [showRipple, setShowRipple] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShowRipple(true);
      const timer = setTimeout(() => {
        setShowRipple(false);
        onComplete?.();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {showRipple && (
        <motion.div
          className="fixed pointer-events-none z-50"
          style={{
            left: x - 25,
            top: y - 25,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="w-12 h-12 rounded-full border-2 border-spotify-green bg-spotify-green/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}