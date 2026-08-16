import { NextResponse } from "next/server";
import { MOOD_MAPPINGS, VERIFIED_TRACK_POOLS } from "@/lib/trackCatalog";

async function fetchExactTrack(title, artist) {
  try {
    const query = `${artist} ${title}`;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      query
    )}&media=music&entity=song&limit=15`;

    const res = await fetch(url, {
      headers: { "User-Agent": "Cantora/1.0" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    const results = data.results || [];

    const artistKeyword = artist.toLowerCase().split(" ")[0];
    const titleKeyword = title.toLowerCase().split(" ")[0];

    // Priority 1: Match both artist keyword and title keyword
    let match = results.find(
      (item) =>
        item.previewUrl &&
        item.artistName?.toLowerCase().includes(artistKeyword) &&
        item.trackName?.toLowerCase().includes(titleKeyword)
    );

    // Priority 2: Match artist keyword with preview
    if (!match) {
      match = results.find(
        (item) =>
          item.previewUrl &&
          item.artistName?.toLowerCase().includes(artistKeyword)
      );
    }

    // Priority 3: First valid candidate with preview
    if (!match) {
      match = results.find((item) => item.previewUrl);
    }

    if (match) {
      const artworkUrl = match.artworkUrl100
        ? match.artworkUrl100.replace("100x100bb", "600x600bb")
        : match.artworkUrl100;

      return {
        id: String(match.trackId),
        title: match.trackName,
        artist: match.artistName,
        album: match.collectionName || match.trackName,
        artworkUrl,
        previewUrl: match.previewUrl,
        duration: "0:30",
        vibe: `${title} - ${artist}`,
      };
    }
    return null;
  } catch (err) {
    console.error(`Error looking up track ${title} by ${artist}:`, err);
    return null;
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { sampleMood, visualContext, refreshIndex = 0 } = body;

    // Resolve aesthetic category key
    let categoryKey = "golden-hour";

    if (sampleMood && MOOD_MAPPINGS[sampleMood.toLowerCase()]) {
      categoryKey = MOOD_MAPPINGS[sampleMood.toLowerCase()];
    } else if (visualContext?.vibeHint && MOOD_MAPPINGS[visualContext.vibeHint.toLowerCase()]) {
      categoryKey = MOOD_MAPPINGS[visualContext.vibeHint.toLowerCase()];
    } else if (visualContext?.isDark && visualContext?.primaryColor === "neon-purple") {
      categoryKey = "nocturnal-neon";
    } else if (visualContext?.isDark) {
      categoryKey = "nocturnal-neon";
    } else if (visualContext?.primaryColor === "emerald") {
      categoryKey = "lush-nature";
    } else if (visualContext?.primaryColor === "ocean-blue") {
      categoryKey = "coastal-ocean";
    } else if (visualContext?.isWarm) {
      categoryKey = "golden-hour";
    }

    const pool = VERIFIED_TRACK_POOLS[categoryKey] || VERIFIED_TRACK_POOLS["golden-hour"];
    const mood = pool.mood;

    // Select the batch based on refresh count
    const batchList = pool.batches;
    const batchIndex = Math.abs(refreshIndex) % batchList.length;
    const targetSongList = batchList[batchIndex];

    // Fetch exact track data in parallel
    const trackPromises = targetSongList.map((s) => fetchExactTrack(s.title, s.artist));
    const fetchedTracks = await Promise.all(trackPromises);

    // Filter out nulls
    const validTracks = fetchedTracks.filter(Boolean);

    // Ensure we return 5 tracks
    if (validTracks.length < 5) {
      // Fill from batch 0 if needed
      const fallbackList = batchList[0];
      for (const fb of fallbackList) {
        if (validTracks.length >= 5) break;
        if (!validTracks.some((t) => t.title.toLowerCase().includes(fb.title.toLowerCase()))) {
          const t = await fetchExactTrack(fb.title, fb.artist);
          if (t) validTracks.push(t);
        }
      }
    }

    return NextResponse.json({
      success: true,
      mood,
      category: categoryKey,
      batch: batchIndex + 1,
      tracks: validTracks.slice(0, 5),
    });
  } catch (error) {
    console.error("Analyze route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to analyze photo",
      },
      { status: 500 }
    );
  }
}
