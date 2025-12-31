import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Box,
    Button,
    Divider,
    Chip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";
import { useLikeCarMutation } from "../redux/slices/carSlice";
import { toast } from "react-toastify";
import ImageGallery from "./ImageGallery";

export default function CarPost({ car }) {
    const [likeCar, { isLoading }] = useLikeCarMutation();
    const [showComments, setShowComments] = useState(false);

    const handleLike = async () => {
        try {
            await likeCar(car.id).unwrap();
            toast.success(car.isLiked ? "Removed like" : "Liked car");
        } catch (error) {
            toast.error("Failed to update like status");
        }
    };

    return (
        <Card className="premium-card" sx={{ maxWidth: "100%", mb: 4 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                        {car.ownerName?.[0] || "U"}
                    </Avatar>
                }
                action={
                    <Typography variant="h6" color="secondary.main" fontWeight={800}>
                        {car.pricing || "N/A"}
                    </Typography>
                }
                title={
                    <Typography variant="subtitle1" fontWeight={700}>
                        {car.year} {car.make} {car.model}
                    </Typography>
                }
                subheader={`by ${car.ownerName} • ${car.garageName}`}
            />

            <Box className="car-post-image" sx={{ mx: 2 }}>
                {car.images?.length > 1 ? (
                    <ImageGallery images={car.images} cols={2} />
                ) : (
                    <CardMedia
                        component="img"
                        height="400"
                        image={car.images?.[0] || "https://via.placeholder.com/800x400?text=No+Image"}
                        alt={car.model}
                        sx={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                )}
            </Box>

            <CardContent>
                <Typography variant="body1" color="text.primary" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {car.description}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {car.tags?.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                                bgcolor: "rgba(0, 184, 212, 0.1)",
                                color: "secondary.main",
                                fontWeight: 600,
                            }}
                        />
                    ))}
                </Box>
            </CardContent>

            <Divider sx={{ mx: 2, opacity: 0.5 }} />

            <CardActions disableSpacing sx={{ justifyContent: "space-between", px: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                        startIcon={car.isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                        onClick={handleLike}
                        disabled={isLoading}
                        size="small"
                        sx={{ color: car.isLiked ? "error.main" : "text.secondary" }}
                    >
                        {car.likesCount || 0}
                    </Button>
                    <Button
                        startIcon={<CommentIcon />}
                        onClick={() => setShowComments(!showComments)}
                        size="small"
                        sx={{ color: "text.secondary", ml: 1 }}
                    >
                        {car.commentsCount || 0}
                    </Button>
                </Box>
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                    <ShareIcon fontSize="small" />
                </IconButton>
            </CardActions>

            {showComments && (
                <Box sx={{ p: 2, bgcolor: "background.default", borderTop: "1px solid", borderColor: "rgba(0,0,0,0.05)" }}>
                    <Typography variant="caption" color="text.secondary">
                        Comments section coming soon...
                    </Typography>
                </Box>
            )}
        </Card>
    );
}
