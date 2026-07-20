import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            LinkLens
          </h1>
        </Link>

        <div className="flex gap-3">
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-xl font-medium transition ${
              location.pathname === "/dashboard"
                ? "bg-white text-black"
                : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/links"
            className={`px-4 py-2 rounded-xl font-medium transition ${
              location.pathname === "/links"
                ? "bg-white text-black"
                : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            Links
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
