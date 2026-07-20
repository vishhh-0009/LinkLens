import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getAllLinks } from "../services/linkService";

function LinksTable() {
  const [links, setLinks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getAllLinks();
        setLinks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLinks();
  }, []);

  const filteredLinks = links.filter((link) => {
    const matchesSearch = link.short_code
      .toLowerCase()
      .includes(search.toLowerCase());

    const isExpired =
      link.expiry_date && new Date(link.expiry_date) < new Date();

    if (filter === "active") return matchesSearch && !isExpired;
    if (filter === "expired") return matchesSearch && isExpired;

    return matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mt-16">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <h2 className="text-2xl font-bold p-6 border-b border-zinc-800">
          Recent Links
        </h2>

        <div className="flex gap-4 p-6 border-b border-zinc-800">
          <input
            type="text"
            placeholder="Search short code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white relative z-50"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-zinc-800">
              <th className="p-4">Short Code</th>
              <th className="p-4">Clicks</th>
              <th className="p-4">Created</th>
              <th className="p-4">Expiry</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLinks.map((link) => {
              const isExpired =
                link.expiry_date && new Date(link.expiry_date) < new Date();

              const isTrending = link.click_count >= 5;

              return (
                <tr
                  key={link.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/40 transition"
                >
                  <td className="p-4 font-mono">
                    <div className="flex items-center gap-2">
                      {link.short_code}

                      {isTrending && (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                          Trending
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-4 font-semibold">{link.click_count}</td>

                  <td className="p-4">
                    {new Date(link.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {link.expiry_date
                      ? new Date(link.expiry_date).toLocaleDateString()
                      : "No Expiry"}
                  </td>

                  <td className="p-4">
                    {isExpired ? (
                      <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400">
                        Expired
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `http://localhost:5000/api/links/${link.short_code}`,
                        );

                        toast.success("Link copied successfully!");
                      }}
                      className="bg-blue-600 px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                      Copy Link
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LinksTable;
