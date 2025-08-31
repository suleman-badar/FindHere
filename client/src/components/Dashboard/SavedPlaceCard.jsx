import { Star, Share2, Edit, Trash2 } from "lucide-react";

export default function SavedPlaceCard({ place, onSelect, onDelete }) {
    const avg = place.averageRating || 0;

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 transition-all w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">

                {/* Place Info */}
                <div
                    className="cursor-pointer flex-1 mb-4 sm:mb-0"
                >
                    <div className="text-lg font-semibold text-gray-800 truncate">
                        {place.name || "Unnamed Place"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Star size={16} className="text-yellow-500" />
                        <span>{avg.toFixed(1)}</span>
                        {place.reviewCount > 0 && <span>({place.reviewCount} reviews)</span>}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 justify-end" >
                    <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-sm text-gray-700 transition-colors"
                        onClick={() => onSelect(place._id)}
                    >
                        <Edit size={16} /> Edit
                    </button>
                    <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-red-400 hover:bg-red-100 text-red-600 text-sm transition-colors"
                        onClick={() => onDelete(place._id)}
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                    <button className="p-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors">
                        <Share2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
