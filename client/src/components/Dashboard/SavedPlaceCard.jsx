import { Star, Share2, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function SavedPlaceCard({ place, onSelect, onDelete }) {
    const navigate = useNavigate();
    const avg = place.averageRating || 0;

    return (
        <div className="h-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all h-full">

                {/* Place Info */}
                <div className="cursor-pointer flex-1">
                    <div className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                        {place.name || "Unnamed Place"}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                        <Star size={16} className="text-yellow-500" />
                        <span>{avg.toFixed(1)}</span>
                        {place.reviewCount > 0 && <span>({place.reviewCount} reviews)</span>}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 justify-start sm:justify-end mt-3 sm:mt-0">
                    <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm text-gray-700 transition-colors"
                        onClick={() => {
                            sessionStorage.setItem("scrollY", window.scrollY);

                            onSelect(place._id)
                            // navigate(`/admin/dashboard`);
                        }}
                    >
                        <Edit size={16} />
                        <span>Edit</span>
                    </button>
                    <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-400 hover:bg-red-100 text-red-600 text-sm transition-colors"
                        onClick={() => onDelete(place._id)}
                    >
                        <Trash2 size={16} />
                        <span>Delete</span>
                    </button>
                    <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors">
                        <Share2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
