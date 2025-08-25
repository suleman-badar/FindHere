import { useState } from "react";
import Btn from "../components/Btn";
import SidebarAdmin from "../components/Dashboard/SidebarAdmin";
import SectionHeader from "../components/Dashboard/SectionHeader";
import StatCard from "../components/Dashboard/StatCard";
import SavedPlaceCard from "../components/Dashboard/SavedPlaceCard";
import ReviewCard from "../components/Dashboard/ReviewCard";
import ActivityItem from "../components/Dashboard/ActivityItem";
import { stats, savedPlaces, reviews, activities } from "../data/dummyData";

import GeneralInfoForm from "../components/adminForms/GeneralInfoForm";
import MediaForm from "../components/adminForms/MediaForm";
import ContactForm from "../components/adminForms/ContactForm";
import LocationForm from "../components/adminForms/LocationForm";
import HoursForm from "../components/adminForms/HoursForm";
import Listing from "../../../backend/models/Listing";

export default function Dashboard() {
    const [activePage, setActivePage] = useState("dashboard");

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
                            {savedPlaces.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all p-6"
                                >
                                    <SavedPlaceCard place={p} />
                                </div>
                            ))}
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
            <main className="flex-1 p-8 space-y-10">
                {renderContent()}
            </main>
        </div>
    );
}
