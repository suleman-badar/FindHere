import { useEffect, useState } from "react";
import axios from "axios";


export default function useDetails(id) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8000/api/listing/details/${id}`);
                setDetails(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    return { details, loading, error };
}
