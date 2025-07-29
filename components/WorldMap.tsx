'use client';

import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { CountryTooltip } from './CountryTooltip';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Country code mapping for Spotify API
const countryCodeMap: { [key: string]: string } = {
  'United States of America': 'US',
  'United Kingdom': 'GB',
  'Germany': 'DE',
  'France': 'FR',
  'Spain': 'ES',
  'Italy': 'IT',
  'Netherlands': 'NL',
  'Sweden': 'SE',
  'Norway': 'NO',
  'Denmark': 'DK',
  'Finland': 'FI',
  'Poland': 'PL',
  'Brazil': 'BR',
  'Mexico': 'MX',
  'Canada': 'CA',
  'Australia': 'AU',
  'Japan': 'JP',
  'South Korea': 'KR',
  'India': 'IN',
  'Argentina': 'AR',
  'Chile': 'CL',
  'Colombia': 'CO',
  'Turkey': 'TR',
  'Russia': 'RU',
  'China': 'CN',
  'Thailand': 'TH',
  'Philippines': 'PH',
  'Indonesia': 'ID',
  'Malaysia': 'MY',
  'Singapore': 'SG',
  'South Africa': 'ZA',
  'Egypt': 'EG',
  'Israel': 'IL',
  'United Arab Emirates': 'AE',
  'Saudi Arabia': 'SA',
  'Portugal': 'PT',
  'Belgium': 'BE',
  'Austria': 'AT',
  'Switzerland': 'CH',
  'Ireland': 'IE',
  'New Zealand': 'NZ',
  'Greece': 'GR',
  'Czech Republic': 'CZ',
  'Hungary': 'HU',
  'Romania': 'RO',
  'Bulgaria': 'BG',
  'Croatia': 'HR',
  'Slovakia': 'SK',
  'Slovenia': 'SI',
  'Estonia': 'EE',
  'Latvia': 'LV',
  'Lithuania': 'LT',
  'Iceland': 'IS',
  'Luxembourg': 'LU',
  'Malta': 'MT',
  'Cyprus': 'CY',
};

interface TooltipState {
  show: boolean;
  x: number;
  y: number;
  country: string;
}

export function WorldMap() {
  const {
    setSelectedCountry,
    setSidebarOpen,
    setIsLoading,
    setHoveredCountry,
    hoveredCountry,
    setTracks,
    setAudioFeatures,
  } = useAppStore();

  const [tooltip, setTooltip] = useState<TooltipState>({
    show: false,
    x: 0,
    y: 0,
    country: '',
  });

  const handleCountryClick = async (geo: any) => {
    const countryName = geo.properties.name;
    const countryCode = countryCodeMap[countryName];

    if (!countryCode) {
      console.warn(`Country code not found for: ${countryName}`);
      return;
    }

    setIsLoading(true);
    setSelectedCountry(countryCode, countryName);
    setSidebarOpen(true);

    try {
      // Fetch tracks for the selected country
      const response = await fetch(`/api/spotify/top50?country=${countryCode}`);
      const data = await response.json();
      
      if (data.tracks) {
        // Store tracks in the store
        setTracks(data.tracks);
        
        // Fetch audio features
        const trackIds = data.tracks.map((track: any) => track.id).filter(Boolean);
        
        if (trackIds.length > 0) {
          try {
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
          } catch (featuresError) {
            console.warn('Audio features not available, mood filtering will use fallback logic');
            // Set empty audio features array to enable fallback mood filtering
            setAudioFeatures([]);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching country data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseEnter = (geo: any, event: React.MouseEvent) => {
    const countryName = geo.properties.name;
    const countryCode = countryCodeMap[countryName];
    
    if (countryCode) {
      setHoveredCountry(countryCode);
      setTooltip({
        show: true,
        x: event.clientX,
        y: event.clientY,
        country: countryName,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
    setTooltip({ show: false, x: 0, y: 0, country: '' });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltip.show) {
      setTooltip(prev => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
      }));
    }
  };

  return (
    <div className="map-container" onMouseMove={handleMouseMove}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            center: [0, 20],
          }}
          className="w-full h-full"
        >
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const countryCode = countryCodeMap[countryName];
                  const isAvailable = !!countryCode;
                  const isHovered = hoveredCountry === countryCode;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => isAvailable && handleCountryClick(geo)}
                      onMouseEnter={(event) => isAvailable && handleMouseEnter(geo, event)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: {
                          fill: isAvailable ? '#1DB954' : '#535353',
                          stroke: '#191414',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        hover: {
                          fill: isAvailable ? '#1ed760' : '#535353',
                          stroke: '#191414',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        pressed: {
                          fill: isAvailable ? '#169c46' : '#535353',
                          stroke: '#191414',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                      }}
                      className={`country-path ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'} ${isHovered ? 'brightness-110' : ''}`}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </motion.div>

      {tooltip.show && (
        <CountryTooltip
          x={tooltip.x}
          y={tooltip.y}
          country={tooltip.country}
        />
      )}
    </div>
  );
}