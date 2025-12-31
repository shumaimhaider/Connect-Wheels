import { useState } from "react";
import {
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Typography,
    Box,
    Avatar,
    Divider,
    Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { mockNotifications } from "../data/mock-data";

export default function NotificationBell() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewAll = () => {
        handleClose();
        navigate("/notifications");
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case "follow":
                return "👤";
            case "like":
                return "❤️";
            case "comment":
                return "💬";
            case "garage_update":
                return "🚗";
            default:
                return "🔔";
        }
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": {
                        bgcolor: "primary.dark",
                    },
                    p: 1,
                    ml: 1,
                }}
            >
                <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: 360,
                        maxHeight: 400,
                    },
                }}
            >
                <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                        Notifications
                    </Typography>
                </Box>
                <Divider />

                {mockNotifications.slice(0, 5).map((notification) => (
                    <MenuItem
                        key={notification.id}
                        onClick={handleClose}
                        sx={{
                            py: 1.5,
                            bgcolor: notification.isRead ? "transparent" : "action.hover",
                        }}
                    >
                        <Box sx={{ display: "flex", gap: 1.5, width: "100%" }}>
                            <Box sx={{ fontSize: 24 }}>{getNotificationIcon(notification.type)}</Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body2">{notification.message}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(notification.createdAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>
                    </MenuItem>
                ))}

                <Divider />
                <Box sx={{ p: 1 }}>
                    <Button fullWidth onClick={handleViewAll}>
                        View All Notifications
                    </Button>
                </Box>
            </Menu>
        </>
    );
}
