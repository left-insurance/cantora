"use client";

import { useState, useRef } from "react";

export default function StoryPreview({
  imageUrl,
  selectedTrack,
  isPlayingTrack,
  stickerStyle = "vinyl",
  onChangeStickerStyle,
  stickerPos = { x: 0, y: 0 },
  onChangeStickerPos,
  onTogglePlaySelected,
  onOpenPublishModal,
}) {
  const phoneContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, startPos: { x: 0, y: 0 } });

  // Mouse / Touch Dragging Logic
  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      startPos: { ...stickerPos },
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handlePointerUp);
  };

  const handlePointerMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    // Boundaries: clamp inside phone frame (-80 to 80 horizontal, -180 to 40 vertical)
    const newX = Math.max(-60, Math.min(60, dragStartRef.current.startPos.x + deltaX));
    const newY = Math.max(-200, Math.min(30, dragStartRef.current.startPos.y + deltaY));

    onChangeStickerPos({ x: newX, y: newY });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    handlePointerMove(e);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handlePointerUp);
  };

  return (
    <div className="flex flex-col items-center">
      {/* 9:16 Phone Mockup */}
      <div
        ref={phoneContainerRef}
        className="relative w-[260px] sm:w-[270px] aspect-[9/16] rounded-[32px] border-[6px] border-[#120A1A] bg-[#0F0815] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65)] select-none"
      >
        {/* Story Top Progress Bars */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex gap-1 z-20 pointer-events-none">
          <div className="flex-1 h-[2.5px] bg-white/35 rounded-full overflow-hidden">
            <div
              className={`h-full bg-white transition-all duration-300 ${
                isPlayingTrack ? "w-full animate-pulse" : "w-1/3"
              }`}
            />
          </div>
          <div className="flex-1 h-[2.5px] bg-white/35 rounded-full overflow-hidden" />
          <div className="flex-1 h-[2.5px] bg-white/35 rounded-full overflow-hidden" />
        </div>

        {/* Story Header (Instagram Style) */}
        <div className="absolute top-6 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF5D7A] to-[#F2C14E] p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full bg-[#1B1023] rounded-full flex items-center justify-center text-[9px] font-plex text-[#F5EFEA]">
                ✦
              </div>
            </div>
            <span className="font-inter font-medium text-[11px] text-white/90 drop-shadow-sm tracking-tight">
              your_story
            </span>
            <span className="font-inter text-[10px] text-white/60">2h</span>
          </div>
          <span className="text-white/70 text-xs font-inter">···</span>
        </div>

        {/* Story Content / Image */}
        {imageUrl ? (
          <div className="relative w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Story upload"
              className="w-full h-full object-cover animate-fade-in"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-2xl border border-dashed border-[rgba(245,239,234,0.2)] flex items-center justify-center mb-3 text-[rgba(245,239,234,0.4)]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p className="font-plex text-xs text-[#B3A2BE] leading-relaxed">
              your story preview
              <br />
              shows up here
            </p>
          </div>
        )}

        {/* Draggable Music Sticker */}
        {selectedTrack && (
          <div
            style={{
              transform: `translate(${stickerPos.x}px, ${stickerPos.y}px)`,
              touchAction: "none",
            }}
            onPointerDown={handlePointerDown}
            className={`absolute left-3.5 right-3.5 bottom-12 z-30 transition-shadow select-none ${
              isDragging ? "cursor-grabbing shadow-2xl scale-[1.03]" : "cursor-grab"
            }`}
            title="Drag sticker to reposition · Click sound icon to play"
          >
            {/* Style 1: Vinyl Record */}
            {stickerStyle === "vinyl" && (
              <div className="bg-[#140A1E]/85 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex items-center gap-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.5)]">
                <div
                  className={`relative w-8 h-8 rounded-full bg-[conic-gradient(#FF5D7A,#F2C14E,#FF5D7A)] flex-shrink-0 flex items-center justify-center shadow-inner ${
                    isPlayingTrack ? "animate-spin-slow" : ""
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#140A1E] border border-white/20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#F2C14E]" />
                  </div>
                </div>

                <div className="flex-1 min-w-0 pr-1">
                  <div className="font-inter font-semibold text-[11.5px] text-white truncate leading-tight">
                    {selectedTrack.title}
                  </div>
                  <div className="font-inter text-[10px] text-[#B3A2BE] truncate leading-tight mt-0.5">
                    {selectedTrack.artist}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePlaySelected();
                  }}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-[10px] flex-shrink-0"
                >
                  {isPlayingTrack ? "❚❚" : "▶"}
                </button>
              </div>
            )}

            {/* Style 2: Minimal Glassmorphic Pill */}
            {stickerStyle === "pill" && (
              <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-full py-1.5 px-3 flex items-center justify-between gap-2 shadow-[0_8px_25px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-[#FF5D7A] text-xs font-plex">♫</span>
                  <div className="min-w-0 flex-1 truncate">
                    <span className="font-inter font-semibold text-[11px] text-white">
                      {selectedTrack.title}
                    </span>
                    <span className="font-inter text-[10px] text-white/70 ml-1.5 truncate">
                      {selectedTrack.artist}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePlaySelected();
                  }}
                  className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-[9px] flex-shrink-0"
                >
                  {isPlayingTrack ? "❚❚" : "▶"}
                </button>
              </div>
            )}

            {/* Style 3: Square Album Artwork Card */}
            {stickerStyle === "album" && (
              <div className="bg-[#140A1E]/90 backdrop-blur-md border border-white/25 rounded-xl p-2 flex items-center gap-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.5)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedTrack.artworkUrl}
                  alt=""
                  className="w-9 h-9 rounded-lg object-cover flex-shrink-0 border border-white/15"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-inter font-semibold text-[11.5px] text-white truncate">
                    {selectedTrack.title}
                  </div>
                  <div className="font-inter text-[10px] text-[#B3A2BE] truncate mt-0.5">
                    {selectedTrack.artist}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePlaySelected();
                  }}
                  className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white text-[10px] flex-shrink-0"
                >
                  {isPlayingTrack ? "❚❚" : "▶"}
                </button>
              </div>
            )}

            {/* Style 4: Live Audio Waveform Visualizer */}
            {stickerStyle === "waveform" && (
              <div className="bg-black/75 backdrop-blur-md border border-[#FF5D7A]/40 rounded-2xl p-2.5 flex items-center gap-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.5)]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePlaySelected();
                  }}
                  className="w-7 h-7 rounded-full bg-[#FF5D7A] text-[#1B1023] flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                >
                  {isPlayingTrack ? "❚❚" : "▶"}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="font-inter font-semibold text-[11px] text-white truncate">
                    {selectedTrack.title}
                  </div>
                  <div className="flex items-end gap-1 h-3 mt-1">
                    <span className="w-1 bg-[#FF5D7A] rounded-full eq-bar-1" />
                    <span className="w-1 bg-[#F2C14E] rounded-full eq-bar-2" />
                    <span className="w-1 bg-[#FF5D7A] rounded-full eq-bar-3" />
                    <span className="w-1 bg-[#F2C14E] rounded-full eq-bar-1" />
                    <span className="w-1 bg-[#FF5D7A] rounded-full eq-bar-2" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instagram Bottom Reaction Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-20 pointer-events-none opacity-85">
          <div className="flex-1 h-7 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-3 flex items-center text-[10px] font-inter text-white/60">
            Send message
          </div>
          <div className="w-7 h-7 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 text-xs">
            ♡
          </div>
        </div>
      </div>

      {/* Sticker Style Switcher Controls */}
      {selectedTrack && (
        <div className="flex flex-col items-center gap-2.5 mt-3.5">
          <div className="flex items-center gap-1.5 bg-[var(--panel)] border border-[var(--line)] p-1 rounded-full shadow-sm">
            <button
              type="button"
              onClick={() => onChangeStickerStyle("vinyl")}
              title="Vinyl Record Style"
              className={`px-2.5 py-1 rounded-full text-xs font-plex transition-all cursor-pointer ${
                stickerStyle === "vinyl"
                  ? "bg-[var(--accent-coral)] text-white font-semibold"
                  : "text-[var(--text-dim)] hover:text-[var(--text)]"
              }`}
            >
              💿 Vinyl
            </button>
            <button
              type="button"
              onClick={() => onChangeStickerStyle("pill")}
              title="Minimalist Pill Style"
              className={`px-2.5 py-1 rounded-full text-xs font-plex transition-all cursor-pointer ${
                stickerStyle === "pill"
                  ? "bg-[var(--accent-coral)] text-white font-semibold"
                  : "text-[var(--text-dim)] hover:text-[var(--text)]"
              }`}
            >
              💊 Pill
            </button>
            <button
              type="button"
              onClick={() => onChangeStickerStyle("album")}
              title="Album Card Style"
              className={`px-2.5 py-1 rounded-full text-xs font-plex transition-all cursor-pointer ${
                stickerStyle === "album"
                  ? "bg-[var(--accent-coral)] text-white font-semibold"
                  : "text-[var(--text-dim)] hover:text-[var(--text)]"
              }`}
            >
              🎴 Card
            </button>
            <button
              type="button"
              onClick={() => onChangeStickerStyle("waveform")}
              title="Audio Waveform Style"
              className={`px-2.5 py-1 rounded-full text-xs font-plex transition-all cursor-pointer ${
                stickerStyle === "waveform"
                  ? "bg-[var(--accent-coral)] text-white font-semibold"
                  : "text-[var(--text-dim)] hover:text-[var(--text)]"
              }`}
            >
              〰️ Wave
            </button>
          </div>

          <p className="font-plex text-[10.5px] text-[var(--text-dim)]/70 select-none">
            ✦ Drag sticker on phone to reposition
          </p>
        </div>
      )}

      {/* Publish Modal CTA */}
      <div className="flex flex-col items-center gap-2 mt-2">
        {imageUrl && selectedTrack && (
          <button
            type="button"
            onClick={onOpenPublishModal}
            className="font-plex text-[11px] uppercase tracking-wider text-[var(--accent-coral)] hover:text-white border border-[var(--accent-coral)]/30 hover:bg-[var(--accent-coral)] px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,93,122,0.15)] cursor-pointer"
          >
            <span>📱</span>
            <span>Preview on Phone / Publish</span>
          </button>
        )}
      </div>
    </div>
  );
}
