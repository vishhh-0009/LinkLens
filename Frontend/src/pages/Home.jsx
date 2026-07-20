import UrlForm from "../components/UrlForm";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-500/10 blur-[250px] rounded-full pointer-events-none"></div>

      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col items-center text-center">
          {/* Hero Heading */}
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-500 bg-clip-text text-transparent">
            LinkLens
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-zinc-300 font-medium">
            Smart URL Analytics Platform
          </p>

          <p className="mt-5 max-w-3xl text-zinc-400 text-base md:text-lg leading-relaxed">
            Shorten URLs, generate QR codes, create custom aliases, manage
            expiry dates and monitor link performance through a modern analytics
            dashboard.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur">
              URL Shortening
            </div>

            <div className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur">
              QR Generation
            </div>

            <div className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur">
              Click Analytics
            </div>

            <div className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur">
              Expiry Management
            </div>

            <div className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur">
              Custom Aliases
            </div>
          </div>
        </div>

        {/* URL Form */}
        <div className="flex justify-center mt-10">
          <UrlForm />
        </div>

        {/* Product Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 text-center hover:border-blue-500/40 transition">
            <h3 className="text-3xl font-bold">Fast</h3>
            <p className="text-zinc-400 mt-2">
              Generate and manage short links instantly.
            </p>
          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 text-center hover:border-blue-500/40 transition">
            <h3 className="text-3xl font-bold">Secure</h3>
            <p className="text-zinc-400 mt-2">
              Expiry support and reliable redirects.
            </p>
          </div>

          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 text-center hover:border-blue-500/40 transition">
            <h3 className="text-3xl font-bold">Insightful</h3>
            <p className="text-zinc-400 mt-2">
              Track clicks and analyze performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
