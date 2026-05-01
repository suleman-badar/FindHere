import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import api from "../api/axios";
import DashboardSkeleton from "../components/Skeletons/DashboardSkeleton";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const stored = localStorage.getItem("dashboardSidebarCollapsed");
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Fetch user listings on mount
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        // Check auth first
        await api.get("/api/auth/check-auth", { withCredentials: true });
        
        // Fetch owner listings
        const res = await api.get("/api/listing/owner", { withCredentials: true });
        setPlaces(res.data.data || []);
      } catch (err) {
        console.error("Error fetching places:", err);
        // Redirect to home with auth message if not authenticated
        if (err.response?.status === 401) {
          navigate("/", { state: { authMessage: "You must be logged in first" } });
        } else {
          toast.error("Failed to fetch your listings");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [navigate]);

  // Listen for sidebar collapse state changes via localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem("dashboardSidebarCollapsed");
        setCollapsed(stored ? JSON.parse(stored) : false);
      } catch {
        setCollapsed(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 100);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Listen for screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = screenWidth < 768 ? (collapsed ? 80 : 80) : (collapsed ? 80 : 288);
  const contentMargin = screenWidth < 768 ? 16 : (collapsed ? 80 : 288);

  if (loading) {
    return (
      <div className="flex mt-6">
        <Sidebar places={[]} />
        <main className="flex-1" style={{ marginLeft: `${contentMargin}px`, transition: "all 0.3s ease" }}>
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="flex mt-6">
      <Sidebar places={places} />

      <div className="flex-1" style={{ marginLeft: `${contentMargin}px`, transition: "all 0.3s ease" }}>
        <Outlet context={{ places, setPlaces }} />
      </div>
    </div>
  );
}