import { NextResponse } from "next/server";

// Curated aesthetic catalogs
const AESTHETIC_CATALOG = {
  "golden-hour": {
    mood: "golden hour melancholia",
    pool: [
      "Mt. Joy Silver Lining",
      "Cigarettes After Sex Sunsetz",
      "Daniel Caesar Japanese Denim",
      "Mac DeMarco Chamber of Reflection",
      "Declan McKenna Brazil",
      "Caamp By and By",
      "Vance Joy Riptide",
      "Hollow Coves Coastline",
      "Lord Huron The Night We Met",
      "Gregory Alan Isakov San Luis",
      "Dayglow Can I Call You Tonight",
      "Boy Pablo Feeling Lonely",
      "Rex Orange County Sunflower",
      "Arlo Parks Eugene",
      "Ray LaMontagne You Are the Best Thing",
    ],
  },
  "coastal-ocean": {
    mood: "sun-drenched ocean shimmer",
    pool: [
      "Dominic Fike 3 Nights",
      "Still Woozy Goodie Bag",
      "Surfaces Sunday Best",
      "Ocean Alley Confidence",
      "Two Door Cinema Club What You Know",
      "Bakar Hell N Back",
      "Lime Cordiale Robbery",
      "Ziggy Alberts Lanie",
      "Sticky Fingers How to Fly",
      "Jack Johnson Banana Pancakes",
      "Remi Wolf Photo ID",
      "Jungle Keep Moving",
      "Surfaces Wave of You",
      "Dominic Fike Mona Lisa",
    ],
  },
  "lush-nature": {
    mood: "cinematic forest reverie",
    pool: [
      "Bon Iver Holocene",
      "Fleet Foxes White Winter Hymnal",
      "The Paper Kites Bloom",
      "Novo Amor Anchor",
      "SYML Where's My Love",
      "Ben Howard Only Love",
      "Jose Gonzalez Heartbeats",
      "Iron & Wine Flightless Bird",
      "Sufjan Stevens Mystery of Love",
      "Lord Huron Ends of the Earth",
      "Vance Joy Georgia",
      "Hollow Coves These Memories",
    ],
  },
  "nocturnal-neon": {
    mood: "nocturnal rooftop pulse",
    pool: [
      "M83 Midnight City",
      "The Weeknd After Hours",
      "Kavinsky Nightcall",
      "RÜFÜS DU SOL Innerbloom",
      "Gesaffelstein Lost in the Fire",
      "Lane 8 Brightest Lights",
      "SG Lewis Chemicals",
      "Fred again.. Delilah",
      "Bicep Glue",
      "KAYTRANADA 10%",
      "Disclosure Latch",
      "Channel Tres Topdown",
    ],
  },
  "midnight-city": {
    mood: "nocturnal city lights",
    pool: [
      "The Weeknd Starboy",
      "M83 Wait",
      "Kavinsky Pacific Coast Highway",
      "RÜFÜS DU SOL On My Knees",
      "Joji SLOW DANCING IN THE DARK",
      "Frank Ocean Nights",
      "Labrinth Mount Everest",
      "KAYTRANADA Vex Oh",
      "070 Shake Guilty Conscience",
      "The Neighbourhood Sweater Weather",
    ],
  },
  "cozy-evening": {
    mood: "warm analog warmth",
    pool: [
      "Leon Bridges Texas Sun",
      "Norah Jones Come Away With Me",
      "Khruangbin Texas Sun",
      "Bill Withers Lovely Day",
      "Men I Trust Show Me How",
      "Laufey From the Start",
      "Tom Misch Movie",
      "Corinne Bailey Rae Put Your Records On",
      "Chet Baker I Fall in Love Too Easily",
      "Lianne La Havas Green & Gold",
      "FKJ Ylang Ylang",
      "Bruno Major Easily",
    ],
  },
  "vintage-analog": {
    mood: "vintage afternoon haze",
    pool: [
      "Mac DeMarco My Kind of Woman",
      "Her's What Once Was",
      "Cuco Lover Is a Day",
      "Mild High Club Homage",
      "Boy Pablo Everytime",
      "Men I Trust Lauren",
      "Yellow Days A Little While",
      "King Krule Baby Blue",
      "Cosmo Pyke Chronic Sunshine",
      "Loving Only She Knows",
    ],
  },
  "dream-pop-magenta": {
    mood: "dream pop reverie",
    pool: [
      "Beach House Space Song",
      "Alvvays Dreams Tonite",
      "Clairo Sofia",
      "Wallows Are You Bored Yet",
      "The Marías Cariño",
      "TV Girl Lovers Rock",
      "Japanese Breakfast Be Sweet",
      "No Vacation Yam Yam",
      "Beach Fossils Down the Line",
      "Fazerdaze Lucky Girl",
    ],
  },
  "minimal-monochrome": {
    mood: "minimalist ambient haze",
    pool: [
      "The xx Intro",
      "Massive Attack Teardrop",
      "Portishead Glory Box",
      "Daughter Youth",
      "Four Tet Two Thousand and Seventeen",
      "Tycho Awake",
      "Radiohead Weird Fishes",
      "James Blake Retrograde",
      "London Grammar Strong",
      "RY X Berlin",
    ],
  },
  "sun-drenched": {
    mood: "sunlit summer euphoria",
    pool: [
      "Glass Animals Heat Waves",
      "Phoenix 1901",
      "Foster the People Sit Next to Me",
      "COIN Talk Too Much",
      "Passion Pit Take a Walk",
      "Bleachers I Wanna Get Better",
      "Grouplove Tongue Tied",
      "Vampire Weekend A-Punk",
      "Young the Giant Cough Syrup",
      "Saint Motel My Type",
    ],
  },
};

