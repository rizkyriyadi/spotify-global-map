'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { MoodType } from '@/lib/spotify';

const moodOptions: { value: MoodType; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '🎵' },
  { value: 'party', label: 'Party', emoji: '🎉' },
  { value: 'chill', label: 'Chill', emoji: '😌' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'energetic', label: 'Energetic', emoji: '⚡' },
  { value: 'romantic', label: 'Romantic', emoji: '💕' },
  { value: 'focus', label: 'Focus', emoji: '🎯' },
  { value: 'upbeat', label: 'Upbeat', emoji: '🌟' },
];

export function MoodFilter() {
  const { currentMood, setCurrentMood } = useAppStore();

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-300 mb-3">Filter by Mood</h3>
      <div className="flex flex-wrap gap-2">
        {moodOptions.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setCurrentMood(mood.value)}
            className={`filter-button ${
              currentMood === mood.value ? 'filter-button-active' : ''
            }`}
          >
            <span className="mr-1">{mood.emoji}</span>
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
}