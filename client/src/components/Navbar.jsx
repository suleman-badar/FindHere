import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import NavLinks from "./Navbar/NavLinks";
import UserSection from "./Navbar/UserSection";
import HamburgerMenu from "./Navbar/Sidebar";
import LogoImg from "../assets/logoImg.png"
import ExploreIcon from "@mui/icons-material/Explore";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";

export default function Navbar() {
    const links = [
        { text: "Explore", path: "/", icon: <ExploreIcon sx={{ color: "#082567" }} /> },
        { text: "Categories", path: "/categories", icon: <CategoryIcon sx={{ color: "#082567" }} /> },
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
