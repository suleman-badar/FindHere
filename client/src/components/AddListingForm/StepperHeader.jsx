export default function StepperHeader({ step, steps }) {
  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between relative">

        {/* CONNECTING LINE */}
        <div className="absolute top-5 left-0 w-full h-[2px] bg-[var(--color-border)]" />

        {/* ACTIVE LINE */}
        <div
          className="absolute top-5 left-0 h-[2px] bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] transition-all duration-500"
          style={{
            width: `${(step / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((s, index) => {
          const isCompleted = index < step;
          const isActive = index === step;

          return (
            <div
              key={s.title}
              className="relative flex flex-col items-center flex-1"
            >
              {/* STEP CIRCLE */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10 transition-all duration-300
                  
                  ${
                    isCompleted
                      ? "bg-[var(--color-primary)] text-white shadow-md"
                      : isActive
                      ? "bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] shadow-sm"
                      : "bg-white border border-[var(--color-border)] text-[var(--color-muted)]"
                  }
                `}
              >
                {index + 1}
              </div>

              {/* LABEL */}
              <span
                className={`
                  mt-3 text-xs font-medium text-center max-w-[80px] transition-all
                  
                  ${
                    isActive
                      ? "text-[var(--color-primary)]"
                      : isCompleted
                      ? "text-[var(--color-text)]"
                      : "text-[var(--color-muted)]"
                  }
                `}
              >
                {s.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}