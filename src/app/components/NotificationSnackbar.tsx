"use client";
import React from "react";
import { Box, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export type NotificationType = "success" | "error";

export interface NotificationProps {
  notification: { type: NotificationType; message: string } | null;
  onClose: () => void;
}

export default function NotificationSnackbar({ notification, onClose }: NotificationProps) {
  if (!notification) return null;
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 32,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: 16000,
      }}
    >
      <Box
        sx={{
          bgcolor: notification.type === "success" ? "#1AAF4B" : "#E53935",
          color: "#fff",
          px: 3,
          py: 1.2,
          borderRadius: 2,
          boxShadow: 3,
          fontWeight: 500,
          fontSize: 16,
          textAlign: "center",
          mx: "auto",
          minWidth: 240,
        }}
      >
        {notification.message}
        <IconButton
          size="small"
          sx={{ color: "#fff", ml: 2 }}
          onClick={onClose}
        >
          <CancelIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
