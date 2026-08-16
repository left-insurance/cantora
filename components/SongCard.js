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

  const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(
    `${track.title} ${track.artist}`
  )}`;
  const appleMusicUrl = `https://music.apple.com/us/search?term=${encodeURIComponent(
    `${track.title} ${track.artist}`
  )}`;

  return (
    <div
      className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-[14px] border transition-all duration-200 ${
        isSelected
          ? "bg-[var(--accent-coral-soft)] border-[var(--accent-coral)] shadow-[0_0_24px_rgba(255,93,122,0.18)]"
          : "bg-[var(--panel)] border-[var(--line)] hover:border-[var(--line-hover)] shadow-sm"
      }`}
    >
      {/* Left: Index + Artwork + Title & Artist */}
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

      {/* Right: Streaming links + Play/Pause + Select CTA */}
      <div className="flex items-center justify-end gap-2.5 sm:gap-3 flex-shrink-0 pt-1 sm:pt-0">
        {/* External Streaming Links */}
        <div className="flex items-center gap-1.5 pr-1">
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Search on Spotify"
            className="w-7 h-7 rounded-full border border-[var(--line)] hover:border-[#1DB954] hover:bg-[#1DB954]/10 text-[var(--text-dim)] hover:text-[#1DB954] flex items-center justify-center text-xs transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.307c-.215.353-.675.467-1.028.252-2.822-1.724-6.375-2.115-10.559-1.161-.403.092-.809-.163-.901-.567-.092-.404.163-.809.567-.901 4.582-1.047 8.52-.607 11.669 1.349.353.215.467.675.252 1.028zm1.464-3.256c-.27.44-.848.58-1.288.31-3.23-1.986-8.152-2.56-11.972-1.401-.497.151-1.026-.134-1.177-.63-.151-.496.134-1.026.63-1.177 4.367-1.325 9.803-.68 13.497 1.61.44.27.58.848.31 1.288zm.125-3.393c-3.874-2.3-10.262-2.513-13.968-1.388-.593.18-1.224-.162-1.404-.755-.18-.594.162-1.224.755-1.404 4.254-1.292 11.31-1.047 15.772 1.603.535.317.708 1.01.39 1.545-.317.534-1.01.708-1.545.39z" />
            </svg>
          </a>

          <a
            href={appleMusicUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Search on Apple Music"
            className="w-7 h-7 rounded-full border border-[var(--line)] hover:border-[#FA243C] hover:bg-[#FA243C]/10 text-[var(--text-dim)] hover:text-[#FA243C] flex items-center justify-center text-xs transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.55.63-1.03 1.66-.9 2.68 1.01.08 2.03-.49 2.63-1.18z" />
            </svg>
          </a>
        </div>

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
