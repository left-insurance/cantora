"use client";

import { useState } from "react";

export default function AISettingsModal({
  isOpen,
  onClose,
  apiKey,
  aiProvider,
  onSave,
}) {
  const [inputKey, setInputKey] = useState(apiKey || "");
  const [provider, setProvider] = useState(aiProvider || "gemini");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(inputKey.trim(), provider);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setInputKey("");
    onSave("", provider);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[var(--panel)] border border-[var(--line)] rounded-[22px] p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--line)]/50 hover:bg-[var(--line)] flex items-center justify-center text-[var(--text)] text-xs transition-all cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">✨</span>
          <h3 className="font-fraunces font-medium text-2xl text-[var(--text)]">
            AI Vision Settings
          </h3>
        </div>

        <p className="font-inter text-xs text-[var(--text-dim)] leading-relaxed mb-5">
          Cantora includes an automatic visual AI engine. You can also connect your own Gemini or Claude API key for direct custom multimodal reasoning.
        </p>

        {/* Provider Selector */}
        <div className="mb-4">
          <label className="block font-plex text-xs uppercase tracking-wider text-[var(--accent-gold)] mb-2">
            AI Provider
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setProvider("gemini")}
              className={`p-2.5 rounded-xl border font-plex text-xs text-left transition-all ${
                provider === "gemini"
                  ? "border-[var(--accent-coral)] bg-[var(--accent-coral-soft)] text-[var(--text)] font-semibold"
                  : "border-[var(--line)] bg-[var(--bg)] text-[var(--text-dim)]"
              }`}
            >
              ✦ Google Gemini
            </button>
            <button
              type="button"
              onClick={() => setProvider("anthropic")}
              className={`p-2.5 rounded-xl border font-plex text-xs text-left transition-all ${
                provider === "anthropic"
                  ? "border-[var(--accent-coral)] bg-[var(--accent-coral-soft)] text-[var(--text)] font-semibold"
                  : "border-[var(--line)] bg-[var(--bg)] text-[var(--text-dim)]"
              }`}
            >
              ✦ Claude 3.5 Sonnet
            </button>
          </div>
        </div>

        {/* API Key Input */}
        <div className="mb-6">
          <label className="block font-plex text-xs uppercase tracking-wider text-[var(--accent-gold)] mb-2">
            {provider === "gemini" ? "Gemini API Key" : "Anthropic API Key"} (Optional)
          </label>
          <input
            type="password"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder={
              provider === "gemini"
                ? "AIzaSy..."
                : "sk-ant-..."
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--line)] text-[var(--text)] font-plex text-xs focus:outline-none focus:border-[var(--accent-coral)] transition-colors placeholder:text-[var(--text-dim)]/40"
          />
          <p className="font-plex text-[10.5px] text-[var(--text-dim)] mt-1.5">
            Key is stored securely in your local browser storage.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[var(--accent-coral)] hover:bg-[var(--accent-coral-hover)] text-white font-inter font-semibold text-xs tracking-wide transition-all shadow-[0_4px_14px_rgba(255,93,122,0.35)] cursor-pointer"
          >
            {savedSuccess ? "Saved ✓" : "Save Settings"}
          </button>
          {inputKey && (
            <button
              type="button"
              onClick={handleClear}
              className="py-2.5 px-3 rounded-xl border border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--text)] font-plex text-xs transition-all cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
