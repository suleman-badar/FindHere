import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import NavLinks from "./Navbar/NavLinks";
import UserSection from "./Navbar/UserSection";
import HamburgerMenu from "./Navbar/Sidebar";
import LogoImg from "../assets/logoImg.png"
import ExploreIcon from "@mui/icons-material/Explore";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from '@mui/icons-material/Dashboard';


export default function Navbar() {
    const links = [
        { text: "Explore", path: "/", icon: <ExploreIcon sx={{ color: "var(--color-primary)" }} /> },
        { text: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon sx={{ color: "var(--color-primary)" }} /> },
        { text: "About", path: "/about", icon: <InfoIcon sx={{ color: "var(--color-primary)" }} /> },

    ];

    return (
        <>
            <AppBar
                position="relative"
                color="transparent"
                sx={{ backdropFilter: "blur(8px)" }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <img src={LogoImg} alt="Logo"
                        style={{
                            height: 70,
                            width: "auto"
                        }}></img>
                    <div className="flex items-center gap-3">
                        <UserSection />
                        <HamburgerMenu links={links} />
                    </div>
                </Toolbar>
            </AppBar>
            <NavLinks links={links} />
        </>

    );
}
