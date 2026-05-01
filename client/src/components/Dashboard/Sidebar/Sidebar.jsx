import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Store,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Info,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  Tags,
  Image,
  Star
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useSelectedPlace } from "../../../context/SelectedPlaceContext";
import { toast } from "react-toastify";
import api from "../../../api/axios";

import SidebarItem from "./SidebarItem";

export default function Sidebar({ places }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();
  const { selectedPlaceId, setSelectedPlaceId } = useSelectedPlace();

  const [collapsed, setCollapsed] = useState(() => {
    try {
      const stored = localStorage.getItem("dashboardSidebarCollapsed");
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("dashboardSidebarCollapsed", JSON.stringify(collapsed));
    } catch {}
  }, [collapsed]);

  // 🔥 Sign Out Logic (from your old code)
  const handleSignOut = async () => {
    try {
      const res = await api.post("/api/auth/logout", {}, { withCredentials: true });

      if (res.data.success) {
        logout();
        toast.success("Logged out successfully");
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  // 🔥 Handle Place Click
  const handlePlaceClick = (id) => {
    setSelectedPlaceId(id === "all" ? null : id);
    navigate("/admin/dashboard");
  };

  // 🔥 Admin Sections with proper icons
  const adminItems = [
    { key: "basic-info", label: "Basic Info", icon: Info },
    { key: "contact", label: "Contact Info", icon: Phone },
    { key: "location", label: "Location", icon: MapPin },
    { key: "hours", label: "Opening Hours", icon: Clock },
    { key: "pricing", label: "Pricing", icon: DollarSign },
    { key: "tags", label: "Tags", icon: Tags },
    { key: "media", label: "Media", icon: Image },
    { key: "reviews", label: "Reviews", icon: Star },
  ];

  return (
    <aside
      className={`h-screen bg-white border-r border-[#e9e5e5] flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-[#e9e5e5] flex items-center">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#b91c1c] to-[#ff7043] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-[#b91c1c] font-bold text-lg">FindHere</span>
          </div>
        )}

        {/* Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-2 rounded-lg hover:bg-[#fff6f5]"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">

        {/* Main */}
        <div>
          {!collapsed && (
            <p className="text-xs font-semibold text-[#6b7280] uppercase mb-2 px-2">
              Dashboard
            </p>
          )}

          <SidebarItem
            icon={LayoutDashboard}
            label="All Listings"
            collapsed={collapsed}
            isActive={location.pathname === "/admin/dashboard"}
            onClick={() => handlePlaceClick("all")}
          />
        </div>

        {/* Places */}
        <div>
          {!collapsed && (
            <p className="text-xs font-semibold text-[#6b7280] uppercase mb-2 px-2">
              Your Places
            </p>
          )}

          <div className="space-y-1">
            {places.map((place) => (
              <SidebarItem
                key={place._id}
                icon={Store}
                label={place.name}
                subText={place.location?.address}
                collapsed={collapsed}
                isActive={selectedPlaceId === place._id}
                onClick={() => handlePlaceClick(place._id)}
              />
            ))}
          </div>
        </div>

        {/* Admin Section */}
        {selectedPlaceId && (
          <div>
            {!collapsed && (
              <p className="text-xs font-semibold text-[#6b7280] uppercase mb-2 px-2">
                Manage
              </p>
            )}

            <div className="space-y-1">
              {adminItems.map(({ key, label, icon }) => {
                const Icon = icon;

                return (
                  <SidebarItem
                    key={key}
                    icon={Icon}
                    label={label}
                    collapsed={collapsed}
                    isActive={location.pathname.includes(key)}
                    onClick={() =>
                      navigate(`/admin/edit/${selectedPlaceId}/${key}`)
                    }
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#e9e5e5]">
        <SidebarItem
          icon={LogOut}
          label="Sign Out"
          collapsed={collapsed}
          danger
          onClick={handleSignOut}
        />
      </div>
    </aside>
  );
}