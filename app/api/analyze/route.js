import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { image } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
 
    const base64Data = image.split(",")[1];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Data,
      },
    },
    {
      text: `
Analyze this image and recommend 5 songs that perfectly match its vibe.

Return only:

1. Song - Artist
2. Song - Artist
3. Song - Artist
4. Song - Artist
5. Song - Artist
`,
    },
  ],
});

    return Response.json({
      result: response.text,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}