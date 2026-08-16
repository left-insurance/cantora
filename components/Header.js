"use client";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-8 pb-7 mb-10 sm:mb-14 border-b border-[var(--line)] transition-colors duration-300">
      <div className="flex items-center gap-3">
        <h1 className="font-fraunces font-semibold text-4xl sm:text-[44px] tracking-[-0.02em] italic text-[var(--text)] select-none">
          canto<span className="text-[var(--accent-coral)]">ra</span>
        </h1>
        <span className="font-plex text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-[var(--accent-gold)]/30 bg-[var(--accent-gold-soft)] text-[var(--accent-gold)] hidden sm:inline-block">
          Story Studio
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <p className="max-w-md font-inter text-xs sm:text-sm text-[var(--text-dim)] leading-relaxed">
          Upload the photo you&apos;re about to post. Cantora reads the room and hands you five songs that actually fit — 30-second previews included.
        </p>

        {/* Dark / Light Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--accent-coral)] text-[var(--text)] font-plex text-xs tracking-wider transition-all duration-200 shadow-sm flex-shrink-0 cursor-pointer"
        >
          {theme === "dark" ? (
            <>
              <span className="text-xs">☀️</span>
              <span className="text-[11px] text-[var(--text-dim)] uppercase">Light</span>
            </>
          ) : (
            <>
              <span className="text-xs">🌙</span>
              <span className="text-[11px] text-[var(--text-dim)] uppercase">Dark</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
