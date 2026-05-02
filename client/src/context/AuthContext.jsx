import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const fetchMe = async () => {
        const res = await api.get("/api/auth/me");
        return res.data;
    };

    const { data: user, isLoading: loading } = useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

    const login = (userData) => {
        queryClient.setQueryData(["me"], userData);
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout');
        } catch (e) {
            // ignore
        }
        queryClient.setQueryData(["me"], null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}
