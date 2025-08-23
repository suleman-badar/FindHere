export default function StatCard({ title, value, suffix, delta, sub, icon: Icon }) {
    const isUp = delta > 0;
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                    {Icon && <Icon size={18} />} {title}
                </div>
                <span
                    className={`text-xs px-2 py-1 rounded-full border ${isUp
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-red-500/30 bg-red-500/10 text-red-400"
                        }`}
                >
                    {isUp ? "+" : ""}
                    {delta}%
                </span>
            </div>
            <div className="text-3xl font-semibold">
                {value}
                {suffix || ""}
            </div>
            {sub && <div className="text-xs text-zinc-400 mt-1">{sub}</div>}
        </div>
    );
}
