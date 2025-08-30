import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function VerifyOtp() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId, email } = location.state || {};

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [resendMsg, setResendMsg] = useState("");

    const handleVerify = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/register/verify", {
                email,
                otp,
            });
            console.log("OTP Verified:", res.data);
            navigate("/admin/dashboard");
        } catch (e) {
            setError(e.response?.data?.message || "Invalid OTP");
        }
    };

    const handleResendOtp = async () => {
        try {
            await axios.post("http://localhost:8000/api/auth/register/resend-otp", { email });
            setResendMsg("OTP sent again to your email!");
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to resend OTP. Try again later.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-3">
            <h2 className="text-xl font-bold">Verify OTP for {email}</h2>

            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 rounded w-64 text-center"
            />

            <button
                onClick={handleVerify}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
                Verify
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
