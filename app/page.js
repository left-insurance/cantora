"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import UploadPanel from "@/components/UploadPanel";
import StoryPreview from "@/components/StoryPreview";
import ResultsSection from "@/components/ResultsSection";
import StoryPublishModal from "@/components/StoryPublishModal";
import { getMockRecommendations } from "@/lib/mockData";

export default function Home() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cantora_theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark";
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [targetMood, setTargetMood] = useState(null);
  const [visualContext, setVisualContext] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [mood, setMood] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Hidden DOM audio player ref
  const audioPlayerRef = useRef(null);

  // Theme DOM synchronization
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cantora_theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleImageSelected = (imgData, name, sampleMood = null, ctx = null) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
    setPlayingTrackId(null);
    setUploadedImage(imgData);
    setFileName(name);
    setTargetMood(sampleMood);
    setVisualContext(ctx);
    setRefreshIndex(0);
    setStatusText("");
    setStatusError(false);
    setMood(null);
    setTracks([]);
    setSelectedTrack(null);
  };

  const handleClearImage = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
    setPlayingTrackId(null);
    setUploadedImage(null);
    setFileName("");
    setTargetMood(null);
    setVisualContext(null);
    setRefreshIndex(0);
    setStatusText("");
    setStatusError(false);
    setMood(null);
    setTracks([]);
    setSelectedTrack(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;

    setAnalyzing(true);
    setStatusError(false);
    setMood(null);
    setTracks([]);
    setSelectedTrack(null);
    setRefreshIndex(0);

    try {
      setStatusText("Analyzing lighting, colors, and setting…");

      let imageBase64 = null;
      let mediaType = "image/jpeg";

      if (uploadedImage.startsWith("data:image/")) {
        const parts = uploadedImage.split(",");
        const match = uploadedImage.match(/data:(image\/[a-zA-Z+]+);base64/);
        if (match) mediaType = match[1];
        imageBase64 = parts[1];
      }

      setStatusText("Curating soundtrack for your story…");

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64,
          mediaType,
          sampleMood: targetMood,
          visualContext,
          refreshIndex: 0,
        }),
      });

      if (!res.ok) {
        throw new Error(`Analysis server returned ${res.status}`);
      }

      const data = await res.json();

      if (data.success && Array.isArray(data.tracks) && data.tracks.length > 0) {
        setMood(data.mood);
        setTracks(data.tracks);
        setSelectedTrack(data.tracks[0]);
        setStatusText("");
      } else {
        const fallback = getMockRecommendations(targetMood || visualContext?.vibeHint);
        setMood(fallback.mood);
        setTracks(fallback.tracks);
        if (fallback.tracks.length > 0) {
          setSelectedTrack(fallback.tracks[0]);
        }
        setStatusText("");
      }
    } catch (err) {
      console.warn("API error, using refined fallback catalog:", err);
      const fallback = getMockRecommendations(targetMood || visualContext?.vibeHint);
      setMood(fallback.mood);
      setTracks(fallback.tracks);
      if (fallback.tracks.length > 0) {
        setSelectedTrack(fallback.tracks[0]);
      }
      setStatusText("");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleRefreshTracks = async () => {
    if (!uploadedImage || isRefreshing) return;

    setIsRefreshing(true);
    const nextRefreshIndex = refreshIndex + 1;
    setRefreshIndex(nextRefreshIndex);

    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
    setPlayingTrackId(null);

    try {
      let imageBase64 = null;
      let mediaType = "image/jpeg";

      if (uploadedImage.startsWith("data:image/")) {
        const parts = uploadedImage.split(",");
        const match = uploadedImage.match(/data:(image\/[a-zA-Z+]+);base64/);
        if (match) mediaType = match[1];
        imageBase64 = parts[1];
      }

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64,
          mediaType,
          sampleMood: targetMood,
          visualContext,
          refreshIndex: nextRefreshIndex,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.tracks) && data.tracks.length > 0) {
          setTracks(data.tracks);
          setSelectedTrack(data.tracks[0]);
        }
      }
    } catch (e) {
      console.warn("Refresh error:", e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleTogglePlay = (track) => {
    if (!track) return;
    const player = audioPlayerRef.current;
    if (!player) return;

    if (playingTrackId === track.id) {
      // Toggle play/pause for same track
      if (!player.paused) {
        player.pause();
        setPlayingTrackId(null);
      } else {
        player.play().then(() => {
          setPlayingTrackId(track.id);
        }).catch((e) => console.warn("Audio resume error:", e));
      }
      return;
    }

    // Play new track
    if (track.previewUrl) {
      player.pause();
      player.currentTime = 0;
      player.src = track.previewUrl;
      player.load();
      const playPromise = player.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingTrackId(track.id);
          })
          .catch((err) => {
            console.warn("Audio playback error:", err);
            setPlayingTrackId(track.id);
          });
      }
    } else {
      setPlayingTrackId(track.id);
    }
  };

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  const handleTogglePlaySelected = () => {
    if (selectedTrack) {
      handleTogglePlay(selectedTrack);
    }
  };

  return (
    <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-10 sm:py-14 min-h-screen flex flex-col justify-between transition-colors duration-300">
      {/* Hidden DOM Audio Player positioned off-screen (never suspended) */}
      <audio
        ref={audioPlayerRef}
        preload="auto"
        playsInline
        onEnded={() => setPlayingTrackId(null)}
        onError={(e) => {
          console.warn("Audio element error:", e);
          setPlayingTrackId(null);
        }}
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <div>
        {/* Editorial Header with Theme Toggle */}
        <Header theme={theme} onToggleTheme={handleToggleTheme} />

        {/* Hero Section: 2 Columns on Desktop, collapsing on Mobile/Tablet */}
        <main className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 sm:gap-12 items-start">
          {/* Left: Upload & Analysis Panel */}
          <div className="flex flex-col gap-6">
            <UploadPanel
              uploadedImage={uploadedImage}
              fileName={fileName}
              analyzing={analyzing}
              statusText={statusText}
              statusError={statusError}
              mood={mood}
              onImageSelected={handleImageSelected}
              onAnalyze={handleAnalyze}
              onClearImage={handleClearImage}
            />

            {/* Results Section (appears under upload panel on desktop) */}
            <ResultsSection
              tracks={tracks}
              selectedTrack={selectedTrack}
              playingTrackId={playingTrackId}
              isRefreshing={isRefreshing}
              onTogglePlay={handleTogglePlay}
              onSelectTrack={handleSelectTrack}
              onRefresh={handleRefreshTracks}
            />
          </div>

          {/* Right: Instagram Story Phone Preview */}
          <div className="lg:sticky lg:top-8 flex flex-col items-center justify-center">
            <StoryPreview
              imageUrl={uploadedImage}
              selectedTrack={selectedTrack}
              isPlayingTrack={
                playingTrackId !== null && playingTrackId === selectedTrack?.id
              }
              onTogglePlaySelected={handleTogglePlaySelected}
              onOpenPublishModal={() => setIsPublishModalOpen(true)}
            />
          </div>
        </main>
      </div>

      {/* Story Fullscreen Publishing Modal */}
      <StoryPublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        imageUrl={uploadedImage}
        selectedTrack={selectedTrack}
        isPlayingTrack={
          playingTrackId !== null && playingTrackId === selectedTrack?.id
        }
        onTogglePlay={handleTogglePlaySelected}
      />

      {/* Editorial Footer */}
      <footer className="mt-16 sm:mt-24 pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-colors duration-300">
        <span className="font-plex text-xs text-[var(--text-dim)]">
          canto<span className="text-[var(--accent-coral)]">ra</span> · editorial music curation for visual stories
        </span>

        {/* Creator Attribution */}
        <div className="flex items-center gap-1.5 font-plex text-xs text-[var(--text)]">
          <span>made with</span>
          <span className="text-[#A855F7] animate-pulse select-none text-sm">💜</span>
          <span>by</span>
          <span className="font-medium text-[var(--text)]">
            Anay Parameshwaran
          </span>
        </div>
      </footer>
    </div>
  );
}
