export default function ProgressCircle({ step, steps }) {
    const percentage = ((step + 1) / steps.length) * 100;

    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">
                    {step + 1}/{steps.length}
                </span>
            </div>
            <svg className="w-40 h-40 transform -rotate-90">
                <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="gray"
                    strokeWidth="8"
                    fill="transparent"
                    className="opacity-20"
                />
                <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 70}
                    strokeDashoffset={(1 - percentage / 100) * 2 * Math.PI * 70}
                    strokeLinecap="round"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
