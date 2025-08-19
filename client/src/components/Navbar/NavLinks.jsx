import React from "react";

import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
    Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function NavLinks({ links, isDrawer }) {
    if (isDrawer) {
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
            top: "10px",
            zIndex: 1100,

            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px) saturate(100%)",
            WebkitBackdropFilter: "blur(12px) saturate(180%)",

            borderRadius: "50px",
            padding: "6px 14px",

            border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
        >
            {links.map((link, index) => (
                <React.Fragment key={link.text}>
                    <Button
                        color="inherit"
                        component={Link}
                        to={link.path}
                        sx={{ px: 2 }}
                    >
                        {link.text}
                    </Button>
                    {index < links.length - 1 && (
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                mx: 0.5,
                                height: "20px",
                                alignSelf: "center",
                                borderColor: "rgba(200, 200, 200, 0.7)",
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
        </Box>
    );
}
