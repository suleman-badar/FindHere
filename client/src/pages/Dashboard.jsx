// Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import SidebarAdmin from "../components/Dashboard/SidebarAdmin";
import Loader from "../components/Loader";
import useDetails from "../Hooks/useDetails";
import { useSelectedPlace } from "../context/SelectedPlaceContext";
import axios from "axios";
import { toast } from "react-toastify";


export default function Dashboard() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listingDetails, setListingDetails] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [originalListingDetails, setOriginalListingDetails] = useState(null);


    const { selectedPlaceId } = useSelectedPlace();
    const navigate = useNavigate();


    let onSave = async (updatedData, newImages = []) => {
        try {
            setUpdating(true);

            const formData = new FormData();
            // append new image files
            if (newImages && newImages.length > 0) {
                newImages.forEach((file) => formData.append("images", file));
            }


            // append existing images as strings
            if (updatedData.existingImages && updatedData.existingImages.length > 0) {
                updatedData.existingImages.forEach((url) => formData.append("existingImages[]", url));
            }


            Object.keys(updatedData).forEach((key) => {
                if (key === "location" && Array.isArray(updatedData.location)) {
                    // handle location array
                    updatedData.location.forEach((coord) =>
                        formData.append("location[]", coord)
                    );
                }
                else if (Array.isArray(updatedData[key])) {
                    updatedData[key].forEach((item) => formData.append(`${key}[]`, item));
                } else if (
                    key !== "images" &&
                    key !== "existingImages" &&
                    key !== "newImages" &&
                    key !== "hours"
                ) {
                    formData.append(key, updatedData[key]);
                }
                if (key === "hours" && typeof updatedData[key] === "object") {
                    formData.append(key, JSON.stringify(updatedData[key]));
                }
            });

            const res = await axios.put(
                `http://localhost:8000/api/listing/update-listing/${selectedPlaceId}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            setListingDetails(res.data.data);

            toast.success("Updated successfully");
        } catch (err) {
            console.error("Error updating listing:", err);
            toast.error(err.response?.data?.message || "Update failed");
        } finally {
            setUpdating(false);
        }
    };


    const onCancel = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8000/api/listing/details/${selectedPlaceId}`,
                { withCredentials: true }
            );
            const formattedDetails = {
                ...res.data.data,
                openingHours: {
                    open: res.data.data.openingHours?.open || "",
                    close: res.data.data.openingHours?.close || "",
                },
            };
            setListingDetails(formattedDetails);
            setOriginalListingDetails(formattedDetails);
        } catch (err) {
            console.error("Failed to fetch listing details:", err);
            toast.error("Failed to reload listing");
        } finally {
            navigate("/admin/dashboard");
        }
    };


    // Fetch user listings
    useEffect(() => {
        const checkAuthAndFetch = async () => {
            try {
                setLoading(true);
                await axios.get("http://localhost:8000/api/auth/check-auth", { withCredentials: true });

                const res = await axios.get("http://localhost:8000/api/listing/owner", { withCredentials: true });
                setPlaces(res.data.data || []);
            } catch (err) {
                navigate("/", { state: { authMessage: "You must be logged in first" } });
            } finally {
                setLoading(false);
            }
        };
        checkAuthAndFetch();
    }, [navigate]);


    const { details, loading: detailsLoading } = useDetails(selectedPlaceId);

    useEffect(() => {
        if (details) setListingDetails(details.data);
    }, [details]);



    useEffect(() => {
        if (details) {
            const formattedDetails = {
                ...details.data,
                openingHours: {
                    open: typeof details.data.openingHours?.open === "string"
                        ? details.data.openingHours.open
                        : "",
                    close: typeof details.data.openingHours?.close === "string"
                        ? details.data.openingHours.close
                        : ""
                }
            };

            setListingDetails(formattedDetails);
            setOriginalListingDetails(formattedDetails);
        }
    }, [details]);



    if (loading || detailsLoading || updating) return <Loader />;

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <SidebarAdmin places={places} />

            <main className="flex-1 p-8 space-y-10">
                <Outlet context={{ places, setPlaces, selectedPlaceId, listingDetails, setListingDetails, loading, onSave, onCancel }} />
            </main>
        </div>
    );
}
