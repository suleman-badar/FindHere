import { Plus, Eye, Settings } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-2xl border">

      <h3 className="mb-6 font-bold">Quick Actions</h3>

      <div className="space-y-3">
        <button className="btn-primary">New Listing</button>
        <button className="btn-secondary">Analytics</button>
        <button className="btn-secondary">Settings</button>
      </div>

    </div>
  );
}