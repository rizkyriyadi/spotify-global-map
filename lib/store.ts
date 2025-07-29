import { create } from 'zustand';
import { SpotifyTrack, AudioFeatures, MoodType } from './spotify';

interface AppState {
  selectedCountry: string | null;
  selectedCountryName: string | null;
  tracks: SpotifyTrack[];
  audioFeatures: AudioFeatures[];
  filteredTracks: SpotifyTrack[];
  currentMood: MoodType;
  isLoading: boolean;
  isSidebarOpen: boolean;
  hoveredCountry: string | null;
  hoveredTracks: SpotifyTrack[];
  currentlyPlaying: string | null;
  
  // Actions
  setSelectedCountry: (country: string | null, countryName: string | null) => void;
  setTracks: (tracks: SpotifyTrack[]) => void;
  setAudioFeatures: (features: AudioFeatures[]) => void;
  setFilteredTracks: (tracks: SpotifyTrack[]) => void;
  setCurrentMood: (mood: MoodType) => void;
  setIsLoading: (loading: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setHoveredCountry: (country: string | null) => void;
  setHoveredTracks: (tracks: SpotifyTrack[]) => void;
  setCurrentlyPlaying: (trackId: string | null) => void;
  resetState: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedCountry: null,
  selectedCountryName: null,
  tracks: [],
  audioFeatures: [],
  filteredTracks: [],
  currentMood: 'all',
  isLoading: false,
  isSidebarOpen: false,
  hoveredCountry: null,
  hoveredTracks: [],
  currentlyPlaying: null,
  
  setSelectedCountry: (country, countryName) => set({ selectedCountry: country, selectedCountryName: countryName }),
  setTracks: (tracks) => set((state) => ({ 
    tracks, 
    filteredTracks: tracks // Initially show all tracks
  })),
  setAudioFeatures: (features) => set((state) => {
    const { tracks, currentMood } = state;
    let filteredTracks = tracks;
    
    if (currentMood !== 'all') {
      if (features.length > 0) {
        // Use audio features for filtering
        filteredTracks = tracks.filter(track => {
          const trackFeatures = features.find(f => f.id === track.id);
          if (!trackFeatures) return true;
          
          switch (currentMood) {
            case 'party':
              return trackFeatures.energy > 0.7 && trackFeatures.danceability > 0.6;
            case 'chill':
              return trackFeatures.energy < 0.5 && trackFeatures.valence > 0.3;
            case 'sad':
              return trackFeatures.valence < 0.4;
            case 'energetic':
              return trackFeatures.energy > 0.8 && trackFeatures.danceability > 0.5;
            case 'romantic':
              return trackFeatures.valence > 0.5 && trackFeatures.energy < 0.6 && trackFeatures.acousticness > 0.3;
            case 'focus':
              return trackFeatures.instrumentalness > 0.3 && trackFeatures.energy < 0.7 && trackFeatures.speechiness < 0.3;
            case 'upbeat':
              return trackFeatures.valence > 0.6 && trackFeatures.energy > 0.6;
            default:
              return true;
          }
        });
      } else {
        // Fallback filtering using track/artist names
        filteredTracks = tracks.filter(track => {
          const trackName = track.name.toLowerCase();
          const artistNames = track.artists.map(a => a.name.toLowerCase()).join(' ');
          const searchText = `${trackName} ${artistNames}`;
          
          switch (currentMood) {
            case 'party':
              return /\b(party|dance|club|beat|pump|energy|hype|fire|lit|banger)\b/.test(searchText) ||
                     /\b(remix|mix|drop|bass|edm|electronic)\b/.test(searchText);
            case 'chill':
              return /\b(chill|relax|calm|soft|smooth|mellow|acoustic|ambient)\b/.test(searchText) ||
                     /\b(lounge|jazz|indie|folk|slow)\b/.test(searchText);
            case 'sad':
              return /\b(sad|cry|tear|heart|break|lonely|miss|hurt|pain|blue)\b/.test(searchText) ||
                     /\b(ballad|melancholy|sorrow|goodbye|lost)\b/.test(searchText);
            case 'energetic':
              return /\b(energetic|power|intense|strong|fierce|wild|explosive|dynamic)\b/.test(searchText) ||
                     /\b(rock|metal|punk|hardcore|aggressive)\b/.test(searchText);
            case 'romantic':
              return /\b(love|romantic|kiss|heart|sweet|tender|beautiful|forever)\b/.test(searchText) ||
                     /\b(valentine|wedding|couple|together|soul|angel)\b/.test(searchText);
            case 'focus':
              return /\b(focus|study|work|concentrate|meditation|ambient|minimal)\b/.test(searchText) ||
                     /\b(instrumental|classical|piano|strings|peaceful)\b/.test(searchText);
            case 'upbeat':
              return /\b(upbeat|happy|joy|fun|bright|positive|sunshine|smile)\b/.test(searchText) ||
                     /\b(good|great|amazing|wonderful|celebration|victory)\b/.test(searchText);
            default:
              return true;
          }
        });
      }
    }
    
    return { audioFeatures: features, filteredTracks };
  }),
  setFilteredTracks: (tracks) => set({ filteredTracks: tracks }),
  setCurrentMood: (mood) => set((state) => {
    const { tracks, audioFeatures } = state;
    let filteredTracks = tracks;
    
    if (mood !== 'all') {
      if (audioFeatures.length > 0) {
        // Use audio features for filtering
        filteredTracks = tracks.filter(track => {
          const features = audioFeatures.find(f => f.id === track.id);
          if (!features) return true;
          
          switch (mood) {
            case 'party':
              return features.energy > 0.7 && features.danceability > 0.6;
            case 'chill':
              return features.energy < 0.5 && features.valence > 0.3;
            case 'sad':
              return features.valence < 0.4;
            case 'energetic':
              return features.energy > 0.8 && features.danceability > 0.5;
            case 'romantic':
              return features.valence > 0.5 && features.energy < 0.6 && features.acousticness > 0.3;
            case 'focus':
              return features.instrumentalness > 0.3 && features.energy < 0.7 && features.speechiness < 0.3;
            case 'upbeat':
              return features.valence > 0.6 && features.energy > 0.6;
            default:
              return true;
          }
        });
      } else {
        // Fallback filtering using track/artist names
        filteredTracks = tracks.filter(track => {
          const trackName = track.name.toLowerCase();
          const artistNames = track.artists.map(a => a.name.toLowerCase()).join(' ');
          const searchText = `${trackName} ${artistNames}`;
          
          switch (mood) {
            case 'party':
              return /\b(party|dance|club|beat|pump|energy|hype|fire|lit|banger)\b/.test(searchText) ||
                     /\b(remix|mix|drop|bass|edm|electronic)\b/.test(searchText);
            case 'chill':
              return /\b(chill|relax|calm|soft|smooth|mellow|acoustic|ambient)\b/.test(searchText) ||
                     /\b(lounge|jazz|indie|folk|slow)\b/.test(searchText);
            case 'sad':
              return /\b(sad|cry|tear|heart|break|lonely|miss|hurt|pain|blue)\b/.test(searchText) ||
                     /\b(ballad|melancholy|sorrow|goodbye|lost)\b/.test(searchText);
            case 'energetic':
              return /\b(energetic|power|intense|strong|fierce|wild|explosive|dynamic)\b/.test(searchText) ||
                     /\b(rock|metal|punk|hardcore|aggressive)\b/.test(searchText);
            case 'romantic':
              return /\b(love|romantic|kiss|heart|sweet|tender|beautiful|forever)\b/.test(searchText) ||
                     /\b(valentine|wedding|couple|together|soul|angel)\b/.test(searchText);
            case 'focus':
              return /\b(focus|study|work|concentrate|meditation|ambient|minimal)\b/.test(searchText) ||
                     /\b(instrumental|classical|piano|strings|peaceful)\b/.test(searchText);
            case 'upbeat':
              return /\b(upbeat|happy|joy|fun|bright|positive|sunshine|smile)\b/.test(searchText) ||
                     /\b(good|great|amazing|wonderful|celebration|victory)\b/.test(searchText);
            default:
              return true;
          }
        });
      }
    }
    
    return { currentMood: mood, filteredTracks };
  }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setHoveredCountry: (country) => set({ hoveredCountry: country }),
  setHoveredTracks: (tracks) => set({ hoveredTracks: tracks }),
  setCurrentlyPlaying: (trackId) => set({ currentlyPlaying: trackId }),
  resetState: () => set({
    selectedCountry: null,
    selectedCountryName: null,
    tracks: [],
    audioFeatures: [],
    filteredTracks: [],
    currentMood: 'all',
    isLoading: false,
    isSidebarOpen: false,
    hoveredCountry: null,
    hoveredTracks: [],
    currentlyPlaying: null,
  }),
}));