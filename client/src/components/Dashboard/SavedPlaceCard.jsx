import { Star, Share2 } from "lucide-react";

export default function SavedPlaceCard({ place }) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4 flex items-center justify-between">
            <div>
                <div className="text-lg font-medium">{place.name}</div>
                <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                    <Star size={16} /> <span>{place.rating}</span>
                    <span>•</span>
                    <span>Last visit: {place.lastVisit}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-sm">
                    View Details
                </button>
                <button className="p-2 rounded-xl border border-zinc-800 hover:bg-zinc-900">
                    <Share2 size={16} />
                </button>
            </div>
        </div>
    );
}
