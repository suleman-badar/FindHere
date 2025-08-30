import SectionHeader from "../components/Dashboard/SectionHeader";
import StatCard from "../components/Dashboard/StatCard";
import SavedPlaceCard from "../components/Dashboard/SavedPlaceCard";
import ActivityItem from "../components/Dashboard/ActivityItem";
import Btn from "../components/Btn";
import { stats, activities } from "../data/dummyData";
import { useSelectedPlace } from "../context/SelectedPlaceContext";
import { useOutletContext } from "react-router-dom";

export default function DashboardHome() {

    const { places } = useOutletContext();
    const { setSelectedPlaceId } = useSelectedPlace();


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
                    places.map((place) => <SavedPlaceCard key={place._id} place={place} onSelect={() => setSelectedPlaceId(place._id)} />)
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
