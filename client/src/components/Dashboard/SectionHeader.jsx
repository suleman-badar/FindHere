export default function SectionHeader({ title, action }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            {action}
        </div>
    );
}
