import { TrendingUp, Eye, MessageSquare, Heart } from "lucide-react";

export const stats = [
    { id: 1, icon: TrendingUp, label: "Engagement Score", value: 23, trend: true, trendValue: "-2.1%" },
    { id: 2, icon: Eye, label: "Total Visits", value: "1,247", trend: true, trendValue: "+12.5%" },
    { id: 3, icon: MessageSquare, label: "Reviews Written", value: 47, trend: true, trendValue: "+8.2%" },
    { id: 4, icon: Heart, label: "Places Saved", value: "94.2%", trend: true, trendValue: "+4.3%" },
];

export const savedPlaces = [
    { id: 1, name: "Walled City", rating: 4.8, lastVisit: "2 days ago" },
    { id: 2, name: "The Modern Bistro", rating: 4.6, lastVisit: "5 days ago" },
];

export const reviews = [
    { id: 1, place: "Walled City", text: "Exceptional dining experience...", likes: 24, helpful: 18 },
    { id: 2, place: "Artisan Coffee House", text: "Cozy spot with rich brews...", likes: 12, helpful: 7 },
];

export const activities = [
    { id: 1, type: "search", text: "Searched for Italian restaurants in downtown", time: "2 hours ago" },
    { id: 2, type: "view", text: "Viewed details for The Modern Bistro", time: "5 hours ago" },
    { id: 3, type: "favorite", text: "Added to favorites Central Park", time: "1 day ago" },
    { id: 4, type: "review", text: "Left a review for Artisan Coffee House", time: "3 days ago" },
];