import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function VerifyOtp() {
    const location = useLocation();
    const navigate = useNavigate();
    const { email: paramEmail } = useParams();
    const { login } = useAuth();

    const storedEmail = typeof window !== "undefined" ? localStorage.getItem("pendingEmail") : null;
    const initialEmail = paramEmail || location.state?.email || storedEmail || "";

    const [email, setEmail] = useState(initialEmail);
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [resendMsg, setResendMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        if (!email) {
            setError("Please provide your email to verify.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await api.post(
                "/api/auth/register/verify",
                {
                    email,
                    otp,
                },
                { withCredentials: true }
            );

            if (res.data.success) {
                login(res.data.user);
                localStorage.removeItem("pendingEmail");
                toast.success(`Welcome, ${res.data.user.name}!`);
                navigate("/admin/dashboard");
            } else {
                setError(res.data.message || "Verification failed.");
            }
        } catch (e) {
            setError(e.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            await api.post("/api/auth/register/resend-otp", { email });
            setResendMsg("OTP sent again to your email!");
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to resend OTP. Try again later.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-3">
            <h2 className="text-xl font-bold">Verify OTP</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded w-64 text-center"
            />

            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 rounded w-64 text-center"
            />

            <button
                onClick={handleVerify}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Verifying..." : "Verify"}
            </button>

            <button
                onClick={handleResendOtp}
                className="text-blue-500 hover:underline mt-2"
            >
                Resend OTP
            </button>

            {error && <p className="text-red-500">{error}</p>}
            {resendMsg && <p className="text-green-500">{resendMsg}</p>}
        </div>
    );
}
