"use client";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [aiResult, setAiResult] = useState([]); 
  const [loading, setLoading] = useState(false);                         

  async function analyzeImage() {
  if (!imageFile) {
    alert("Please upload an image first");
    return;
  }

  const base64 = await fileToBase64(imageFile);
  setLoading(true);

  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: base64,
    }),
  });

  const data = await res.json();
  setLoading(false);

  if (data.result) {
    setAiResult(data.result.split("\n"));
  }
}
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const maxWidth = 800;
      const scale = Math.min(maxWidth / img.width, 1);

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const compressed = canvas.toDataURL(
        "image/jpeg",
        0.7
      );

      resolve(compressed);
    };

    img.onerror = reject;

    img.src = URL.createObjectURL(file);
  });
}

return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center px-6 transition-all ${
       darkMode
  ? "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#4c1d95]"
  : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#ddd6fe]"
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
  className={`w-full max-w-xl rounded-[32px] p-8 backdrop-blur-2xl border shadow-2xl ${
    darkMode
      ? "bg-white/5 border-white/10"
      : "bg-white/70 border-gray-300"
  }`}
>
        <h1
  className={`text-7xl font-black tracking-tight text-center mb-3 ${
    darkMode
      ? "text-white"
      : "bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-transparent"
  }`}
>
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

         <label
  htmlFor="file-upload"
  className="cursor-pointer text-center bg-violet-600 hover:bg-violet-700 transition-all p-4 rounded-2xl font-semibold"
>
  📸 Upload Photo
</label>

<input
  id="file-upload"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
  alert("Please upload an image smaller than 10 MB");
  return;
}

    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  }}
/>
 {imageFile && (
  <p
    className={`text-center text-sm font-medium ${
      darkMode ? "text-slate-400" : "text-slate-700"
    }`}
  >
    {imageFile.name}
  </p>
)}
  {image && (
  <img
    src={image}
    alt="Preview"
    className="w-full rounded-2xl shadow-xl border border-white/10"
  />
)}

{image && (
  <button
  onClick={analyzeImage}
  disabled={loading}
 className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.02] transition-all py-4 px-6 rounded-2xl font-semibold shadow-lg" 
>
  {loading ? (
  <div className="flex items-center justify-center gap-2">
    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
    <span>Finding Songs...</span>
  </div>
) : (
  "✨ Analyze Image"
)}
</button>
)}
         
   {aiResult.length > 0 && (
  <div className="mt-6 space-y-3">
    {aiResult.map((song, index) => (
      <div
        key={index}
       className={`p-4 rounded-2xl border ${
  darkMode
    ? "bg-white/10 border-white/10 text-white"
    : "bg-white/80 border-slate-200 text-slate-800"
}`}
      >
        {song}
      </div>
    ))}
  </div>
)}
        </div>
      </div>
    </main>
  );
}