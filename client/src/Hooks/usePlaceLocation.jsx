import axios from "axios";
import { useState, useEffect } from "react";

export default function usePlaceLocation(lat, lon) {
    const [place, setPlace] = useState({ city: "", province: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (lat == null || lon == null) return;

        const getCityAndProvince = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
                );

                const address = res.data.address;
                const city =
                    address.city ||
                    address.town ||
                    address.village ||
                    address.hamlet ||
                    address.county;
                const province = address.state;

                setPlace({ city, province });
            } catch (err) {
                console.error("Error fetching location:", err);
            } finally {
                setLoading(false);
            }
        };

        getCityAndProvince();
    }, [lat, lon]);

    return { place, loading };
}
