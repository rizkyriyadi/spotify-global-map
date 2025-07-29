# Spotify Global Map

An interactive web application that displays a world map where users can click on countries to explore their Spotify Top 50 charts. Built with Next.js, TypeScript, and the Spotify Web API.

## 🌐 Live Demo

**Try it now:** [https://spotify-global-map.vercel.app/](https://spotify-global-map.vercel.app/)

Click on any green country to explore its music and experience the interactive animations!

## Features

- 🗺️ Interactive world map with clickable countries
- 🎵 Spotify Top 50 charts for each country
- 🎭 Mood-based filtering (Party, Chill, Sad, Energetic, Romantic, Focus, Upbeat)
- ▶️ 30-second track previews
- 📱 Responsive design with dark mode
- ✨ **Enhanced Animations & Visual Effects:**
  - 🌟 Pulsing country animations (available, selected, playing states)
  - 💫 Click ripple effects
  - 🎵 Floating musical notes around active countries
  - 🌈 Dynamic gradient background animation
- 🔗 Direct links to Spotify tracks

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Maps**: React Simple Maps
- **Animations**: Framer Motion
- **API**: Spotify Web API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Spotify Developer Account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spotify-global-map
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with your Spotify API credentials:
```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Getting Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy the Client ID and Client Secret
4. Add `http://localhost:3000` to the Redirect URIs

## Project Structure

```
├── app/
│   ├── api/
│   │   └── spotify/
│   │       ├── top50/
│   │       └── features/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CountryTooltip.tsx
│   ├── FloatingNotes.tsx
│   ├── MoodFilter.tsx
│   ├── RippleEffect.tsx
│   ├── Sidebar.tsx
│   ├── SongList.tsx
│   └── WorldMap.tsx
├── lib/
│   ├── spotify.ts
│   └── store.ts
└── ...
```

## API Routes

- `GET /api/spotify/top50?country=US` - Fetch Top 50 tracks for a country
- `POST /api/spotify/features` - Fetch audio features for tracks

## Deployment

The app is ready to deploy on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.