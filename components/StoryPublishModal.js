"use client";

import { useState, useRef } from "react";

export default function StoryPublishModal({
  isOpen,
  onClose,
  imageUrl,
  selectedTrack,
  isPlayingTrack,
  onTogglePlay,
}) {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const hiddenCanvasRef = useRef(null);

  if (!isOpen) return null;

  const handleCopyTrackInfo = async () => {
    if (!selectedTrack) return;
    try {
      await navigator.clipboard.writeText(
        `${selectedTrack.title} by ${selectedTrack.artist}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadStoryCard = () => {
    if (!imageUrl || !hiddenCanvasRef.current) return;
    setIsExporting(true);

    try {
      const canvas = hiddenCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 9:16 Instagram Story Canvas (1080 x 1920)
      canvas.width = 1080;
      canvas.height = 1920;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Draw background image covering 1080x1920
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        // Dark gradient overlays at top and bottom
        const topGrad = ctx.createLinearGradient(0, 0, 0, 300);
        topGrad.addColorStop(0, "rgba(0,0,0,0.5)");
        topGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, 1080, 300);

        const botGrad = ctx.createLinearGradient(0, 1500, 0, 1920);
        botGrad.addColorStop(0, "rgba(0,0,0,0)");
        botGrad.addColorStop(1, "rgba(0,0,0,0.6)");
        ctx.fillStyle = botGrad;
        ctx.fillRect(0, 1500, 1080, 420);

        // Draw Music Sticker if track is selected
        if (selectedTrack) {
          const stickerX = 100;
          const stickerY = 1580;
          const stickerW = 880;
          const stickerH = 140;
          const radius = 32;

          ctx.save();
          ctx.fillStyle = "rgba(20, 10, 30, 0.88)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 3;

          ctx.beginPath();
          ctx.roundRect(stickerX, stickerY, stickerW, stickerH, radius);
          ctx.fill();
          ctx.stroke();

          // Vinyl record circle
          const discCenterX = stickerX + 75;
          const discCenterY = stickerY + stickerH / 2;
          const discRadius = 45;

          const discGrad = ctx.createConicGradient(0, discCenterX, discCenterY);
          discGrad.addColorStop(0, "#FF5D7A");
          discGrad.addColorStop(0.5, "#F2C14E");
          discGrad.addColorStop(1, "#FF5D7A");

          ctx.fillStyle = discGrad;
          ctx.beginPath();
          ctx.arc(discCenterX, discCenterY, discRadius, 0, Math.PI * 2);
          ctx.fill();

          // Inner disc hole
          ctx.fillStyle = "#140A1E";
          ctx.beginPath();
          ctx.arc(discCenterX, discCenterY, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#F2C14E";
          ctx.beginPath();
          ctx.arc(discCenterX, discCenterY, 6, 0, Math.PI * 2);
          ctx.fill();

          // Title text
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 38px Inter, -apple-system, sans-serif";
          ctx.fillText(selectedTrack.title, stickerX + 150, stickerY + 60, 680);

          // Artist text
          ctx.fillStyle = "#B3A2BE";
          ctx.font = "30px Inter, -apple-system, sans-serif";
          ctx.fillText(selectedTrack.artist, stickerX + 150, stickerY + 105, 680);

          ctx.restore();
        }

        const link = document.createElement("a");
        link.download = `cantora-story-${selectedTrack?.title?.toLowerCase().replace(/\s+/g, "-") || "post"}.jpg`;
        link.href = canvas.toDataURL("image/jpeg", 0.95);
        link.click();
        setIsExporting(false);
      };

      img.onerror = () => {
        setIsExporting(false);
      };

      img.src = imageUrl;
    } catch {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <canvas ref={hiddenCanvasRef} className="hidden" />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[var(--panel)] border border-[var(--line)] rounded-[24px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-[var(--text)] text-sm transition-all cursor-pointer"
          aria-label="Close Preview"
        >
          ✕
        </button>

        {/* Left Side: Full 9:16 Phone Story View */}
        <div className="flex-1 bg-[#0D0613] p-4 sm:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[var(--line)] overflow-y-auto">
          <div className="relative w-[270px] sm:w-[310px] aspect-[9/16] rounded-[36px] border-[7px] border-[#120A1A] bg-black overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] select-none">
            {/* Story Progress Bars */}
            <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
              <div className="flex-1 h-[2.5px] bg-white/40 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-white transition-all duration-300 ${
                    isPlayingTrack ? "w-full animate-pulse" : "w-1/2"
                  }`}
                />
              </div>
              <div className="flex-1 h-[2.5px] bg-white/40 rounded-full" />
              <div className="flex-1 h-[2.5px] bg-white/40 rounded-full" />
            </div>

            {/* Instagram Header */}
            <div className="absolute top-7 left-3.5 right-3.5 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF5D7A] to-[#F2C14E] p-[1.5px] flex items-center justify-center">
                  <div className="w-full h-full bg-[#1B1023] rounded-full flex items-center justify-center text-[10px] text-white">
                    ✦
                  </div>
                </div>
                <span className="font-inter font-medium text-xs text-white drop-shadow">
                  your_story
                </span>
                <span className="font-inter text-[10px] text-white/70">Just now</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onTogglePlay}
                  className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[10px] text-white cursor-pointer"
                >
                  {isPlayingTrack ? "❚❚" : "▶"}
                </button>
              </div>
            </div>

            {/* Story Image */}
            {imageUrl && (
              <div className="relative w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Story Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
              </div>
            )}

            {/* Floating Music Sticker */}
            {selectedTrack && (
              <div
                onClick={onTogglePlay}
                className="absolute left-3.5 right-3.5 bottom-14 z-20 cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="bg-[#140A1E]/85 backdrop-blur-md border border-white/25 rounded-2xl p-2.5 flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                  <div
                    className={`w-9 h-9 rounded-full bg-[conic-gradient(#FF5D7A,#F2C14E,#FF5D7A)] flex-shrink-0 flex items-center justify-center ${
                      isPlayingTrack ? "animate-spin-slow" : ""
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-[#140A1E] border border-white/20 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#F2C14E]" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-inter font-semibold text-xs text-white truncate">
                      {selectedTrack.title}
                    </div>
                    <div className="font-inter text-[10.5px] text-[#B3A2BE] truncate mt-0.5">
                      {selectedTrack.artist}
                    </div>
                  </div>

                  {isPlayingTrack && (
                    <div className="flex items-end gap-0.5 h-3.5 pr-1">
                      <span className="w-[2.5px] bg-[#FF5D7A] rounded-full eq-bar-1" />
                      <span className="w-[2.5px] bg-[#F2C14E] rounded-full eq-bar-2" />
                      <span className="w-[2.5px] bg-[#FF5D7A] rounded-full eq-bar-3" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Instagram Bottom Reaction */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 z-20 pointer-events-none opacity-90">
              <div className="flex-1 h-7 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-3 flex items-center text-[10px] font-inter text-white/70">
                Send message
              </div>
              <div className="w-7 h-7 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-xs">
                ♡
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Publishing Actions */}
        <div className="w-full md:w-[360px] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="font-plex text-[11px] uppercase tracking-widest text-[var(--accent-gold)] mb-2">
              Story Ready
            </div>
            <h3 className="font-fraunces font-medium text-2xl text-[var(--text)] mb-2">
              Ready to post
            </h3>
            <p className="font-inter text-xs text-[var(--text-dim)] leading-relaxed mb-6">
              Your photo and curated music track are synced. Save the 1080×1920 image to post directly to your Instagram story.
            </p>

            {/* Selected Track Details */}
            {selectedTrack && (
              <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--bg)] mb-6 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedTrack.artworkUrl}
                  alt={selectedTrack.title}
                  className="w-11 h-11 rounded-lg object-cover border border-[var(--line)]"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-inter font-semibold text-xs sm:text-sm text-[var(--text)] truncate">
                    {selectedTrack.title}
                  </h4>
                  <p className="font-inter text-xs text-[var(--text-dim)] truncate">
                    {selectedTrack.artist}
                  </p>
                </div>
              </div>
            )}

            {/* How to add on Instagram */}
            <div className="space-y-2.5 mb-6">
              <div className="flex items-start gap-2.5 text-xs text-[var(--text-dim)]">
                <span className="font-plex text-[var(--accent-gold)] font-semibold">01</span>
                <span>Open Instagram Story and pick your photo.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[var(--text-dim)]">
                <span className="font-plex text-[var(--accent-gold)] font-semibold">02</span>
                <span>Tap the Sticker icon and select <strong>Music</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[var(--text-dim)]">
                <span className="font-plex text-[var(--accent-gold)] font-semibold">03</span>
                <span>Search for <strong>{selectedTrack?.title || "your song"}</strong>.</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[var(--line)]">
            <button
              type="button"
              onClick={handleDownloadStoryCard}
              disabled={isExporting}
              className="w-full py-3 px-4 rounded-xl bg-[var(--accent-coral)] hover:bg-[var(--accent-coral-hover)] text-white font-inter font-semibold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,93,122,0.35)] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isExporting ? (
                "Rendering 1080×1920 image…"
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Save Story Image (1080×1920)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyTrackInfo}
              className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-[var(--line)] border border-[var(--line)] text-[var(--text)] font-plex text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? "Copied to clipboard ✓" : "Copy Song Search Query"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
