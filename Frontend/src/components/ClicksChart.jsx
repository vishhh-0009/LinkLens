import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getAllLinks } from "../services/linkService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ClicksChart() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllLinks();

      const top = [...data]
        .sort((a, b) => b.click_count - a.click_count)
        .slice(0, 7);

      setLinks(top);
    };

    fetchData();
  }, []);

  const chartData = {
    labels: links.map((link) => link.short_code),
    datasets: [
      {
        label: "Clicks",
        data: links.map((link) => link.click_count),
        backgroundColor: "rgba(59,130,246,0.8)",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#27272a",
        },
      },

      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#27272a",
        },
      },
    },
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">Click Performance Analytics</h2>

      <div className="h-[320px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default ClicksChart;
