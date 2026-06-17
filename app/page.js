"use client";
import { useState } from "react";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [mood, setMood] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  function findSongs() {
    if (mood === "Happy") {
      setSongs([
        "Happy",
        "On Top of the World",
        "Best Day of My Life"
      ]);
    } else if (mood === "Sad") {
      setSongs([
        "Someone Like You",
        "Let Her Go",
        "Photograph"
      ]);
    } else if (mood === "Chill") {
      setSongs([
        "Golden Hour",
        "Sunset Lover",
        "Yellow"
      ]);
    } else if (mood === "Romantic") {
      setSongs([
        "Perfect",
        "Until I Found You",
        "All of Me"
      ]);
    } else {
      setSongs(["Please select a mood"]);
    }
  }

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center px-6 transition-all ${
        darkMode
          ? "bg-gradient-to-br from-black via-slate-900 to-purple-950 text-white"
          : "bg-gradient-to-br from-white via-slate-100 to-purple-100 text-black"
      }`}
    >
      {/* Toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-16 h-8 rounded-full flex items-center px-1 transition-all ${
            darkMode ? "bg-purple-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full transition-all ${
              darkMode ? "translate-x-8" : ""
            }`}
          />
        </button>
      </div>

      {/* Card */}
      <div
        className={`w-full max-w-md rounded-3xl p-8 backdrop-blur-lg border ${
          darkMode
            ? "bg-white/10 border-white/20"
            : "bg-white/70 border-gray-300"
        }`}
      >
        <h1 className="text-6xl font-extrabold text-center mb-3">
          Cantora
        </h1>

        <p
          className={`text-center mb-8 ${
            darkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Find the perfect song for every moment.
        </p>

        <div className="flex flex-col gap-4">
          <select
            className={`p-4 rounded-xl ${
              darkMode
                ? "bg-white/10 text-white"
                : "bg-white text-black"
            }`}
            onChange={(e) => setMood(e.target.value)}
          >
            <option>Select Mood</option>
            <option>Happy</option>
            <option>Sad</option>
            <option>Chill</option>
            <option>Romantic</option>
          </select>

          <select
            className={`p-4 rounded-xl ${
              darkMode
                ? "bg-white/10 text-white"
                : "bg-white text-black"
            }`}
          >
            <option>Select Photo Type</option>
            <option>Sunset</option>
            <option>Travel</option>
            <option>Gym</option>
            <option>Friends</option>
          </select>

          <select
            className={`p-4 rounded-xl ${
              darkMode
                ? "bg-white/10 text-white"
                : "bg-white text-black"
            }`}
          >
            <option>Select Language</option>
            <option>English</option>
            <option>Hindi</option>
            <option>Malayalam</option>
          </select>

          <button
            onClick={findSongs}
            className="bg-purple-600 hover:bg-purple-700 p-4 rounded-xl font-semibold text-lg"
          >
            Find Songs
          </button>

          {mood && (
            <h2 className="text-xl font-bold text-center mt-4">
              Songs for {mood} Mood
            </h2>
          )}

          {songs.map((song) => (
            <p key={song} className="text-center">
              {song}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}