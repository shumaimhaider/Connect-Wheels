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
import { mockFollowers } from "../../data/mock-data";

export default function FollowersPage() {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="md">
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Followers
                </Typography>

                <Paper elevation={2} sx={{ mt: 3 }}>
                    <List>
                        {mockFollowers.map((follower) => (
                            <ListItem
                                key={follower.id}
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                                secondaryAction={
                                    <Button
                                        variant={follower.isFollowing ? "outlined" : "contained"}
                                        size="small"
                                    >
                                        {follower.isFollowing ? "Following" : "Follow Back"}
                                    </Button>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={follower.avatar} alt={follower.firstName} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${follower.firstName} ${follower.lastName}`}
                                    secondary={
                                        <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                                            <Chip label={`${follower.followersCount} followers`} size="small" />
                                            <Chip label={`${follower.garagesCount} garages`} size="small" />
                                        </Box>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>

                    {mockFollowers.length === 0 && (
                        <Box sx={{ p: 4, textAlign: "center" }}>
                            <Typography variant="body1" color="text.secondary">
                                No followers yet
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}
