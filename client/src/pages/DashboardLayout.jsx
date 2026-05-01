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

  if (loading) {
    return (
      <div className="flex mt-6">
        <Sidebar places={[]} />
        <main className="flex-1 ml-8">
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="flex mt-6">
      <Sidebar places={places} />

      <div className="flex-1 ml-8">
        <Outlet context={{ places, setPlaces }} />
      </div>
    </div>
  );
}