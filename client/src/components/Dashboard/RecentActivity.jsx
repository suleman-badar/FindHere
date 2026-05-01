import { Clock, ChevronRight } from "lucide-react";

export default function RecentActivity() {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border">

      <div className="flex justify-between mb-6">
        <h3 className="font-bold">Recent Activity</h3>
      </div>

      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="flex justify-between p-4 bg-[#fff6f5] rounded-xl">
            <div className="flex gap-4">
              <Clock className="text-[#b91c1c]" />
              <div>
                <p>Activity {i}</p>
                <p className="text-xs text-gray-500">Details...</p>
              </div>
            </div>
            <ChevronRight />
          </div>
        ))}
      </div>

    </div>
  );
}