async function searchITunes(query, limit = 5) {
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      query
    )}&media=music&entity=song&limit=${limit}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Cantora/1.0",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("iTunes search error for query:", query, err);
    return [];
  }
}

async function findFiveTracks(queries) {
  const seenIds = new Set();
  const seenTitles = new Set();
  const tracks = [];

  for (const q of queries) {
    if (tracks.length >= 5) break;
    const results = await searchITunes(q, 6);
    for (const item of results) {
      const titleKey = `${item.trackName?.toLowerCase()}_${item.artistName?.toLowerCase()}`;
      if (
        item.previewUrl &&
        item.trackId &&
        !seenIds.has(String(item.trackId)) &&
        !seenTitles.has(titleKey)
      ) {
        seenIds.add(String(item.trackId));
        seenTitles.add(titleKey);

        const artworkUrl = item.artworkUrl100
          ? item.artworkUrl100.replace("100x100bb", "600x600bb")
          : item.artworkUrl100;

        tracks.push({
          id: String(item.trackId),
          title: item.trackName,
          artist: item.artistName,
          album: item.collectionName || item.trackName,
          artworkUrl: artworkUrl,
          previewUrl: item.previewUrl,
          duration: "0:30",
          vibe: q,
        });
        break;
      }
    }
  }

  // Backup queries if needed
  if (tracks.length < 5) {
    const fallbackQueries = [
      "indie acoustic",
      "dream pop",
      "warm chill",
      "summer acoustic",
      "r&b soul",
    ];
    for (const term of fallbackQueries) {
      if (tracks.length >= 5) break;
      const results = await searchITunes(term, 10);
      for (const item of results) {
        if (tracks.length >= 5) break;
        const titleKey = `${item.trackName?.toLowerCase()}_${item.artistName?.toLowerCase()}`;
        if (
          item.previewUrl &&
          item.trackId &&
          !seenIds.has(String(item.trackId)) &&
          !seenTitles.has(titleKey)
        ) {
          seenIds.add(String(item.trackId));
          seenTitles.add(titleKey);
          const artworkUrl = item.artworkUrl100
            ? item.artworkUrl100.replace("100x100bb", "600x600bb")
            : item.artworkUrl100;

          tracks.push({
            id: String(item.trackId),
            title: item.trackName,
            artist: item.artistName,
            album: item.collectionName || item.trackName,
            artworkUrl: artworkUrl,
            previewUrl: item.previewUrl,
            duration: "0:30",
            vibe: term,
          });
        }
      }
    }
  }

  return tracks.slice(0, 5);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      sampleMood,
      visualContext,
      refreshIndex = 0,
    } = body;

    let chosenKey = "golden-hour";

    if (sampleMood && AESTHETIC_CATALOG[sampleMood]) {
      chosenKey = sampleMood;
    } else if (visualContext?.vibeHint && AESTHETIC_CATALOG[visualContext.vibeHint]) {
      chosenKey = visualContext.vibeHint;
    } else if (visualContext?.isDark && visualContext?.primaryColor === "neon-purple") {
      chosenKey = "nocturnal-neon";
    } else if (visualContext?.isDark) {
      chosenKey = "midnight-city";
    } else if (visualContext?.primaryColor === "emerald") {
      chosenKey = "lush-nature";
    } else if (visualContext?.primaryColor === "ocean-blue") {
      chosenKey = "coastal-ocean";
    } else if (visualContext?.isWarm) {
      chosenKey = "golden-hour";
    }

    const aesthetic = AESTHETIC_CATALOG[chosenKey] || AESTHETIC_CATALOG["golden-hour"];
    const mood = aesthetic.mood;

    // Cycle through song pool on refresh
    const pool = aesthetic.pool;
    const baseSeed = (visualContext?.imageHash || 0) % pool.length;
    const offsetSeed = (baseSeed + refreshIndex * 5) % pool.length;

    const queries = [];
    for (let i = 0; i < 5; i++) {
      const index = (offsetSeed + i) % pool.length;
      queries.push(pool[index]);
    }

    // Retrieve real catalog tracks
    const tracks = await findFiveTracks(queries);

    return NextResponse.json({
      success: true,
      mood,
      tracks,
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
