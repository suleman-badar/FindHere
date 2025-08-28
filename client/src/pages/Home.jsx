import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import Hero from "../components/Home/Hero.jsx";
import Footer from "../components/Footer.jsx";
import Category from "../components/Home/Category.jsx";
import Featured from "../components/Home/Featured.jsx";

export default function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const hasShownToast = useRef(false); // prevents double firing

    useEffect(() => {
        if (location.state?.authMessage && !hasShownToast.current) {
            hasShownToast.current = true;

            toast.warning(
                <div className="flex flex-col items-center">
                    <span>{location.state.authMessage}</span>
                    <Link
                        to="/signin"
                        className="mt-2 underline font-medium text-blue-800 hover:text-blue-600"
                    >
                        Go to Login
                    </Link>
                </div>,
                {
                    position: "top-center",
                    autoClose: 5000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "colored",
                }
            );

            // remove state so it doesn’t persist
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, location.pathname, navigate]);

    return (
        <div className="bg-white">
            <Hero />
            <Category />
            <Featured />
            <Footer />
        </div>
    );
}
