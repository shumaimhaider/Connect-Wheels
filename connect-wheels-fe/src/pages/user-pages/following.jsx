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
    Chip,
} from "@mui/material";
import { mockFollowing } from "../../data/mock-data";

export default function FollowingPage() {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="md">
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Following
                </Typography>

                <Paper elevation={2} sx={{ mt: 3 }}>
                    <List>
                        {mockFollowing.map((user) => (
                            <ListItem
                                key={user.id}
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                                secondaryAction={
                                    <Button variant="outlined" size="small">
                                        Unfollow
                                    </Button>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={user.avatar} alt={user.firstName} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${user.firstName} ${user.lastName}`}
                                    secondary={
                                        <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                                            <Chip label={`${user.followersCount} followers`} size="small" />
                                            <Chip label={`${user.garagesCount} garages`} size="small" />
                                        </Box>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>

                    {mockFollowing.length === 0 && (
                        <Box sx={{ p: 4, textAlign: "center" }}>
                            <Typography variant="body1" color="text.secondary">
                                Not following anyone yet
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}
