import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SendForgotPasswordCode() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const maskEmail = (email) => {
    const [user, domain] = email.split("@");
    if (user.length <= 2) {
      return user[0] + "***@" + domain;
    }
    return (
      user.slice(0, 2) +
      "*".repeat(user.length - 4) +
      user.slice(-2) +
      "@" +
      domain
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.patch("http://localhost:8000/api/auth/send-forgot-password-code", { email });
      setMaskedEmail(maskEmail(email));
      setMessage("A reset code has been sent to your email.");
      toast.success("Sent code to your email!");
      navigate("/verify-code", { state: { email } });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to send reset code. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password?
        </h2>

        {maskedEmail ? (
          <div className="text-center">
            <p className="mb-4">
              We sent a reset code to <strong>{maskedEmail}</strong>
            </p>
            <p className="text-green-600">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
            {message && (
              <p className="text-center text-red-600">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
