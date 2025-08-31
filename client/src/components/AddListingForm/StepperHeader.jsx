export default function StepperHeader({ step, steps }) {
    return (
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            {steps.map((s, index) => (
                <div
                    key={s.title}
                    className="flex flex-col items-center flex-1 min-w-[60px]"
                >
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                        ${index <= step ? "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg" : "bg-gray-300"}
                    `}
                    >
                        {index + 1}
                    </div>
                    <span
                        className={`mt-2 text-xs font-medium text-center
                        ${index === step ? "text-blue-600" : "text-gray-500"}`}
                    >
                        {s.title}
                    </span>

                </div>
            ))}
        </div>
    );
}
