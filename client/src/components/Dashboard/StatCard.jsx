import { TrendingUp } from "lucide-react";

export default function StatCard({ icon: Icon, label, value, trend, trendValue }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#e9e5e5] hover:-translate-y-1 hover:border-[#b91c1c] transition-all duration-300">
      
      <div className="flex justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#fff6f5]">
          <Icon className="w-6 h-6 text-[#b91c1c]" />
        </div>

        {trend && (
          <div className="flex items-center text-sm text-green-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trendValue}
          </div>
        )}
      </div>

      <p className="text-sm text-[#6b7280]">{label}</p>
      <p className="text-2xl font-bold text-[#0f172a]">{value}</p>
    </div>
  );
}