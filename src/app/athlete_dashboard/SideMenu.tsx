"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";

export default function SideMenu({ setSection }: { setSection?: (section: string) => void }) {
  return (
    <Box sx={{ width: 220, flexShrink: 0, bgcolor: "background.paper", borderRight: '1px solid', borderColor: 'divider', height: '100vh', position: 'sticky', top: 0 }}>
      <List>
        <ListItem key="home" disablePadding>
          <ListItemButton onClick={() => setSection && setSection("home")}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
