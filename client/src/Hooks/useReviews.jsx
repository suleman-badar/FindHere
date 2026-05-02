import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export default function useReviews(id, opts = {}) {
    const fetchReviews = async () => {
        if (!id) return [];
        const res = await api.get(`/api/review/all-review/${id}`);
        return res.data || [];
    };

    const { data = [], isLoading, error, refetch } = useQuery({
        queryKey: ["reviews", id],
        queryFn: fetchReviews,
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        ...opts,
    });

    const totalReviews = useMemo(() => data.length, [data]);
    const avgRating = useMemo(() => {
        if (!data || data.length === 0) return 0;
        return data.reduce((acc, r) => acc + (r.rating || 0), 0) / data.length;
    }, [data]);

    return { reviews: data, avgRating, totalReviews, loading: isLoading, error, refetch };
}
