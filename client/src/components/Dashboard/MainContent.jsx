import OverviewSection from "./OverviewSection";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";

export default function MainContent() {
  return (
    <main className="p-6">

      <OverviewSection />

      <div className="grid lg:grid-cols-3 gap-6">
        <RecentActivity />
        <QuickActions />
      </div>

    </main>
  );
}