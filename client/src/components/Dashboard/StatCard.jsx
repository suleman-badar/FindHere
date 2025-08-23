export default function StatCard({ title, value, suffix, delta, sub, icon: Icon }) {
    const isUp = delta > 0;

    return (
        <div className="rounded-2xl bg-gray-50 p-5 shadow-md hover:shadow-lg transition-all border border-gray-200">
            {/* Title + Delta */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    {Icon && <Icon size={18} />} {title}
                </div>
                <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${isUp
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-red-100 text-red-600"
                        }`}
                >
                    {isUp ? "+" : ""}
                    {delta}%
                </span>
            </div>

            {/* Value */}
            <div className="text-3xl font-semibold text-gray-800">
                {value}
                {suffix || ""}
            </div>

            {/* Subtitle */}
            {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
        </div>
    );
}
