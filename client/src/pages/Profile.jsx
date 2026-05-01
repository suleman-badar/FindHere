import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
    const { user, loading, login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [avatarPreview, setAvatarPreview] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [initialForm, setInitialForm] = useState(null);

    //  Auth + Init
    useEffect(() => {
        if (!loading && !user) {
            navigate("/signin");
            return;
        }

        if (user) {
            const initial = {
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
            };
            setFormData(initial);
            setInitialForm(initial);
            setAvatarPreview(user.avatarUrl || "");
            setAvatarFile(null);
        }
    }, [loading, user, navigate]);

    //  Validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email";
        }

        if (formData.phone && !/^[\d\s+\-()]+$/.test(formData.phone)) {
            newErrors.phone = "Invalid phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
            setErrors((prev) => ({ ...prev, avatar: "Only JPG and PNG files are allowed." }));
            return;
        }

        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, avatar: undefined }));
    };

    //  Change handler
    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleCancel = () => {
        if (initialForm) {
            setFormData(initialForm);
            setAvatarPreview(user?.avatarUrl || "");
            setAvatarFile(null);
            setErrors({});
            toast.info("Changes canceled");
        }
    };

    //  Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Fix errors before submitting");
            return;
        }

        try {
            setSaving(true);
            const body = new FormData();
            body.append("name", formData.name);
            body.append("email", formData.email);
            body.append("phone", formData.phone || "");

            if (avatarFile) {
                body.append("avatar", avatarFile);
            }

            const res = await api.patch("/api/auth/profile", body, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                login(res.data.user);
                setAvatarPreview(res.data.user.avatarUrl || "");
                setAvatarFile(null);
                setInitialForm({ name: res.data.user.name, email: res.data.user.email, phone: res.data.user.phone || "" });
                toast.success(res.data.message || "Profile updated");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#6b7280]">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fff6f5] px-4 py-10 sm:px-8 lg:px-16 font-['Roboto']">
            {/* HEADER */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-[#0f172a]">
                    Your Profile
                </h1>
                <p className="text-[#6b7280] mt-1">
                    Manage your personal information
                </p>

                <div className="h-1 w-20 mt-4 rounded-full bg-gradient-to-r from-[#9d1717] to-[#b91c1c]" />
            </div>

            {/* LAYOUT */}
            <div className="grid gap-8 lg:grid-cols-[320px_1fr]">

                {/* PROFILE CARD */}
                <div className="border border-[#e9e5e5] rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-[#ffffff]">          <div className="flex flex-col items-center text-center gap-4">

                    <div className="relative group">
                        <img
  src={avatarPreview || "https://via.placeholder.com/100"}
  alt="avatar"
  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
/>
                        <div className="absolute bottom-0 right-0 bg-[#b91c1c] text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition">
                            {avatarFile ? "Preview" : "Photo"}
                        </div>
                    </div>

                    <div>
                        <p className="text-lg font-semibold text-[#0f172a]">
                            {formData.name}
                        </p>
                        <p className="text-sm text-[#6b7280]">
                            {formData.email}
                        </p>
                    </div>
                </div>
                </div>

                {/* FORM CARD */}
<div className="bg-white border border-[#e9e5e5] rounded-2xl p-6 shadow-md relative overflow-hidden">                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* NAME */}
                        <div>
                            <label className="text-sm text-[#6b7280]">Full Name</label>
                            <input
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="w-full mt-1 px-4 py-2 border border-[#e9e5e5] rounded-xl focus:outline-none focus:border-[#b91c1c]"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm text-[#6b7280]">Email</label>
                            <input
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="w-full mt-1 px-4 py-2 border border-[#e9e5e5] rounded-xl focus:outline-none focus:border-[#b91c1c]"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* PHONE */}
                        <div>
                            <label className="text-sm text-[#6b7280]">Phone</label>
                            <input
                                value={formData.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                className="w-full mt-1 px-4 py-2 border border-[#e9e5e5] rounded-xl focus:outline-none focus:border-[#b91c1c]"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                            )}
                        </div>

                        {/* UPLOAD PHOTO */}
                        <div>
                            <label className="text-sm text-[#6b7280] block mb-2">Profile photo</label>
                            <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={handleFileChange}
                                className="w-full text-sm text-[#6b7280] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f8d7da] file:text-[#b91c1c] hover:file:bg-[#f1b9be]"
                            />
                            {errors.avatar && (
                                <p className="text-red-500 text-xs mt-1">{errors.avatar}</p>
                            )}
                        </div>

                        {/* BUTTONS */}
                        <div className="flex justify-end items-center gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-2 rounded-xl text-[#0f172a] font-medium border border-[#e9e5e5] bg-white hover:bg-[#f8f2f2] transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-[#9d1717] to-[#b91c1c] hover:shadow-lg hover:shadow-[#b91c1c]/30 transition-all duration-200 disabled:opacity-50"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}