export default function StepCard({ title, children }) {
    return (
        <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
}
