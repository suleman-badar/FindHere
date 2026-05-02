import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export default function useDetails(id) {
    const fetchDetails = async () => {
        if (!id) return null;
        const res = await api.get(`/api/listing/details/${id}`);
        return res.data;
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["listing", id],
        queryFn: fetchDetails,
        enabled: !!id,
        staleTime: 60 * 1000, //60s( 1000 ms * 60 ms = 1 min)
        refetchOnWindowFocus: false,
    });

    return { details: data, loading: isLoading, error, refetch };
}
