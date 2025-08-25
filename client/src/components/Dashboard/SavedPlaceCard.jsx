import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Star, Share2 } from "lucide-react";

export default function SavedPlaceCard({ place }) {
    const { id } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/listing/details/${id}`);
                setDetails(res.data);
            } catch (err) {
                console.error("Error fetching details:", err);
            }
        };
        fetchDetails();
    }, [id]);

    // if(details && details.length>0)
    return (
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all">
            {/* Place Info */}
            <div>
                <div className="text-lg font-semibold text-gray-800">
                    {details?.name || "Loading..."}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Star size={16} className="text-yellow-500" /> <span>{place.rating}</span>
                    <span>•</span>
                    <span>Last visit: {place.lastVisit}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-sm text-gray-700 transition-colors">
                    View Details
                </button>
                <button className="p-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors">
                    <Share2 size={16} />
                </button>
            </div>
        </div>
    );
}
