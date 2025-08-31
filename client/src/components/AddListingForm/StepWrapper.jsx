import { AnimatePresence, motion } from "framer-motion";

export default function StepWrapper({ step, steps, direction, formData, setFormData, nextStep, prevStep, handleSubmit }) {
    const StepComponent = steps[step].component;

    return (
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === 1 ? -100 : 100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
            >
                <StepComponent formData={formData} setFormData={setFormData} nextStep={nextStep}
                    prevStep={prevStep} handleSubmit={handleSubmit} />
            </motion.div>
        </AnimatePresence>
    );
}
