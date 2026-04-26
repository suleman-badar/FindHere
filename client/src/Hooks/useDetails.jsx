import { useState, useEffect } from "react";
import api from "../api/axios";
export default function useDetails(id) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDetails = async () => {
        if (!id) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const res = await api.get(`/api/listing/details/${id}`);
            setDetails(res.data);
            setError(null);
        } catch (err) {
            setError(err);
            setDetails(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);
    // console.log(details);

    return { details, loading, error, refetch: fetchDetails };
}
