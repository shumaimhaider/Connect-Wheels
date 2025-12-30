import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Chip,
    Box,
    IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import { useLikeCarMutation } from "../redux/slices/carSlice";
import { toast } from "react-toastify";

export default function CarCard({ car }) {
    const navigate = useNavigate();
    const [likeCar, { isLoading }] = useLikeCarMutation();

    const handleLike = async (e) => {
        e.stopPropagation();
        try {
            await likeCar(car.id).unwrap();
            toast.success(car.isLiked ? "Removed like" : "Liked car");
        } catch (error) {
            toast.error("Failed to update like status");
        }
    };

    const handleCardClick = () => {
        navigate(`/cars/${car.id}`);
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
                image={car.images[0]}
                alt={`${car.year} ${car.make} ${car.model}`}
                sx={{ objectFit: "cover" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                    {car.year} {car.make} {car.model}
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
                    {car.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {car.garageName}
                    </Typography>
                    {car.pricing && (
                        <Typography variant="h6" color="primary" fontWeight={600}>
                            {car.pricing}
                        </Typography>
                    )}
                </Box>

                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <FavoriteIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            {car.likesCount}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <CommentIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            {car.commentsCount}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                    by {car.ownerName}
                </Typography>
                <IconButton
                    onClick={handleLike}
                    disabled={isLoading}
                    color="error"
                    size="small"
                >
                    {car.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </CardActions>
        </Card>
    );
}
