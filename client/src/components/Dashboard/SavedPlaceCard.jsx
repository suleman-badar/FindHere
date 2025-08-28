import { Star, Share2 } from "lucide-react";

export default function SavedPlaceCard({ place }) {
    const avg = place.averageRating || 0;

    return (
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all">
            {/* Place Info */}
            <div>
                <div className="text-lg font-semibold text-gray-800">
                    {place.name || "Unnamed Place"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Star size={16} className="text-yellow-500" />
                    <span>{avg.toFixed(1)}</span>
                    {place.reviewCount > 0 && (
                        <span>({place.reviewCount} reviews)</span>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-sm text-gray-700 transition-colors">
                    Preview
                </button>
                <button className="p-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors">
                    <Share2 size={16} />
                </button>
            </div>
        </div>
    );
}
