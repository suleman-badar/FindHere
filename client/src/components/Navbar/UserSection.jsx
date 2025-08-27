import React from "react";
import { Box, Button, IconButton, List } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserSection({ isDrawer }) {
    const { user } = useAuth();

    if (isDrawer) {

        return (
            <List>
                <Box sx={{ textAlign: "center", my: 1 }}>
                    {!user ? (
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#082567",
                                width: "80%",
                                color: "white",
                                borderRadius: "8px",
                                padding: "8px 16px",
                                textTransform: "none",
                                boxShadow: 3,
                                "&:hover": {
                                    backgroundColor: "#000d1a",
                                },
                            }}
                            component={Link}
                            to="/signin"
                        >
                            Sign In
                        </Button>
                    ) : (<></>)
                    }
                </Box>
            </List>
        );
    }

    // Desktop view
    return (
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 0.1 }}>
            {!user ? (
                <Button color="inherit" component={Link} to="/signin">
                    Sign In
                </Button>
            ) : (<></>)
            }
        </Box>
    );
}
