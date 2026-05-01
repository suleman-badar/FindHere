export default function ProgressCircle({ step, steps }) {
  const percentage = ((step + 1) / steps.length) * 100;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative flex items-center justify-center">

      {/* Glow background */}
      <div className="absolute w-44 h-44 rounded-full bg-[var(--color-primary)] opacity-5 blur-2xl" />

      {/* Center Text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-[var(--color-text)]">
          {step + 1}
        </span>
        <span className="text-xs text-[var(--color-muted)]">
          / {steps.length}
        </span>
      </div>

      {/* SVG */}
      <svg className="w-40 h-40 transform -rotate-90">

        {/* Background Track */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="var(--color-border)"
          strokeWidth="10"
          fill="transparent"
        />

        {/* Progress */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={(1 - percentage / 100) * circumference}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />

        {/* Gradient */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary-dark)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}