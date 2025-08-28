import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Btn from "../components/Btn";
import SidebarAdmin from "../components/Dashboard/SidebarAdmin";
import SectionHeader from "../components/Dashboard/SectionHeader";
import StatCard from "../components/Dashboard/StatCard";
import SavedPlaceCard from "../components/Dashboard/SavedPlaceCard";
import ActivityItem from "../components/Dashboard/ActivityItem";
import { stats, activities } from "../data/dummyData";

import GeneralInfoForm from "../components/adminForms/GeneralInfoForm";
import MediaForm from "../components/adminForms/MediaForm";
import ContactForm from "../components/adminForms/ContactForm";
import LocationForm from "../components/adminForms/LocationForm";
import HoursForm from "../components/adminForms/HoursForm";
import Loader from "../components/Loader";

export default function Dashboard() {
    const [activePage, setActivePage] = useState("dashboard");
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Check auth and fetch user's listings
    useEffect(() => {
        const checkAuthAndFetch = async () => {
            try {
                setLoading(true);
                await axios.get("http://localhost:8000/api/auth/check-auth", {
                    withCredentials: true,
                });
                const res = await axios.get(
                    "http://localhost:8000/api/listing/owner",
                    { withCredentials: true }
                );
                // console.log("Full response:", res.data);

                setPlaces(res.data.data || []);
                // console.log("places", res.data.data);
            } catch (err) {
                navigate("/", {
                    state: { authMessage: "You must be logged in first" },
                });
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetch();
    }, [navigate]);

    if (loading) return <Loader />;

    const renderContent = () => {
        switch (activePage) {
            case "general":
                return <GeneralInfoForm />;
            case "media":
                return <MediaForm />;
            case "contact":
                return <ContactForm />;
            case "location":
                return <LocationForm />;
            case "hours":
                return <HoursForm />;
            case "dashboard":
            default:
                return (
                    <>
                        <SectionHeader title="Engagement Stats" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((s) => (
                                <div
                                    key={s.id}
                                    className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all p-6"
                                >
                                    <StatCard {...s} />
                                </div>
                            ))}
                        </div>

                        <SectionHeader title="Saved Places" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {places.length === 0 ? (
                                <p className="text-gray-500 text-center">No listings yet</p>
                            ) : (
                                places.map((place) => (
                                    <SavedPlaceCard key={place._id} place={place} />
                                ))
                            )}
                        </div>

                        <div className="flex justify-center mt-4">
                            <Btn text="Add New Place" to="/addListing" />
                        </div>

                        <SectionHeader title="Recent Activity" />
                        <div className="grid grid-cols-1 gap-4">
                            {activities.map((a) => (
                                <div
                                    key={a.id}
                                    className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all p-4"
                                >
                                    <ActivityItem activity={a} />
                                </div>
                            ))}
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <SidebarAdmin onSelect={setActivePage} />

            {/* Main Content */}
            <main className="flex-1 p-8 space-y-10">{renderContent()}</main>
        </div>
    );
}
