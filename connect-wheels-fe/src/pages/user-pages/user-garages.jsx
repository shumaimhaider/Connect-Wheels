import {
    Container,
    Typography,
    Grid,
    Box,
    CircularProgress,
    Paper,
    Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetGaragesQuery } from "../../redux/slices/garageSlice";
import GarageCard from "../../components/GarageCard";
import { mockUsers } from "../../data/mock-data";

export default function UserGaragesPage() {
    const { userId } = useParams();
    const { data: garages = [], isLoading } = useGetGaragesQuery();

    // Find the user from mock data
    const user = mockUsers.find((u) => u.id === parseInt(userId));
    const userGarages = garages.filter((g) => g.ownerId === parseInt(userId));

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
            <Container maxWidth="xl">
                <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, display: "flex", alignItems: "center", gap: 3 }}>
                    <Avatar src={user?.avatar} sx={{ width: 80, height: 80 }} />
                    <Box>
                        <Typography variant="h4" fontWeight={800}>
                            {user ? `${user.firstName} ${user.lastName}'s Garages` : "User Garages"}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Exploring the collection of {user?.firstName}.
                        </Typography>
                    </Box>
                </Paper>

                {userGarages.length > 0 ? (
                    <Grid container spacing={3}>
                        {userGarages.map((garage) => (
                            <Grid item xs={12} sm={6} md={4} key={garage.id}>
                                <GarageCard garage={garage} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Paper sx={{ p: 8, textAlign: "center", borderRadius: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            This user hasn't created any garages yet.
                        </Typography>
                    </Paper>
                )}
            </Container>
        </Box>
    );
}
