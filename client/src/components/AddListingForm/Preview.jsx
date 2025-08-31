import { useMemo } from "react";

export default function Preview({ step, totalSteps, formData }) {
    // Detect if it's the intro step
    const isIntro = step === 1;

    // Progress % (0–1 normalized)
    const progress = useMemo(() => {
        if (isIntro) return 0;
        return (step - 1) / (totalSteps - 2); // exclude intro
    }, [step, totalSteps, isIntro]);

    // Split into 4 edges (top, right, bottom, left)
    const topWidth = Math.min(progress * 4, 1);
    const rightHeight = Math.min(Math.max(progress * 4 - 1, 0), 1);
    const bottomWidth = Math.min(Math.max(progress * 4 - 2, 0), 1);
    const leftHeight = Math.min(Math.max(progress * 4 - 3, 0), 1);

    return (
        <div className="relative w-full flex justify-center">
            {/* Container with progress border */}
            <div className="relative w-[350px] rounded-xl shadow-lg bg-white p-6 overflow-hidden">

                {/* Progress border (4 sides) */}
                {/* Top */}
                <div
                    className="absolute top-0 left-0 h-1 bg-blue-500"
                    style={{ width: `${topWidth * 100}%`, transition: "width 0.4s ease" }}
                />
                {/* Right */}
                <div
                    className="absolute top-0 right-0 w-1 bg-blue-500"
                    style={{ height: `${rightHeight * 100}%`, transition: "height 0.4s ease" }}
                />
                {/* Bottom */}
                <div
                    className="absolute bottom-0 right-0 h-1 bg-blue-500"
                    style={{ width: `${bottomWidth * 100}%`, transition: "width 0.4s ease" }}
                />
                {/* Left */}
                <div
                    className="absolute bottom-0 left-0 w-1 bg-blue-500"
                    style={{ height: `${leftHeight * 100}%`, transition: "height 0.4s ease" }}
                />

                {/* ---- Your Original Preview Card ---- */}
                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {formData.name || "Business Name"}
                        </h2>
                        <p className="text-gray-500">
                            {formData.tagline || "Your tagline."}
                        </p>
                    </div>

                    {/* Image */}
                    <div className="rounded-xl overflow-hidden border bg-gray-100">
                        {formData.image ? (
                            <img
                                src={formData.image}
                                alt="Listing"
                                className="w-full h-48 object-cover"
                            />
                        ) : (
                            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                                No Image Uploaded
                            </div>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="text-sm text-gray-700 space-y-2">
                        <p>📍 {formData.address || "Address"}</p>
                        <p>📞 {formData.phone || "Phone number"}</p>
                        <p>✉️ {formData.email || "Email address"}</p>
                    </div>

                    {/* Hours */}
                    {formData.hours && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-1">
                                Opening Hours
                            </h3>
                            <ul className="text-xs text-gray-600 space-y-1">
                                {Object.entries(formData.openingHours || {}).map(([day, hours]) => (
                                    <li key={day}>
                                        <span className="font-medium">{day}:</span>{" "}
                                        {hours?.open || "--:--"} - {hours?.close || "--:--"}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Tags */}
                    {formData.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Pricing */}
                    {formData.price && (
                        <div>
                            <span className="text-lg font-bold text-green-600">
                                {formData.price}
                            </span>
                            <span className="text-gray-500 text-sm ml-2">per unit</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
