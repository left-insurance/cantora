"use client";

import SongCard from "./SongCard";

export default function ResultsSection({
  tracks,
  selectedTrack,
  playingTrackId,
  isRefreshing,
  onTogglePlay,
  onSelectTrack,
  onRefresh,
}) {
  if (!tracks || tracks.length === 0) return null;

  return (
    <section className="mt-12 sm:mt-16 animate-fade-in" aria-labelledby="results-heading">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-5 sm:mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2
              id="results-heading"
              className="font-fraunces font-medium text-2xl sm:text-3xl text-[var(--text)]"
            >
              Your five
            </h2>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              aria-label="Suggest 5 new songs"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--accent-coral)] hover:text-[var(--accent-coral)] text-[var(--text-dim)] font-plex text-xs tracking-wide transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className={`text-sm transition-transform duration-500 ${isRefreshing ? "animate-spin" : "group-hover:rotate-180"}`}>
                ↻
              </span>
              <span>{isRefreshing ? "Finding 5 new…" : "Refresh five"}</span>
            </button>
          </div>

          <p className="font-inter text-xs sm:text-sm text-[var(--text-dim)] mt-1">
            Pick a soundtrack to preview how it fits on your story.
          </p>
        </div>

        <div className="font-plex text-[11px] sm:text-xs uppercase tracking-widest text-[var(--accent-gold)] px-2.5 py-1 rounded border border-[var(--accent-gold)]/30 bg-[var(--accent-gold-soft)] flex-shrink-0 self-start sm:self-auto">
          02 · Pick one
        </div>
      </div>

      {/* Track List */}
      <div className="flex flex-col gap-3">
        {tracks.map((track, index) => (
          <SongCard
            key={track.id || index}
            track={track}
            index={index}
            isSelected={selectedTrack?.id === track.id}
            isPlaying={playingTrackId === track.id}
            onTogglePlay={() => onTogglePlay(track)}
            onSelect={() => onSelectTrack(track)}
          />
        ))}
      </div>
    </section>
  );
}
