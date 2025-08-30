import { useState, useEffect } from "react";
import {
    Compass, Bookmark, Star, Wrench, LogOut, ChevronLeft, ChevronRight,
    Info, Image, Phone, Clock, Map
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSelectedPlace } from "../../context/SelectedPlaceContext";

export default function SidebarAdmin({ places }) {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { selectedPlaceId } = useSelectedPlace();

    const [collapsed, setCollapsed] = useState(true);
    const [animateAdminItems, setAnimateAdminItems] = useState(false);
    const [trigger, setTrigger] = useState(0);

    // Re-trigger animation whenever selectedPlaceId changes
    useEffect(() => {
        if (!selectedPlaceId) return;

        setAnimateAdminItems(false);
        const timeout = setTimeout(() => setAnimateAdminItems(true), 10);

        return () => clearTimeout(timeout);
    }, [selectedPlaceId, trigger]);

    // Call this whenever a card is clicked
    const handleCardClick = (id) => {
        setSelectedPlaceId(id);
        setTrigger(prev => prev + 1);
    };

    const handleSignOut = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/auth/logout",
                {},
                { withCredentials: true }
            );

            if (res.data.success) {
                logout();
                toast.success("Logged out successfully");
                navigate("/signin");
            } else {
                toast.error(res.data.message || "Logout failed");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error logging out");
            console.error("Logout error:", error);
        }
    };

    const items = [
        { key: "dashboard", label: "Dashboard", icon: Compass },
        { key: "saved", label: "Saved Places", icon: Bookmark },
        { key: "tools", label: "Tools", icon: Wrench },
    ];

    const adminItems = [
        { key: "general-info", label: "General Info", icon: Info },
        { key: "contact", label: "Contact", icon: Phone },
        { key: "location", label: "Location", icon: Map },
        { key: "hours", label: "Hours", icon: Clock },
        { key: "media", label: "Media", icon: Image },
        { key: "reviews", label: "My Reviews", icon: Star },

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

            {/* Sidebar content */}
            <div className="flex flex-col justify-between overflow-hidden">
                <nav className="flex-1 py-3 space-y-1">
                    {/* Main items */}
                    {items.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => navigate(`/admin/${key}`)}
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

                    {/* Admin items - animate on every click */}
                    {selectedPlaceId && (
                        <div
                            className={`overflow-hidden transform transition-all duration-500 ease-in-out
                                ${collapsed ? "pl-0" : "pl-2"}
                                ${animateAdminItems ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"} 
                                origin-top`}
                        >
                            {adminItems.map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    onClick={() =>
                                        navigate(`/admin/edit/${selectedPlaceId}/${key}`)
                                    }
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
                        </div>
                    )}
                </nav>

                {/* Footer */}
                <div className="p-3 ">
                    <button
                        className={`group relative flex items-center gap-3 px-3 py-2.5 w-full text-sm 
                        rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors
                        ${collapsed ? "justify-center" : ""}`}
                        onClick={handleSignOut}
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
