import { useEffect, useState } from "react";
import { getAllLinks } from "../services/linkService";

function ActivityFeed() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getAllLinks();
        setLinks(data.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-5">Recent Activity</h2>

      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="border-l-2 border-blue-500 pl-4 py-2">
            <p className="text-white">New link created</p>

            <p className="text-blue-400 font-mono mt-1">{link.short_code}</p>

            <p className="text-zinc-500 text-sm mt-1">
              {new Date(link.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;
