import React from "react";
import { Box, Button, IconButton, List, Avatar, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserSection({ isDrawer }) {
    const { user } = useAuth();
    const avatarSrc = user?.avatarUrl || null;
    const initials = user?.name?.split(" ").map((part) => part[0]).join("")?.slice(0, 2).toUpperCase();

    if (isDrawer) {
        return (
            <List>
                <Box sx={{ textAlign: "center", my: 1 }}>
                    {!user ? (
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "var(--color-primary-dark)",
                                width: "80%",
                                color: "white",
                                borderRadius: "8px",
                                padding: "8px 16px",
                                textTransform: "none",
                                boxShadow: 3,
                                "&:hover": {
                                    backgroundColor: "var(--color-primary)",
                                },
                            }}
                            component={Link}
                            to="/signin"
                        >
                            Sign In
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            component={Link}
                            to="/profile"
                            sx={{
                                width: "80%",
                                color: "var(--color-primary-dark)",
                                borderColor: "var(--color-primary-dark)",
                                borderRadius: "8px",
                                textTransform: "none",
                                padding: "10px 16px",
                            }}
                        >
                            <Avatar src={avatarSrc} sx={{ width: 32, height: 32, mr: 1, bgcolor: avatarSrc ? undefined : "var(--color-primary)" }}>
                                {!avatarSrc && initials}
                            </Avatar>
                            <Typography variant="button">Profile</Typography>
                        </Button>
                    )}
                </Box>
            </List>
        );
    }

    // Desktop view
    return (
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}>
            {!user ? (
                <Button color="inherit" component={Link} to="/signin">
                    Sign In
                </Button>
            ) : (
                <Tooltip title="View profile">
                    <IconButton component={Link} to="/profile" size="small" sx={{ p: 0 }}>
                        <Avatar src={avatarSrc} sx={{ width: 36, height: 36, bgcolor: avatarSrc ? undefined : "var(--color-primary)" }}>
                            {!avatarSrc && initials}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
}
