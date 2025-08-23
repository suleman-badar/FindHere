import { Share2, Heart, ThumbsUp } from "lucide-react";

export default function ReviewCard({ review }) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium">{review.place}</h3>
                <button className="p-2 rounded-xl border border-zinc-800 hover:bg-zinc-900">
                    <Share2 size={16} />
                </button>
            </div>
            <p className="text-sm text-zinc-300 mt-2">{review.text}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-zinc-400">
                <span className="flex items-center gap-1">
                    <Heart size={14} /> {review.likes} likes
                </span>
                <span className="flex items-center gap-1">
                    <ThumbsUp size={14} /> {review.helpful} helpful
                </span>
            </div>
        </div>
    );
}
