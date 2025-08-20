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
        { text: "Explore", path: "/", icon: <ExploreIcon sx={{ color: "#082567" }} /> },
        { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon sx={{ color: "#082567" }} /> },
        { text: "About", path: "/about", icon: <InfoIcon sx={{ color: "#082567" }} /> },

    ];

    return (
        <>
            <AppBar
                position="relative"
                color="transparent"
                sx={{ backdropFilter: "blur(8px)", backgroundColor: "#F8F9FA" }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <img src={LogoImg} alt="Logo"
                        style={{
                            height: 70,
                            width: "auto"
                        }}></img>
                    <UserSection />
                    <HamburgerMenu links={links} />
                </Toolbar>
            </AppBar>
            <NavLinks links={links} />
        </>

    );
}
