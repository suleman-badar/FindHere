import StatCard from "./StatCard";
import { Eye, Star, Users, MapPin } from "lucide-react";

export default function OverviewSection() {
  return (
    <div className="mb-8">

      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0f172a]">Overview</h2>

        <select className="px-4 py-2 border rounded-xl bg-[#fff6f5]">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Eye} label="Total Views" value="12,458" trend trendValue="+12%" />
        <StatCard icon={Star} label="Rating" value="4.8" trend trendValue="+0.3" />
        <StatCard icon={Users} label="Visitors" value="8,234" trend trendValue="+18%" />
        <StatCard icon={MapPin} label="Listings" value="5" />
      </div>

    </div>
  );
}