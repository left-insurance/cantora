export default function MoodBadge({ mood }) {
  if (!mood) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-gold-soft)] border border-[var(--accent-gold)]/30 text-[var(--accent-gold)] font-plex text-xs tracking-wide animate-fade-in shadow-sm">
      <span className="text-[13px] leading-none select-none">♫</span>
      <span className="capitalize">{mood}</span>
    </div>
  );
}
