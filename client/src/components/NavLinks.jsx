import React from "react";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function NavLinks({ links, isDrawer }) {
    if (isDrawer) {
        // Drawer version with icons
        return (
            <List>
                {links.map((link) => (
                    <ListItemButton
                        key={link.text}
                        component={Link}
                        to={link.path}
                    >
                        <ListItemIcon>{link.icon}</ListItemIcon>
                        <ListItemText primary={link.text} />
                    </ListItemButton>
                ))}
            </List>
        );
    }

    // Desktop version without icons
    return (
        <Box sx={{
            display: { xs: "none", sm: "flex" },
            gap: 0.1,
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            top: "10px", // adjust based on your AppBar height
            zIndex: 1100, // make sure it stays above content if needed
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "4px 12px",
        }}>
            {links.map((link) => (
                <Button
                    key={link.text}
                    color="inherit"
                    component={Link}
                    to={link.path}
                >
                    {link.text}
                </Button>
            ))}
        </Box>
    );
}
