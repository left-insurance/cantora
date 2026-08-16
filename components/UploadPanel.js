"use client";

import { useState, useRef } from "react";
import MoodBadge from "./MoodBadge";
import { SAMPLE_PHOTOS } from "@/lib/mockData";
import { extractVisualContext } from "@/lib/imageAnalysis";

export default function UploadPanel({
  uploadedImage,
  fileName,
  analyzing,
  statusText,
  statusError,
  mood,
  onImageSelected,
  onAnalyze,
  onClearImage,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPEG, PNG, WebP, etc.).");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      const visualContext = await extractVisualContext(dataUrl);
      onImageSelected(dataUrl, file.name, null, visualContext);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSampleClick = async (sample) => {
    const visualContext = await extractVisualContext(sample.imageUrl);
    onImageSelected(sample.imageUrl, sample.title, sample.mood, visualContext);
  };

  return (
    <div className="bg-[var(--panel)] border border-[var(--line)] rounded-[18px] p-6 sm:p-8 flex flex-col justify-between shadow-[var(--card-shadow)] transition-all duration-300">
      <div>
        {/* Step Label */}
        <div className="font-plex text-[11px] uppercase tracking-widest text-[var(--accent-gold)] mb-3">
          01 · Upload
        </div>

        {/* Heading */}
        <h2 className="font-fraunces font-medium text-2xl sm:text-[28px] text-[var(--text)] mb-2 leading-tight">
          Drop in your photo
        </h2>

        {/* Description */}
        <p className="font-inter text-xs sm:text-sm text-[var(--text-dim)] leading-relaxed mb-6">
          Whatever you&apos;re about to post — Cantora looks at light, color, mood, and setting to figure out what it should sound like.
        </p>

        {/* Upload Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-6 sm:p-7 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[140px] ${
            isDragging
              ? "border-[var(--accent-coral)] bg-[var(--accent-coral-soft)] scale-[0.99]"
              : uploadedImage
              ? "border-[var(--accent-coral)]/40 bg-[var(--accent-coral-soft)]/40"
              : "border-[var(--line)] hover:border-[var(--accent-coral)] hover:bg-[var(--accent-coral-soft)]/30"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {uploadedImage ? (
            <div className="flex items-center gap-3.5 w-full justify-center">
              {/* Thumbnail */}
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-[var(--line)] bg-[var(--bg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uploadedImage}
                  alt="Uploaded thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left min-w-0">
                <p className="font-inter font-medium text-xs sm:text-sm text-[var(--text)] truncate max-w-[200px]">
                  {fileName || "Photo selected"}
                </p>
                <span className="font-plex text-[11px] text-[var(--accent-coral)] hover:underline block mt-0.5">
                  Click to replace photo
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[var(--line)]/50 border border-[var(--line)] flex items-center justify-center text-[var(--text)] mb-2.5 text-lg font-light">
                ＋
              </div>
              <p className="font-inter text-xs sm:text-sm text-[var(--text)] font-medium">
                Click or drag a photo here
              </p>
              <p className="font-plex text-[11px] text-[var(--text-dim)] mt-1">
                JPG, PNG, WebP or HEIC
              </p>
            </div>
          )}
        </div>

        {/* Quick sample photo selector */}
        <div className="mt-4 pt-3.5 border-t border-[var(--line)]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-plex text-[10.5px] uppercase tracking-wider text-[var(--text-dim)]">
              Or pick a sample photo
            </span>
            {uploadedImage && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClearImage();
                }}
                className="font-plex text-[10.5px] text-[var(--accent-coral)] hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SAMPLE_PHOTOS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSampleClick(sample)}
                className="flex items-center gap-2 p-1.5 rounded-lg border border-[var(--line)] bg-[var(--panel-card)] hover:border-[var(--accent-gold)]/60 hover:bg-[var(--panel-hover)] transition-all text-left group"
              >
                <div className="w-7 h-7 rounded overflow-hidden flex-shrink-0 bg-[var(--bg)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sample.imageUrl}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="font-inter text-[11px] text-[var(--text-dim)] group-hover:text-[var(--text)] truncate">
                  {sample.title.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button & Status */}
      <div className="mt-6">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!uploadedImage || analyzing}
          className={`w-full py-3.5 px-5 rounded-[10px] font-inter font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 select-none ${
            !uploadedImage || analyzing
              ? "bg-[var(--accent-coral)] text-white opacity-40 cursor-not-allowed"
              : "bg-[var(--accent-coral)] text-white hover:bg-[var(--accent-coral-hover)] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_16px_rgba(255,93,122,0.35)] cursor-pointer"
          }`}
        >
          {analyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing light & vibe…</span>
            </>
          ) : (
            <span>Find matching songs</span>
          )}
        </button>

        {/* Status Line */}
        <div className="min-h-[22px] mt-3">
          {statusText && (
            <p
              className={`font-plex text-xs animate-fade-in ${
                statusError ? "text-[var(--accent-coral)]" : "text-[var(--text-dim)]"
              }`}
            >
              {statusText}
            </p>
          )}
        </div>

        {/* Mood Badge */}
        <div className="mt-2 min-h-[32px]">
          {mood && <MoodBadge mood={mood} />}
        </div>
      </div>
    </div>
  );
}
