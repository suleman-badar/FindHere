import { CheckCircle, MapPin, Clock, Image, FileText } from "lucide-react";

const steps = [
    { id: 1, label: "Basic Info", icon: FileText },
    { id: 2, label: "Location", icon: MapPin },
    { id: 3, label: "Hours", icon: Clock },
    { id: 4, label: "Images", icon: Image },
];

export default function Stepper({ currentStep }) {
    return (
        <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                    <div key={step.id} className="flex-1 flex flex-col items-center">
                        <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full border-2
              ${isCompleted ? "bg-blue-500 text-white border-blue-500" : isActive ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-400"}`}
                        >
                            {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                        </div>
                        <p className={`mt-2 text-sm ${isActive ? "text-blue-500 font-medium" : "text-gray-400"}`}>
                            {step.label}
                        </p>
                        {index < steps.length - 1 && (
                            <div className="h-0.5 w-full bg-gray-200 mt-2 relative">
                                <div
                                    className={`h-0.5 absolute top-0 left-0 transition-all
                  ${isCompleted ? "bg-blue-500 w-full" : "w-0"}`}
                                ></div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
