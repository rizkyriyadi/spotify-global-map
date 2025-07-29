'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CountryTooltipProps {
  x: number;
  y: number;
  country: string;
}

export function CountryTooltip({ x, y, country }: CountryTooltipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="fixed z-50 pointer-events-none"
      style={{
        left: x + 10,
        top: y - 10,
      }}
    >
      <div className="bg-spotify-dark border border-gray-600 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-white text-sm font-medium">{country}</p>
        <p className="text-gray-400 text-xs">Click to view Top 50</p>
      </div>
    </motion.div>
  );
}