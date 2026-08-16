/**
 * Curated preset sample photos for instant testing
 */
export const SAMPLE_PHOTOS = [
  {
    id: "sample-golden-hour",
    title: "Golden Hour Ocean",
    mood: "golden hour melancholia",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1080&q=80",
    description: "Warm amber sun setting over calm ocean waves.",
  },
  {
    id: "sample-urban-night",
    title: "Midnight City Lights",
    mood: "nocturnal rooftop pulse",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1080&q=80",
    description: "Deep violet & cobalt skyline bokeh from an urban terrace.",
  },
  {
    id: "sample-vintage-cafe",
    title: "Afternoon Espresso",
    mood: "warm analog warmth",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1080&q=80",
    description: "Sun-dappled wooden table, matcha latte, and open notebook.",
  },
  {
    id: "sample-mountain-fog",
    title: "Misty Pine Ridge",
    mood: "cinematic ambient haze",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80",
    description: "Ethereal fog drifting over deep emerald alpine forest.",
  }
];

/**
 * Curated 5-song recommendation sets tailored to specific moods
 */
export const MOCK_RECOMMENDATION_SETS = {
  "golden hour melancholia": [
    {
      id: "track-1",
      title: "Silver Lining",
      artist: "Mt. Joy",
      album: "Mt. Joy",
      artworkUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=300&q=80",
      vibe: "Warm folk-rock, sun-drenched acoustic",
      duration: "0:30",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4a/aa/48/4aaa48fc-4ea6-1f90-1c09-0fa71ae9281f/mzaf_1044437435165971485.plus.aac.p.m4a",
    },
    {
      id: "track-2",
      title: "Sunsetz",
      artist: "Cigarettes After Sex",
      album: "Cigarettes After Sex",
      artworkUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80",
      vibe: "Dream pop, reverb-drenched intimacy",
      duration: "0:30",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/4e/a3/62/4ea36267-be3e-63f2-d66a-2ee5bb146313/mzaf_7820150912384725049.plus.aac.p.m4a",
    },
    {
      id: "track-3",
      title: "Japanese Denim",
      artist: "Daniel Caesar",
      album: "Get You - Single",
      artworkUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80",
      vibe: "Soulful R&B, slow-burning guitar",
      duration: "0:30",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/36/ae/53/36ae53e4-bf4b-e3c3-3e11-196d45377505/mzaf_18287799298457811900.plus.aac.p.m4a",
    },
    {
      id: "track-4",
      title: "Chamber of Reflection",
      artist: "Mac DeMarco",
      album: "Salad Days",
      artworkUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
      vibe: "Hypnotic vintage synth, lo-fi indie",
      duration: "0:30",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bf/25/74/bf2574e4-b788-bbf7-1065-27a3a9ecf359/mzaf_8496464521783471018.plus.aac.p.m4a",
    },
    {
      id: "track-5",
      title: "Brazil",
      artist: "Declan McKenna",
      album: "What Do You Think About the Car?",
      artworkUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80",
      vibe: "Upbeat indie summer shimmer",
      duration: "0:30",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b9/3e/26/b93e2646-81c1-4ca7-4977-cfb528b74681/mzaf_5935399581729606822.plus.aac.p.m4a",
    },
  ],
  "default": [
    {
      id: "track-def-1",
      title: "Telepatía",
      artist: "Kali Uchis",
      album: "Sin Miedo",
      artworkUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
      vibe: "Sensual Latin dream pop, effortless groove",
      duration: "0:30",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/c3/8c/fb/c38cfb3d-1854-4a00-50d4-1a9fb9e19485/mzaf_10526017326265744883.plus.aac.p.m4a",
    },
    {
      id: "track-def-2",
      title: "Midnight City",
      artist: "M83",
      album: "Hurry Up, We're Dreaming",
      artworkUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80",
      vibe: "Euphoric synthwave, cinematic drive",
      duration: "0:30",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/71/3e/32/713e32b4-5ee8-963d-4c3e-8f24b17646c2/mzaf_15783359005085878788.plus.aac.p.m4a",
    },
    {
      id: "track-def-3",
      title: "After the Storm",
      artist: "Kali Uchis feat. Tyler, The Creator",
      album: "Isolation",
      artworkUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80",
      vibe: "Funky neo-soul, mellow confidence",
      duration: "0:30",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/4c/8c/d7/4c8cd766-2ce9-cf4d-ec16-a19e48df56ff/mzaf_677271839088656157.plus.aac.p.m4a",
    },
    {
      id: "track-def-4",
      title: "Motion Sickness",
      artist: "Phoebe Bridgers",
      album: "Stranger in the Alps",
      artworkUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=300&q=80",
      vibe: "Cathartic indie folk, reflective lyrics",
      duration: "0:30",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c7/e9/c6/c7e9c6b7-dc71-c068-d0df-a92c30be6281/mzaf_1291884487856475735.plus.aac.p.m4a",
    },
    {
      id: "track-def-5",
      title: "Resonance",
      artist: "HOME",
      album: "Odyssey",
      artworkUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80",
      vibe: "Nostalgic chillwave, golden warmth",
      duration: "0:30",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/7e/6a/d0/7e6ad0b1-0985-78e8-d44b-4f937e0e7a2b/mzaf_17208154148154117075.plus.aac.p.m4a",
    }
  ]
};

/**
 * Helper to generate a realistic mock mood and 5 tracks based on input
 */
export function getMockRecommendations(moodOverride) {
  if (moodOverride && MOCK_RECOMMENDATION_SETS[moodOverride]) {
    return {
      mood: moodOverride,
      tracks: MOCK_RECOMMENDATION_SETS[moodOverride],
    };
  }
  return {
    mood: "golden hour melancholia",
    tracks: MOCK_RECOMMENDATION_SETS["golden hour melancholia"],
  };
}
