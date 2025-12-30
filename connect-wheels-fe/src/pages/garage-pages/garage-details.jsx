import { useState } from "react";
import {
    Container,
    Box,
    Typography,
    Paper,
    Button,
    Grid,
    Chip,
    Divider,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    TextField,
    Tabs,
    Tab,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import { useParams, useNavigate } from "react-router-dom";
import { useGetGarageByIdQuery, useFollowGarageMutation, useGetGarageCarsQuery } from "../../redux/slices/garageSlice";
import ImageGallery from "../../components/ImageGallery";
import CarPost from "../../components/CarPost";
import { toast } from "react-toastify";
import { mockComments, mockUsers } from "../../data/mock-data";

export default function GarageDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const [tabValue, setTabValue] = useState(0);

    const { data: garage, isLoading } = useGetGarageByIdQuery(id);
    const { data: cars = [] } = useGetGarageCarsQuery(id);
    const [followGarage, { isLoading: isFollowing }] = useFollowGarageMutation();

    const handleFollow = async () => {
        try {
            await followGarage(id).unwrap();
            toast.success(garage.isFollowing ? "Unfollowed garage" : "Following garage");
        } catch (error) {
            toast.error("Failed to update follow status");
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!garage) {
        return (
            <Container sx={{ py: 8, textAlign: "center" }}>
                <Typography variant="h5">Garage not found</Typography>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
            <Container maxWidth="md">
                {/* Garage Overview Header */}
                <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, border: "1px solid", borderColor: "grey.200" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                        <Box>
                            <Typography variant="h3" fontWeight={800} gutterBottom sx={{ color: "grey.900" }}>
                                {garage.name}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                <LocationOnIcon sx={{ color: "primary.main" }} />
                                <Typography variant="h6" color="text.secondary" fontWeight={500}>
                                    {garage.location}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant={garage.isFollowing ? "outlined" : "contained"}
                                startIcon={garage.isFollowing ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                onClick={handleFollow}
                                disabled={isFollowing}
                                color="error"
                                sx={{ borderRadius: "24px", px: 3 }}
                            >
                                {garage.isFollowing ? "Following" : "Follow"}
                            </Button>
                            {garage.ownerId === 1 && (
                                <Button
                                    variant="outlined"
                                    startIcon={<EditIcon />}
                                    onClick={() => navigate(`/garages/${id}/edit`)}
                                    sx={{ borderRadius: "24px", px: 3 }}
                                >
                                    Edit
                                </Button>
                            )}
                        </Box>
                    </Box>

                    <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 3, color: "grey.700", lineHeight: 1.6 }}>
                        {garage.description}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h5" fontWeight={700}>{garage.carsCount}</Typography>
                            <Typography variant="body2" color="text.secondary">Cars</Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h5" fontWeight={700}>{garage.followersCount}</Typography>
                            <Typography variant="body2" color="text.secondary">Followers</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip label={garage.type} color="primary" sx={{ fontWeight: 600 }} />
                        {garage.tags.map((tag, index) => (
                            <Chip key={index} label={tag} variant="outlined" sx={{ borderRadius: "8px" }} />
                        ))}
                    </Box>
                </Paper>

                {/* Tabs for Cars and Followers */}
                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                    <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ "& .MuiTab-root": { fontWeight: 700, fontSize: "1rem" } }}>
                        <Tab label={`Cars (${cars.length})`} />
                        <Tab label={`Followers (${garage.followersCount})`} />
                        <Tab label="Gallery" />
                    </Tabs>
                </Box>

                {/* Tab Content */}
                {tabValue === 0 && (
                    <Box>
                        {cars.map((car) => (
                            <CarPost key={car.id} car={car} />
                        ))}
                        {cars.length === 0 && (
                            <Paper sx={{ p: 8, textAlign: "center", borderRadius: 4 }}>
                                <DirectionsCarIcon sx={{ fontSize: 64, color: "grey.300", mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">
                                    No cars in this garage yet
                                </Typography>
                            </Paper>
                        )}
                    </Box>
                )}

                {tabValue === 1 && (
                    <Paper sx={{ p: 3, borderRadius: 4 }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                            Followers
                        </Typography>
                        <List>
                            {mockUsers.slice(0, 5).map((user) => (
                                <ListItem key={user.id} sx={{ px: 0 }}>
                                    <ListItemAvatar>
                                        <Avatar src={user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography fontWeight={600}>{user.firstName} {user.lastName}</Typography>}
                                        secondary={user.email}
                                    />
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ borderRadius: "16px" }}
                                        onClick={() => navigate(`/users/${user.id}/garages`)}
                                    >
                                        View Garages
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}

                {tabValue === 2 && (
                    <Paper sx={{ p: 3, borderRadius: 4 }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                            Garage Gallery
                        </Typography>
                        <ImageGallery images={garage.images} cols={3} />
                    </Paper>
                )}
            </Container>
        </Box>
    );
}
