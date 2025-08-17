export function HomePage() {
  return (
    <main className="w-full min-h-screen bg-indigo-950 text-white flex flex-col items-center justify-center px-4 py-12">
      
      {/* Logo + Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-white p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-purple-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487a2.25 2.25 0 113.182 3.182L7.5 20.213 3 21l.787-4.5L16.862 4.487z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold">SketchShare</h1>
      </div>

      {/* Subtext */}
      <div className="text-center max-w-md mb-8">
        <p className="text-lg">
          Draw and collaborate in real-time — right from your browser.
        </p>
        <p className="text-sm text-indigo-300 mt-2">
          Create rooms, invite others, and sketch together easily.
        </p>
      </div>

      {/* CTA */}
      <a
        href="/signup"
        className="px-6 py-2 bg-white text-indigo-700 font-medium rounded-full hover:bg-indigo-100 transition"
      >
        🚀 Get Started
      </a>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-4xl text-center">
        {[
          {
            title: "Live Collaboration",
            desc: "Join rooms and draw with others live.",
          },
          {
            title: "Multi-Tool Canvas",
            desc: "Use shapes, pencil, and text easily.",
          },
          {
            title: "No Installs",
            desc: "Open, draw, and share in seconds.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="border border-white/10 p-4 rounded-lg bg-white/5"
          >
            <h3 className="font-semibold text-white mb-1">{item.title}</h3>
            <p className="text-sm text-indigo-300">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-xs text-indigo-400">
        &copy; 2025 SketchShare. All rights reserved.
      </footer>
    </main>
  );
}
