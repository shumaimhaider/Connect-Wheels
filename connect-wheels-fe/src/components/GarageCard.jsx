import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Box,
    IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useFollowGarageMutation } from "../redux/slices/garageSlice";
import { toast } from "react-toastify";

export default function GarageCard({ garage }) {
    const navigate = useNavigate();
    const [followGarage, { isLoading }] = useFollowGarageMutation();

    const handleFollow = async (e) => {
        e.stopPropagation();
        try {
            await followGarage(garage.id).unwrap();
            toast.success(
                garage.isFollowing ? "Unfollowed garage" : "Following garage"
            );
        } catch (error) {
            toast.error("Failed to update follow status");
        }
    };

    const handleCardClick = () => {
        navigate(`/garages/${garage.id}`);
    };

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
            }}
            onClick={handleCardClick}
        >
            <CardMedia
                component="img"
                height="200"
                image={garage.images[0]}
                alt={garage.name}
                sx={{ objectFit: "cover" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                    {garage.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {garage.description}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                        {garage.location}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <DirectionsCarIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            {garage.carsCount} cars
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <PeopleIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            {garage.followersCount} followers
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    <Chip label={garage.type} size="small" color="primary" />
                    {garage.tags.slice(0, 2).map((tag, index) => (
                        <Chip key={index} label={tag} size="small" variant="outlined" />
                    ))}
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                    by {garage.ownerName}
                </Typography>
                <IconButton
                    onClick={handleFollow}
                    disabled={isLoading}
                    color="error"
                    size="small"
                >
                    {garage.isFollowing ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </CardActions>
        </Card>
    );
}
