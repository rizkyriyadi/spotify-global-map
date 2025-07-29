'use client';

import React, { useEffect } from 'react';
import { WorldMap } from '@/components/WorldMap';
import { Sidebar } from '@/components/Sidebar';
import { useAppStore } from '@/lib/store';
import { spotifyAPI } from '@/lib/spotify';

export default function Home() {
  const {
    tracks,
    audioFeatures,
    currentMood,
    setTracks,
    setAudioFeatures,
    setFilteredTracks,
    selectedCountry,
  } = useAppStore();

  // Filter tracks when mood changes or tracks/features update
  useEffect(() => {
    if (tracks.length > 0 && audioFeatures.length > 0) {
      const filtered = spotifyAPI.filterTracksByMood(tracks, audioFeatures, currentMood);
      setFilteredTracks(filtered);
    }
  }, [tracks, audioFeatures, currentMood, setFilteredTracks]);

  // Fetch data when country is selected
  useEffect(() => {
    if (!selectedCountry) return;

    const fetchCountryData = async () => {
      try {
        // Fetch tracks
        const tracksResponse = await fetch(`/api/spotify/top50?country=${selectedCountry}`);
        const tracksData = await tracksResponse.json();
        
        if (tracksData.tracks) {
          setTracks(tracksData.tracks);
          
          // Fetch audio features
          const trackIds = tracksData.tracks.map((track: any) => track.id).filter(Boolean);
          
          if (trackIds.length > 0) {
            const featuresResponse = await fetch('/api/spotify/features', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ trackIds }),
            });
            
            const featuresData = await featuresResponse.json();
            if (featuresData.features) {
              setAudioFeatures(featuresData.features);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountryData();
  }, [selectedCountry, setTracks, setAudioFeatures]);

  return (
    <main className="relative w-full h-screen bg-spotify-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Spotify Global Map
            </h1>
            <p className="text-gray-400">
              Explore Top 50 charts from around the world
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-400">
              Click on a green country to explore its music
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <WorldMap />
      
      {/* Sidebar */}
      <Sidebar />
    </main>
  );
}