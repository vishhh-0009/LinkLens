import Navbar from "../components/Navbar";
import StatsSection from "../components/StatsSection";
import LinksTable from "../components/LinksTable";
import TopLinks from "../components/TopLinks";
import ActivityFeed from "../components/ActivityFeed";
import ClicksChart from "../components/ClicksChart";

function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/10 blur-[200px] rounded-full"></div>

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-5xl md:text-6xl font-extrabold">
          Analytics Dashboard
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Monitor link performance, clicks, activity and engagement metrics.
        </p>

        <StatsSection />

        <ClicksChart />

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <TopLinks />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
