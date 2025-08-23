import { useState } from "react";
import {
    Home, Compass, MapPin, Search, Bookmark, Star,
    Wrench, LogOut, ChevronLeft, ChevronRight,
    Info, Image, Phone, Clock, Map, MessageSquare
} from "lucide-react";

export default function SidebarAdmin({ onSelect }) {
    const [collapsed, setCollapsed] = useState(true);

    const items = [
        { key: "dashboard", label: "Dashboard", icon: Bookmark },

        { key: "saved", label: "Saved Places", icon: Bookmark },
        // { key: "reviews", label: "My Reviews", icon: Star },
        { key: "tools", label: "Tools", icon: Wrench },
    ];

    const adminItems = [
        { key: "general", label: "General Info", icon: Info },
        { key: "media", label: "Media", icon: Image },
        { key: "contact", label: "Contact", icon: Phone },
        { key: "location", label: "Location", icon: Map },
        { key: "hours", label: "Hours", icon: Clock },
        { key: "manage-reviews", label: "Manage Reviews", icon: MessageSquare },
    ];

    return (
        <aside
            className={`flex flex-col sticky top-0 left-0 h-screen border-r 
  bg-white transition-all duration-300 
  ${collapsed ? "w-16" : "w-64"}`}
        >
            {/* Header */}
            <div className="hidden sm:flex items-center justify-between h-14 px-3 border-b border-gray-200 bg-gray-50">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded hover:bg-gray-200 text-gray-600"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <div className="flex flex-col justify-between overflow-hidden">
                <nav className="flex-1 py-3 space-y-1">
                    {items.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => onSelect(key)}
                            className={`group relative flex items-center gap-3 px-3 py-2.5 w-full text-sm
                text-gray-700 hover:bg-gray-200 rounded-sm transition-colors
                ${collapsed ? "justify-center" : ""}`}
                        >
                            <Icon size={18} />
                            {!collapsed && <span>{label}</span>}
                            {collapsed && (
                                <span className="absolute left-14 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    {label}
                                </span>
                            )}
                        </button>
                    ))}

                    {/* Divider */}
                    <div className="border-t my-2"></div>

                    {adminItems.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => onSelect(key)}
                            className={`group relative flex items-center gap-3 px-3 py-2.5 w-full text-sm
                text-gray-700 hover:bg-gray-200 rounded-sm transition-colors
                ${collapsed ? "justify-center" : ""}`}
                        >
                            <Icon size={18} />
                            {!collapsed && <span>{label}</span>}
                            {collapsed && (
                                <span className="absolute left-14 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    {label}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-gray-200">
                    <button
                        className={`group relative flex items-center gap-3 px-3 py-2.5 w-full text-sm 
              rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors
              ${collapsed ? "justify-center" : ""}`}
                    >
                        <LogOut size={18} />
                        {!collapsed && <span>Sign Out</span>}
                        {collapsed && (
                            <span className="absolute left-14 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                Sign Out
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </aside>
    );
}
