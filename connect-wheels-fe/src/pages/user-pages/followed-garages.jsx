import {
    Container,
    Box,
    Typography,
    Paper,
    Grid,
} from "@mui/material";
import { mockGarages } from "../../data/mock-data";
import GarageCard from "../../components/GarageCard";

export default function FollowedGaragesPage() {
    const followedGarages = mockGarages.filter((g) => g.isFollowing);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="xl">
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Garages You Follow
                </Typography>

                <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
                    <Grid container spacing={3}>
                        {followedGarages.map((garage) => (
                            <Grid item xs={12} sm={6} md={4} key={garage.id}>
                                <GarageCard garage={garage} />
                            </Grid>
                        ))}
                    </Grid>

                    {followedGarages.length === 0 && (
                        <Box sx={{ textAlign: "center", py: 8 }}>
                            <Typography variant="h6" color="text.secondary">
                                You're not following any garages yet
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Start exploring and follow garages that interest you
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}
