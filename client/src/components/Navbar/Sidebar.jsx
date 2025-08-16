import React, { useState } from "react";
import { Drawer, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NavLinks from "./NavLinks";
import UserSection from "./UserSection";

export default function HamburgerMenu({ links }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <IconButton
        color="inherit"
        edge="end"
        sx={{ display: { xs: "flex", sm: "none" } }}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: "100%", paddingLeft: 4, paddingRightt: 4 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon sx={{ marginRight: "0.5rem", marginTop: "0.5rem" }} />
            </IconButton>
          </Box>
          <NavLinks links={links} isDrawer />
          <UserSection isDrawer />
        </Box>
      </Drawer >
    </>
  );
}
