export default function Preview({ formData }) {
    return (
        <div className="bg-gray-50 p-6 rounded-2xl shadow-md h-fit">
            <h3 className="text-md font-semibold mb-3">Live Preview</h3>
            <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {formData.name || "—"}</p>
                <p><span className="font-medium">Number:</span> {formData.number || "—"}</p>
                <p><span className="font-medium">Location:</span> {formData.location?.join(", ") || "—"}</p>
                <p><span className="font-medium">Hours:</span> {formData.openingHours.open && formData.openingHours.close
                    ? `${formData.openingHours.open} - ${formData.openingHours.close}`
                    : "—"}</p>
                <p><span className="font-medium">Images:</span> {formData.images?.length || 0} selected</p>
            </div>
        </div>
    );
}
