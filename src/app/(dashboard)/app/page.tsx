import { ActivityList } from "@/components/blocks/activity-list";
import { StatCard } from "@/components/blocks/stat-card";
import { ACTIVITY, STATS, USER } from "@/content/dashboard";

export default function OverviewPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h1 className="font-display text-2xl tracking-[-0.03em]">Welcome back, {USER.name.split(" ")[0]}</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
      <ActivityList items={ACTIVITY} />
    </div>
  );
}
