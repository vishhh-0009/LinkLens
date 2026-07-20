import Navbar from "../components/Navbar";
import LinksTable from "../components/LinksTable";

function Links() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/10 blur-[200px] rounded-full pointer-events-none"></div>

      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-5xl md:text-6xl font-extrabold">All Links</h1>

        <p className="text-gray-400 mt-3 text-lg">
          Manage, search and monitor all shortened links.
        </p>

        <LinksTable />
      </div>
    </div>
  );
}

export default Links;
