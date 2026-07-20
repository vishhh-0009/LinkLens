import { useEffect, useState } from "react";
import { getAnalytics } from "../services/linkService";

function StatsSection() {
  const [stats, setStats] = useState({
    total_links: 0,
    total_clicks: 0,
    active_links: 0,
    expired_links: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAnalytics();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Links",
      value: stats.total_links,
      color: "text-blue-400",
    },
    {
      title: "Total Clicks",
      value: stats.total_clicks,
      color: "text-purple-400",
    },
    {
      title: "Active Links",
      value: stats.active_links,
      color: "text-green-400",
    },
    {
      title: "Expired Links",
      value: stats.expired_links,
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mt-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 hover:-translate-y-1 hover:border-blue-500/30 transition-all duration-300"
        >
          <p className="text-zinc-400 text-sm">{card.title}</p>

          <h2 className={`text-4xl font-bold mt-3 ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default StatsSection;
