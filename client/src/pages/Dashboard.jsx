import { useState } from "react";
import SidebarAdmin from "../components/Dashboard/SidebarAdmin";
// import Topbar from "../components/Topbar";
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
import ManageReviewsForm from "../components/adminForms/ManageReviewsForm";

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
            case "manage-reviews":
                return <ManageReviewsForm />;
            case "dashboard":   // 👈 show widgets here
            default:
                return (
                    <>
                        <SectionHeader title="Engagement Stats" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((s) => (
                                <StatCard key={s.id} {...s} />
                            ))}
                        </div>

                        <SectionHeader title="Saved Places" />
                        <div className="space-y-4">
                            {savedPlaces.map((p) => (
                                <SavedPlaceCard key={p.id} place={p} />
                            ))}
                        </div>

                        <SectionHeader title="Recent Reviews" />
                        <div className="space-y-4">
                            {reviews.map((r) => (
                                <ReviewCard key={r.id} review={r} />
                            ))}
                        </div>

                        <SectionHeader title="Recent Activity" />
                        <div className="space-y-3">
                            {activities.map((a) => (
                                <ActivityItem key={a.id} activity={a} />
                            ))}
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="flex">
            {/* Sidebar handles navigation */}
            <SidebarAdmin onSelect={setActivePage} />

            <main className="flex-1 p-6 space-y-8">
                {renderContent()}
            </main>
        </div>
    );
}
