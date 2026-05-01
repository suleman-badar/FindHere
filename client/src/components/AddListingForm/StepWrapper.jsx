import { AnimatePresence, motion } from "framer-motion";

export default function StepWrapper({
  step,
  steps,
  direction,
  formData,
  setFormData,
  nextStep,
  prevStep,
  handleSubmit,
  errors = {},
  loading,
}) {
  const StepComponent = steps[step].component;

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={step}
        custom={direction}
        initial={{
          opacity: 0,
          x: direction === 1 ? 60 : -60,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          x: direction === 1 ? -60 : 60,
          scale: 0.96,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="
          relative
          bg-white
          rounded-2xl
          p-8
          border border-[var(--color-border)]
          shadow-lg
          overflow-hidden
        "
      >
        {/* 🌫 Subtle background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-primary)] opacity-5 blur-3xl rounded-full pointer-events-none" />

        {/* CONTENT */}
        <div className="relative z-10">
          <StepComponent
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}