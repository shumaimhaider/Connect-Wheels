import {
    Container,
    Typography,
    Grid,
    Box,
    Button,
    CircularProgress,
    Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetGaragesQuery } from "../../redux/slices/garageSlice";
import GarageCard from "../../components/GarageCard";
import AddIcon from "@mui/icons-material/Add";
import GarageIcon from "@mui/icons-material/Garage";

export default function MyGaragesPage() {
    const navigate = useNavigate();
    const { data: garages = [], isLoading } = useGetGaragesQuery();

    // Filter garages for the current user (mock user ID 1)
    const myGarages = garages.filter((g) => g.ownerId === 1);

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
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Box>
                        <Typography variant="h4" fontWeight={800} gutterBottom>
                            My Garages
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Manage and showcase your personal car collections.
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate("/garages/create")}
                        sx={{ borderRadius: "24px", px: 3, py: 1, fontWeight: 600 }}
                    >
                        Create New Garage
                    </Button>
                </Box>

                {myGarages.length > 0 ? (
                    <Grid container spacing={3}>
                        {myGarages.map((garage) => (
                            <Grid item xs={12} sm={6} md={4} key={garage.id}>
                                <GarageCard garage={garage} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Paper sx={{ p: 8, textAlign: "center", borderRadius: 4, border: "1px solid", borderColor: "grey.200" }}>
                        <GarageIcon sx={{ fontSize: 80, color: "grey.300", mb: 2 }} />
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            No Garages Yet
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            You haven't created any garages. Start by creating your first one!
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/garages/create")}
                            sx={{ borderRadius: "24px", px: 4 }}
                        >
                            Create Your First Garage
                        </Button>
                    </Paper>
                )}
            </Container>
        </Box>
    );
}
