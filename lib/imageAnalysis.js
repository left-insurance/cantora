/**
 * Client-side visual analysis extracting color warmth, dominant hues,
 * saturation, contrast, and precise aesthetic vibe tags from an image.
 */
export async function extractVisualContext(imageSrc) {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve({
            isWarm: true,
            isDark: false,
            vibeHint: "golden-hour",
            brightness: 0.5,
            primaryColor: "gold",
            imageHash: 12345,
          });
        }

        // 64x64 sampling grid
        const width = 64;
        const height = 64;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        let totalR = 0;
        let totalG = 0;
        let totalB = 0;
        let totalBrightness = 0;
        let totalSaturation = 0;

        // Color bins
        let sunsetGoldCount = 0;   // Orange/Amber (15-55 deg)
        let skyOceanCount = 0;     // Cyan/Blue (170-250 deg)
        let natureGreenCount = 0;  // Green (75-165 deg)
        let neonPurplePink = 0;    // Magenta/Purple/Pink (260-340 deg)
        let deepRedCount = 0;      // Crimson/Red (340-15 deg)
        let grayscaleCount = 0;    // Low saturation (< 0.15)
        let darkPixelCount = 0;    // Brightness < 0.2
        let brightPixelCount = 0;  // Brightness > 0.75

        const totalPixels = width * height;
        let hash = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          totalR += r;
          totalG += g;
          totalB += b;

          // Simple hash calculation for variety
          hash = (hash * 31 + r + g + b) & 0xffffff;

          // Relative luminance (0 to 1)
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          totalBrightness += lum;

          if (lum < 0.2) darkPixelCount++;
          if (lum > 0.75) brightPixelCount++;

          // RGB to HSL for color detection
          const rNorm = r / 255;
          const gNorm = g / 255;
          const bNorm = b / 255;
          const max = Math.max(rNorm, gNorm, bNorm);
          const min = Math.min(rNorm, gNorm, bNorm);
          let h = 0;
          let s = 0;
          const l = (max + min) / 2;

          if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
              case rNorm:
                h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
                break;
              case gNorm:
                h = (bNorm - rNorm) / d + 2;
                break;
              case bNorm:
                h = (rNorm - gNorm) / d + 4;
                break;
            }
            h *= 60;
          }

          totalSaturation += s;

          if (s < 0.15) {
            grayscaleCount++;
          } else {
            if (h >= 15 && h < 60) sunsetGoldCount++;
            else if (h >= 60 && h < 165) natureGreenCount++;
            else if (h >= 165 && h < 255) skyOceanCount++;
            else if (h >= 255 && h < 340) neonPurplePink++;
            else deepRedCount++;
          }
        }

        const avgBrightness = totalBrightness / totalPixels;
        const avgSaturation = totalSaturation / totalPixels;
        const isDark = avgBrightness < 0.32 || darkPixelCount / totalPixels > 0.45;
        const isBright = avgBrightness > 0.65;
        const isGrayscale = grayscaleCount / totalPixels > 0.5;

        let vibeHint = "golden-hour";
        let primaryColor = "gold";

        // Determine specific aesthetic vibe from color distribution
        if (isDark && neonPurplePink > sunsetGoldCount && neonPurplePink > natureGreenCount) {
          vibeHint = "nocturnal-neon";
          primaryColor = "neon-purple";
        } else if (isDark && (skyOceanCount > sunsetGoldCount || isGrayscale)) {
          vibeHint = "midnight-city";
          primaryColor = "deep-blue";
        } else if (isDark && sunsetGoldCount > skyOceanCount) {
          vibeHint = "cozy-evening";
          primaryColor = "amber";
        } else if (natureGreenCount > sunsetGoldCount && natureGreenCount > skyOceanCount && natureGreenCount > 500) {
          vibeHint = "lush-nature";
          primaryColor = "emerald";
        } else if (skyOceanCount > sunsetGoldCount && skyOceanCount > 500) {
          vibeHint = "coastal-ocean";
          primaryColor = "ocean-blue";
        } else if (sunsetGoldCount > 300 || (totalR > totalB * 1.2 && avgBrightness > 0.3)) {
          vibeHint = "golden-hour";
          primaryColor = "sunset-amber";
        } else if (isGrayscale && !isDark) {
          vibeHint = "minimal-monochrome";
          primaryColor = "monochrome";
        } else if (neonPurplePink > 400 || deepRedCount > 400) {
          vibeHint = "dream-pop-magenta";
          primaryColor = "magenta-rose";
        } else if (isBright) {
          vibeHint = "sun-drenched";
          primaryColor = "bright-sun";
        } else {
          vibeHint = "vintage-analog";
          primaryColor = "warm-neutral";
        }

        resolve({
          avgBrightness,
          avgSaturation,
          isDark,
          isBright,
          isWarm: sunsetGoldCount > skyOceanCount || totalR > totalB,
          vibeHint,
          primaryColor,
          imageHash: Math.abs(hash),
          stats: {
            sunsetGold: sunsetGoldCount,
            skyOcean: skyOceanCount,
            natureGreen: natureGreenCount,
            neonPurplePink,
            deepRed: deepRedCount,
            grayscale: grayscaleCount,
          },
        });
      };

      img.onerror = () => {
        resolve({
          isWarm: true,
          isDark: false,
          vibeHint: "golden-hour",
          brightness: 0.5,
          primaryColor: "gold",
          imageHash: Math.floor(Math.random() * 100000),
        });
      };

      img.src = imageSrc;
    } catch {
      resolve({
        isWarm: true,
        isDark: false,
        vibeHint: "golden-hour",
        brightness: 0.5,
        primaryColor: "gold",
        imageHash: Math.floor(Math.random() * 100000),
      });
    }
  });
}
