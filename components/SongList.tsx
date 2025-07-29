'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { SpotifyTrack } from '@/lib/spotify';

interface TrackItemProps {
  track: SpotifyTrack;
  index: number;
}

function TrackItem({ track, index }: TrackItemProps) {
  const { currentlyPlaying, setCurrentlyPlaying } = useAppStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!track.preview_url) return;

    if (currentlyPlaying === track.id) {
      // Pause current track
      audioRef.current?.pause();
      setCurrentlyPlaying(null);
      setIsPlaying(false);
    } else {
      // Stop any other playing track
      if (currentlyPlaying) {
        setCurrentlyPlaying(null);
      }
      
      // Play this track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setCurrentlyPlaying(track.id);
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnd = () => {
    setCurrentlyPlaying(null);
    setIsPlaying(false);
  };

  const isCurrentlyPlaying = currentlyPlaying === track.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="track-item"
    >
      <div className="flex items-center space-x-3 flex-1">
        <span className="text-gray-400 text-sm w-6">{index + 1}</span>
        
        <div className="relative w-12 h-12 flex-shrink-0">
          <img
            src={track.album.images[0]?.url || '/placeholder-album.png'}
            alt={track.album.name}
            className="w-full h-full object-cover rounded"
          />
          {track.preview_url && (
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded"
            >
              {isCurrentlyPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </button>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate">{track.name}</h4>
          <p className="text-gray-400 text-sm truncate">
            {track.artists.map(artist => artist.name).join(', ')}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {track.preview_url && (
          <button
            onClick={handlePlayPause}
            className="play-button"
            title={isCurrentlyPlaying ? 'Pause' : 'Play preview'}
          >
            {isCurrentlyPlaying ? (
              <Pause className="w-4 h-4 text-black" />
            ) : (
              <Play className="w-4 h-4 text-black" />
            )}
          </button>
        )}
        
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          title="Open in Spotify"
        >
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </a>
      </div>
      
      {track.preview_url && (
        <audio
          ref={audioRef}
          src={track.preview_url}
          onEnded={handleAudioEnd}
          preload="none"
        />
      )}
    </motion.div>
  );
}

export function SongList() {
  const { filteredTracks } = useAppStore();

  if (filteredTracks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <div className="text-center">
          <p className="text-gray-400 mb-2">No tracks found</p>
          <p className="text-gray-500 text-sm">Try selecting a different country or mood filter</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-2 overflow-y-auto h-full">
      {filteredTracks.map((track, index) => (
        <TrackItem key={track.id} track={track} index={index} />
      ))}
    </div>
  );
}