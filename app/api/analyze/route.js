import { NextResponse } from "next/server";
import { VERIFIED_CATALOG, MOOD_MAPPINGS } from "@/lib/trackCatalog";

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
    } else if (visualContext?.primaryColor === "emerald" || (visualContext?.stats?.natureGreen > 300)) {
      categoryKey = "lush-nature";
    } else if (visualContext?.primaryColor === "ocean-blue" || (visualContext?.stats?.skyOcean > 300)) {
      categoryKey = "coastal-ocean";
    } else if (visualContext?.isWarm || (visualContext?.stats?.sunsetGold > 200)) {
      categoryKey = "golden-hour";
    }

    const categoryData = VERIFIED_CATALOG[categoryKey] || VERIFIED_CATALOG["golden-hour"];
    const mood = categoryData.mood;

    // Select the batch based on refresh count
    const batchList = categoryData.batches;
    const batchIndex = Math.abs(refreshIndex) % batchList.length;
    const tracks = batchList[batchIndex];

    return NextResponse.json({
      success: true,
      mood,
      category: categoryKey,
      batch: batchIndex + 1,
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
