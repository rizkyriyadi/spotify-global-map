Build a full-stack interactive web app using Next.js (App Router) that shows a Spotify Global Map.

Requirements:

Use React Simple Maps (or Mapbox) to display a world map.

Each country should be clickable. When clicked, it fetches the Spotify Top 50 chart for that country via the Spotify Web API and displays the list of tracks in a sidebar or modal.

For each track, display: cover art, track name, artist, and a play button for the 30-second preview (if available).

Add a mood/energy filter using Spotify Audio Features (danceability, energy, valence). User can filter songs by mood (Chill, Party, Sad).

Handle Spotify OAuth 2.0 authentication in Next.js API routes to get an access token. Store and refresh the token automatically.

Use Next.js API Routes under /app/api/* to handle backend logic (no external Express server).

Use TypeScript and TailwindCSS for styling.

UI/UX:

Fullscreen world map as homepage.

Hover over a country: show the top 3 tracks in a tooltip.

Click a country: open a sidebar/modal with the Top 50 list.

Include smooth animations (Framer Motion) for transitions.

Organize code with /components for reusable UI (Map, SongList, Filter).

Deploy-ready on Vercel.

Tech stack:

Next.js (App Router)

TypeScript

TailwindCSS

Spotify Web API

React Simple Maps or Mapbox

Zustand (for state management)

Framer Motion (animations)

Deliverables:

Fully working Next.js project with frontend + backend integrated.

/lib/spotify.ts helper for API calls.

/app/api/spotify/top50 route to fetch Top 50 playlist by country.

/app/api/spotify/features route to fetch audio features.

Responsive UI with dark mode.


here is key:
id=f8c7b6c3c03742f0bd1c62ff87b1473a
secre=18d1803c98624c93841f8a27a3869fd3
