import SectionHeader from "./Dashboard/SectionHeader";
import StatCard from "./Dashboard/StatCard";
import SavedPlaceCard from "./Dashboard/SavedPlaceCard";
import ActivityItem from "./Dashboard/ActivityItem";
import Btn from "../components/Btn";
import { stats, activities } from "../data/dummyData";
import { useSelectedPlace } from "../context/SelectedPlaceContext";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

export default function DashboardHome() {
    const { places, setPlaces } = useOutletContext();
    const { setSelectedPlaceId } = useSelectedPlace();

    useEffect(() => {
        const savedScroll = sessionStorage.getItem("scrollY");
        if (savedScroll) {
            window.scrollTo(0, parseInt(savedScroll, 10));
            sessionStorage.removeItem("scrollY");
        }
    }, [places]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;

        try {
            await axios.delete(
                `${process.env.REACT_APP_API_BASE_URL}/api/listing/${id}`,
                { withCredentials: true }
            );
            toast.success("Listing deleted successfully");
            setPlaces((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            console.log("error", err);
            toast.error(err.response?.data?.message || "Failed to delete listing");
        }
    };

    return (
        <div className="space-y-10 px-6">

            {/*  STATS */}
            <section>
                <SectionHeader title="Engagement Stats" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                    {stats.map((s) => (
                        <StatCard key={s.id} {...s} />
                    ))}
                </div>
            </section>

            {/*SAVED PLACES*/}
            <section>
                <div className="flex items-center justify-between">
                    <SectionHeader title="Your Listings" />
                </div>

                <div className="mt-4">
                    {places.length === 0 ? (
                        <div className="bg-white border border-[#e9e5e5] rounded-2xl p-10 text-center">
                            <p className="text-[#6b7280]">No listings yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {places.map((place) => (
                                <SavedPlaceCard
                                    key={place._id}
                                    place={place}
                                    onSelect={() => setSelectedPlaceId(place._id)}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex justify-center mt-6">
                    <Btn
                        text="Add New"
                        to="/addListing"
                        className="w-full sm:w-auto px-6 py-3"
                    />
                </div>
            </section>

            {/* ACTIVITY */}
            <section>
                <SectionHeader title="Recent Activity" />

                <div className="mt-4 space-y-4">
                    {activities.map((a) => (
                        <div
                            key={a.id}
                            className="flex items-center justify-between p-4 rounded-2xl border border-[#e9e5e5] bg-[#fff6f5] hover:border-[#b91c1c] hover:shadow-md transition-all duration-200 cursor-pointer group"
                        >
                            <ActivityItem activity={a} />
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}