"use client";

export default function StoryPreview({
  imageUrl,
  selectedTrack,
  isPlayingTrack,
  onTogglePlaySelected,
  onOpenPublishModal,
}) {
  return (
    <div className="flex flex-col items-center">
      {/* 9:16 Phone Mockup */}
      <div className="relative w-[260px] sm:w-[270px] aspect-[9/16] rounded-[32px] border-[6px] border-[#120A1A] bg-[#0F0815] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65)] select-none">
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

        {/* Signature Spinning Vinyl Music Sticker */}
        {selectedTrack && (
          <div
            onClick={onTogglePlaySelected}
            className="absolute left-3.5 right-3.5 bottom-12 z-20 animate-fade-in cursor-pointer hover:scale-[1.02] transition-transform duration-200"
            title="Click to preview song"
          >
            <div className="bg-[#140A1E]/85 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex items-center gap-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.5)]">
              {/* Spinning Vinyl Record */}
              <div
                className={`relative w-8 h-8 rounded-full bg-[conic-gradient(#FF5D7A,#F2C14E,#FF5D7A)] flex-shrink-0 flex items-center justify-center shadow-inner ${
                  isPlayingTrack ? "animate-spin-slow" : ""
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#140A1E] border border-white/20 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#F2C14E]" />
                </div>
              </div>

              {/* Song Meta */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="font-inter font-semibold text-[11.5px] text-white truncate leading-tight">
                  {selectedTrack.title}
                </div>
                <div className="font-inter text-[10px] text-[#B3A2BE] truncate leading-tight mt-0.5">
                  {selectedTrack.artist}
                </div>
              </div>

              {/* Equalizer indicator */}
              <div className="flex items-center gap-1 pr-1 flex-shrink-0">
                {isPlayingTrack ? (
                  <div className="flex items-end gap-0.5 h-3.5">
                    <span className="w-[2.5px] bg-[#FF5D7A] rounded-full eq-bar-1" />
                    <span className="w-[2.5px] bg-[#F2C14E] rounded-full eq-bar-2" />
                    <span className="w-[2.5px] bg-[#FF5D7A] rounded-full eq-bar-3" />
                  </div>
                ) : (
                  <span className="text-white/60 text-[10px] font-plex">
                    ▶
                  </span>
                )}
              </div>
            </div>
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

      {/* Caption & Publish Action */}
      <div className="flex flex-col items-center gap-2 mt-3.5">
        <span className="font-plex text-xs text-[var(--text-dim)] tracking-wide">
          story preview
        </span>

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
