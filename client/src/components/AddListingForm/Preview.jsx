import { useMemo } from "react";

export default function Preview({ step, totalSteps, formData }) {
  const isIntro = step === 1;

  const progress = useMemo(() => {
    if (isIntro) return 0;
    return (step - 1) / (totalSteps - 2);
  }, [step, totalSteps, isIntro]);

  const topWidth = Math.min(progress * 4, 1);
  const rightHeight = Math.min(Math.max(progress * 4 - 1, 0), 1);
  const bottomWidth = Math.min(Math.max(progress * 4 - 2, 0), 1);
  const leftHeight = Math.min(Math.max(progress * 4 - 3, 0), 1);

  return (
    <div className="relative w-full flex justify-center">
      
      {/* CARD */}
      <div className="relative w-[360px] rounded-2xl shadow-xl bg-white p-6 overflow-hidden border border-[var(--color-border)]">

        {/* 🔴 PROGRESS BORDER */}
        <div
          className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)]"
          style={{ width: `${topWidth * 100}%`, transition: "width 0.4s ease" }}
        />
        <div
          className="absolute top-0 right-0 w-[3px] bg-[var(--color-primary)]"
          style={{ height: `${rightHeight * 100}%`, transition: "height 0.4s ease" }}
        />
        <div
          className="absolute bottom-0 right-0 h-[3px] bg-[var(--color-primary)]"
          style={{ width: `${bottomWidth * 100}%`, transition: "width 0.4s ease" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[3px] bg-[var(--color-primary)]"
          style={{ height: `${leftHeight * 100}%`, transition: "height 0.4s ease" }}
        />

        {/* CONTENT */}
        <div className="space-y-6">

          {/* TITLE */}
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text)]">
              {formData.name || "Business Name"}
            </h2>
            <p className="text-[var(--color-muted)] text-sm">
              {formData.tagline || "Your tagline goes here"}
            </p>
          </div>

          {/* IMAGE */}
          <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Listing"
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="h-48 flex items-center justify-center text-[var(--color-muted)] text-sm">
                No Image Uploaded
              </div>
            )}
          </div>

          {/* CONTACT */}
          <div className="text-sm text-[var(--color-text)] space-y-2">
            <p className="flex items-center gap-2">
              <span>📍</span>
              <span className="text-[var(--color-muted)]">
                {formData.address || "Address"}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <span>📞</span>
              <span className="text-[var(--color-muted)]">
                {formData.phone || "Phone number"}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <span>✉️</span>
              <span className="text-[var(--color-muted)]">
                {formData.email || "Email address"}
              </span>
            </p>
          </div>

          {/* HOURS */}
          {formData.hours && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text)] mb-2">
                Opening Hours
              </h3>

              <div className="bg-[var(--color-surface)] rounded-xl p-3 text-xs text-[var(--color-muted)] space-y-1">
                {Object.entries(formData.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="font-medium text-[var(--color-text)]">
                      {day}
                    </span>
                    <span>
                      {hours?.open || "--:--"} - {hours?.close || "--:--"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAGS */}
          {formData.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium 
                  bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-border)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* PRICE */}
          {formData.price && (
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-[var(--color-primary)]">
                {formData.price}
              </span>
              <span className="text-xs text-[var(--color-muted)]">
                per unit
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}