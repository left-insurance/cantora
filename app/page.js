export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-950 text-white px-6">
      <h1 className="text-6xl font-bold mb-4">🎵 Cantora</h1>

      <p className="text-xl text-center mb-8">
        Find the perfect song for every moment.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <select className="p-3 rounded-lg text-black">
          <option>Select Mood</option>
          <option>Happy</option>
          <option>Sad</option>
          <option>Chill</option>
          <option>Romantic</option>
        </select>

        <select className="p-3 rounded-lg text-black">
          <option>Select Photo Type</option>
          <option>Sunset</option>
          <option>Travel</option>
          <option>Gym</option>
          <option>Friends</option>
        </select>

        <select className="p-3 rounded-lg text-black">
          <option>Select Language</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Malayalam</option>
        </select>

        <button className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-semibold">
          Find Songs
        </button>
      </div>
    </main>
  );
}