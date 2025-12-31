import {
    Container,
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button,
    Tabs,
    Tab,
} from "@mui/material";
import { useState } from "react";
import { mockNotifications } from "../../data/mock-data";

export default function NotificationsPage() {
    const [tab, setTab] = useState(0);

    const filteredNotifications =
        tab === 0
            ? mockNotifications
            : tab === 1
                ? mockNotifications.filter((n) => !n.isRead)
                : mockNotifications.filter((n) => n.isRead);

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
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="md">
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Notifications
                </Typography>

                <Paper elevation={2} sx={{ mt: 3 }}>
                    <Tabs
                        value={tab}
                        onChange={(e, newValue) => setTab(newValue)}
                        sx={{ borderBottom: 1, borderColor: "divider" }}
                    >
                        <Tab label="All" />
                        <Tab label="Unread" />
                        <Tab label="Read" />
                    </Tabs>

                    <List>
                        {filteredNotifications.map((notification) => (
                            <ListItem
                                key={notification.id}
                                sx={{
                                    bgcolor: notification.isRead ? "transparent" : "action.hover",
                                    borderBottom: 1,
                                    borderColor: "divider",
                                }}
                            >
                                <ListItemAvatar>
                                    <Box sx={{ fontSize: 32 }}>{getNotificationIcon(notification.type)}</Box>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={notification.message}
                                    secondary={new Date(notification.createdAt).toLocaleString()}
                                />
                            </ListItem>
                        ))}
                    </List>

                    {filteredNotifications.length === 0 && (
                        <Box sx={{ p: 4, textAlign: "center" }}>
                            <Typography variant="body1" color="text.secondary">
                                No notifications
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}
