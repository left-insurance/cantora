"use client";

export default function SongCard({
  track,
  index,
  isSelected,
  isPlaying,
  onTogglePlay,
  onSelect,
}) {
  const indexFormatted = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-[14px] border transition-all duration-200 ${
        isSelected
          ? "bg-[var(--accent-coral-soft)] border-[var(--accent-coral)] shadow-[0_0_24px_rgba(255,93,122,0.18)]"
          : "bg-[var(--panel)] border-[var(--line)] hover:border-[var(--line-hover)] shadow-sm"
      }`}
    >
      {/* Left section: Index + Artwork + Title/Artist */}
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
        {/* Index */}
        <span className="font-plex text-xs sm:text-sm text-[var(--text-dim)] w-6 flex-shrink-0">
          {indexFormatted}
        </span>

        {/* Album Artwork */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--bg)] border border-[var(--line)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={track.artworkUrl}
            alt={`${track.title} by ${track.artist}`}
            className="w-full h-full object-cover"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-[2px] bg-[var(--accent-gold)] rounded-full eq-bar-1" />
                <span className="w-[2px] bg-[var(--accent-coral)] rounded-full eq-bar-2" />
                <span className="w-[2px] bg-[var(--accent-gold)] rounded-full eq-bar-3" />
              </div>
            </div>
          )}
        </div>

        {/* Title & Artist & Vibe */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-inter font-semibold text-sm sm:text-[15px] text-[var(--text)] truncate">
              {track.title}
            </h4>
            {track.duration && (
              <span className="font-plex text-[10px] text-[var(--text-dim)]/80 hidden md:inline">
                {track.duration}
              </span>
            )}
          </div>
          <p className="font-inter text-xs sm:text-[13px] text-[var(--text-dim)] truncate mt-0.5">
            {track.artist}
          </p>
          {track.vibe && (
            <p className="font-plex text-[11px] text-[var(--accent-gold)] truncate mt-1 hidden sm:block">
              ✦ {track.vibe}
            </p>
          )}
        </div>
      </div>

      {/* Right section: Play/Pause preview + Use this CTA */}
      <div className="flex items-center justify-end gap-2.5 sm:gap-3 flex-shrink-0 pt-1 sm:pt-0">
        {/* Play Button */}
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? `Pause ${track.title}` : `Play preview of ${track.title}`}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-150 flex-shrink-0 cursor-pointer ${
            isPlaying
              ? "border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] text-[var(--accent-gold)] shadow-[0_0_12px_rgba(242,193,78,0.3)]"
              : "border-[var(--line)] text-[var(--text)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] bg-transparent"
          }`}
        >
          {isPlaying ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-0.5"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        {/* Select "Use this" Button */}
        <button
          type="button"
          onClick={onSelect}
          className={`font-plex text-[11px] uppercase tracking-wider px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg border transition-all duration-150 whitespace-nowrap cursor-pointer ${
            isSelected
              ? "bg-[var(--accent-coral)] text-white border-[var(--accent-coral)] font-semibold shadow-[0_2px_12px_rgba(255,93,122,0.4)]"
              : "bg-transparent text-[var(--text-dim)] border-[var(--line)] hover:border-[var(--accent-coral)] hover:text-[var(--text)]"
          }`}
        >
          {isSelected ? "Selected ✓" : "Use this"}
        </button>
      </div>
    </div>
  );
}
