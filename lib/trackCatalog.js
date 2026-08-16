/**
 * Curated, verified track definitions for every aesthetic mood
 */
export const MOOD_MAPPINGS = {
  // Sunset & Golden hour variants
  "golden hour melancholia": "golden-hour",
  "golden-hour": "golden-hour",
  "sunset": "golden-hour",
  "warm": "golden-hour",

  // Coastal / Beach variants
  "sun-drenched ocean shimmer": "coastal-ocean",
  "coastal-ocean": "coastal-ocean",
  "ocean": "coastal-ocean",
  "beach": "coastal-ocean",
  "sun-drenched": "coastal-ocean",

  // Nature / Forest variants
  "cinematic forest reverie": "lush-nature",
  "lush-nature": "lush-nature",
  "forest": "lush-nature",
  "nature": "lush-nature",
  "mountain": "lush-nature",

  // Night / City / Neon variants
  "nocturnal rooftop pulse": "nocturnal-neon",
  "nocturnal-neon": "nocturnal-neon",
  "nocturnal city lights": "nocturnal-neon",
  "midnight-city": "nocturnal-neon",
  "night": "nocturnal-neon",
  "neon": "nocturnal-neon",

  // Cozy Cafe / Vintage variants
  "warm analog warmth": "cozy-evening",
  "cozy-evening": "cozy-evening",
  "vintage-analog": "cozy-evening",
  "cafe": "cozy-evening",
  "coffee": "cozy-evening",
};

export const VERIFIED_TRACK_POOLS = {
  "golden-hour": {
    mood: "golden hour melancholia",
    batches: [
      // Batch 1
      [
        { title: "Silver Lining", artist: "Mt. Joy" },
        { title: "Sunsetz", artist: "Cigarettes After Sex" },
        { title: "Chamber Of Reflection", artist: "Mac DeMarco" },
        { title: "Brazil", artist: "Declan McKenna" },
        { title: "Get You", artist: "Daniel Caesar" },
      ],
      // Batch 2 (Refresh 1)
      [
        { title: "By and By", artist: "Caamp" },
        { title: "Riptide", artist: "Vance Joy" },
        { title: "Coastline", artist: "Hollow Coves" },
        { title: "The Night We Met", artist: "Lord Huron" },
        { title: "San Luis", artist: "Gregory Alan Isakov" },
      ],
      // Batch 3 (Refresh 2)
      [
        { title: "Can I Call You Tonight?", artist: "Dayglow" },
        { title: "Feeling Lonely", artist: "boy pablo" },
        { title: "Sunflower", artist: "Rex Orange County" },
        { title: "Texas Sun", artist: "Leon Bridges" },
        { title: "You Are the Best Thing", artist: "Ray LaMontagne" },
      ],
    ],
  },

  "coastal-ocean": {
    mood: "sun-drenched ocean shimmer",
    batches: [
      // Batch 1
      [
        { title: "3 Nights", artist: "Dominic Fike" },
        { title: "Goodie Bag", artist: "Still Woozy" },
        { title: "Sunday Best", artist: "Surfaces" },
        { title: "Confidence", artist: "Ocean Alley" },
        { title: "What You Know", artist: "Two Door Cinema Club" },
      ],
      // Batch 2
      [
        { title: "Robbery", artist: "Lime Cordiale" },
        { title: "How to Fly", artist: "Sticky Fingers" },
        { title: "Banana Pancakes", artist: "Jack Johnson" },
        { title: "Hell N Back", artist: "Bakar" },
        { title: "Photo ID", artist: "Remi Wolf" },
      ],
      // Batch 3
      [
        { title: "Wave of You", artist: "Surfaces" },
        { title: "Mona Lisa", artist: "Dominic Fike" },
        { title: "Alrighty Aphrodite", artist: "Peach Pit" },
        { title: "Scrawny", artist: "Wallows" },
        { title: "Way It Goes", artist: "Hippo Campus" },
      ],
    ],
  },

  "lush-nature": {
    mood: "cinematic forest reverie",
    batches: [
      // Batch 1
      [
        { title: "Holocene", artist: "Bon Iver" },
        { title: "White Winter Hymnal", artist: "Fleet Foxes" },
        { title: "Bloom", artist: "The Paper Kites" },
        { title: "Anchor", artist: "Novo Amor" },
        { title: "Where's My Love", artist: "SYML" },
      ],
      // Batch 2
      [
        { title: "Only Love", artist: "Ben Howard" },
        { title: "Flightless Bird, American Mouth", artist: "Iron & Wine" },
        { title: "Ends of the Earth", artist: "Lord Huron" },
        { title: "Mystery of Love", artist: "Sufjan Stevens" },
        { title: "Heartbeats", artist: "Jose Gonzalez" },
      ],
      // Batch 3
      [
        { title: "Georgia", artist: "Vance Joy" },
        { title: "These Memories", artist: "Hollow Coves" },
        { title: "Big Black Car", artist: "Gregory Alan Isakov" },
        { title: "Ophelia", artist: "The Lumineers" },
        { title: "Skinny Love", artist: "Bon Iver" },
      ],
    ],
  },

  "nocturnal-neon": {
    mood: "nocturnal rooftop pulse",
    batches: [
      // Batch 1
      [
        { title: "Midnight City", artist: "M83" },
        { title: "After Hours", artist: "The Weeknd" },
        { title: "Nightcall", artist: "Kavinsky" },
        { title: "Innerbloom", artist: "RÜFÜS DU SOL" },
        { title: "Glue", artist: "Bicep" },
      ],
      // Batch 2
      [
        { title: "Latch", artist: "Disclosure" },
        { title: "Brightest Lights", artist: "Lane 8" },
        { title: "10%", artist: "KAYTRANADA" },
        { title: "Chemicals", artist: "SG Lewis" },
        { title: "Delilah (pull me out of this)", artist: "Fred again.." },
      ],
      // Batch 3
      [
        { title: "Starboy", artist: "The Weeknd" },
        { title: "SLOW DANCING IN THE DARK", artist: "Joji" },
        { title: "On My Knees", artist: "RÜFÜS DU SOL" },
        { title: "Sweater Weather", artist: "The Neighbourhood" },
        { title: "Topdown", artist: "Channel Tres" },
      ],
    ],
  },

  "cozy-evening": {
    mood: "warm analog warmth",
    batches: [
      // Batch 1
      [
        { title: "Come Away With Me", artist: "Norah Jones" },
        { title: "Lovely Day", artist: "Bill Withers" },
        { title: "From The Start", artist: "Laufey" },
        { title: "Show Me How", artist: "Men I Trust" },
        { title: "Movie", artist: "Tom Misch" },
      ],
      // Batch 2
      [
        { title: "Put Your Records On", artist: "Corinne Bailey Rae" },
        { title: "Green & Gold", artist: "Lianne La Havas" },
        { title: "Ylang Ylang", artist: "FKJ" },
        { title: "Easily", artist: "Bruno Major" },
        { title: "My Kind of Woman", artist: "Mac DeMarco" },
      ],
      // Batch 3
      [
        { title: "I Fall in Love Too Easily", artist: "Chet Baker" },
        { title: "Texas Sun", artist: "Khruangbin" },
        { title: "Lover Is a Day", artist: "Cuco" },
        { title: "Show Me How", artist: "Men I Trust" },
        { title: "Sunday Morning", artist: "Maroon 5" },
      ],
    ],
  },
};
