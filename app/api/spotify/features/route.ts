import { NextRequest, NextResponse } from 'next/server';
import { spotifyAPI } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { trackIds } = await request.json();

    if (!trackIds || !Array.isArray(trackIds)) {
      return NextResponse.json(
        { error: 'Track IDs array is required' },
        { status: 400 }
      );
    }

    const features = await spotifyAPI.getAudioFeatures(trackIds);
    
    return NextResponse.json({ features });
  } catch (error) {
    console.error('Error fetching audio features:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audio features' },
      { status: 500 }
    );
  }
}