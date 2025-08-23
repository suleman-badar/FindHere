import { Share2, Heart, ThumbsUp } from "lucide-react";

export default function ReviewCard({ review }) {
    return (
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 shadow-md hover:shadow-lg transition-all">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">{review.place}</h3>
                <button className="p-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors">
                    <Share2 size={16} />
                </button>
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-500 mt-2">{review.text}</p>

            {/* Reactions */}
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                    <Heart size={14} className="text-red-500" /> {review.likes} likes
                </span>
                <span className="flex items-center gap-1">
                    <ThumbsUp size={14} className="text-blue-500" /> {review.helpful} helpful
                </span>
            </div>
        </div>
    );
}
