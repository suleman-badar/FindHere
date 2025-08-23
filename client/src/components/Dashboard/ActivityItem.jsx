import { Search, ExternalLink, Heart, MessageSquareText } from "lucide-react";

export default function ActivityItem({ activity }) {
    const icons = {
        search: Search,
        view: ExternalLink,
        favorite: Heart,
        review: MessageSquareText,
    };
    const Icon = icons[activity.type] || Search;

    return (
        <div className="flex items-center gap-3 text-sm text-zinc-400">
            <Icon size={16} />
            <span className="flex-1">{activity.text}</span>
            <span className="text-xs">{activity.time}</span>
        </div>
    );
}
