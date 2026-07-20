import { useEffect, useState } from "react";
import { getAllLinks } from "../services/linkService";

function TopLinks() {
  const [topLinks, setTopLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getAllLinks();

        const sorted = [...data]
          .sort((a, b) => b.click_count - a.click_count)
          .slice(0, 5);

        setTopLinks(sorted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-5">Top Performing Links</h2>

      <div className="space-y-4">
        {topLinks.map((link, index) => (
          <div
            key={link.id}
            className="flex justify-between items-center bg-zinc-950 border border-zinc-800 rounded-xl p-4 hover:border-blue-500/30 transition"
          >
            <div>
              <p className="text-zinc-500 text-sm">#{index + 1}</p>

              <p className="font-mono text-blue-400">{link.short_code}</p>

              <p className="text-zinc-500 text-sm truncate max-w-[250px]">
                {link.long_url}
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold">{link.click_count}</p>

              <p className="text-zinc-500 text-sm">clicks</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopLinks;
