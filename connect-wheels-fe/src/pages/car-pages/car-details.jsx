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
    Table,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import GarageIcon from "@mui/icons-material/Garage";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCarByIdQuery, useLikeCarMutation, useGetCarCommentsQuery, useAddCommentMutation } from "../../redux/slices/carSlice";
import ImageGallery from "../../components/ImageGallery";
import { toast } from "react-toastify";

export default function CarDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [comment, setComment] = useState("");

    const { data: car, isLoading } = useGetCarByIdQuery(id);
    const { data: comments = [] } = useGetCarCommentsQuery(id);
    const [likeCar, { isLoading: isLiking }] = useLikeCarMutation();
    const [addComment, { isLoading: isCommenting }] = useAddCommentMutation();

    const handleLike = async () => {
        try {
            await likeCar(id).unwrap();
            toast.success(car.isLiked ? "Removed like" : "Liked car");
        } catch (error) {
            toast.error("Failed to update like status");
        }
    };

    const handleCommentSubmit = async () => {
        if (comment.trim()) {
            try {
                await addComment({ carId: id, comment: comment.trim() }).unwrap();
                toast.success("Comment added!");
                setComment("");
            } catch (error) {
                toast.error("Failed to add comment");
            }
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!car) {
        return (
            <Container sx={{ py: 8, textAlign: "center" }}>
                <Typography variant="h5">Car not found</Typography>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                        <Box>
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                {car.year} {car.make} {car.model}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                <GarageIcon color="action" />
                                <Typography
                                    variant="body1"
                                    color="primary"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => navigate(`/garages/${car.garageId}`)}
                                >
                                    {car.garageName}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant={car.isLiked ? "contained" : "outlined"}
                                startIcon={car.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                onClick={handleLike}
                                disabled={isLiking}
                                color="error"
                            >
                                {car.likesCount} Likes
                            </Button>
                            {car.ownerId === 1 && ( // Current user check
                                <Button
                                    variant="outlined"
                                    startIcon={<EditIcon />}
                                    onClick={() => navigate(`/cars/${id}/edit`)}
                                >
                                    Edit
                                </Button>
                            )}
                        </Box>
                    </Box>

                    <Typography variant="body1" paragraph>
                        {car.description}
                    </Typography>

                    {car.pricing && (
                        <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>
                            {car.pricing}
                        </Typography>
                    )}

                    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <CommentIcon color="action" />
                            <Typography variant="body1">{car.commentsCount} Comments</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            by {car.ownerName}
                        </Typography>
                    </Box>
                </Paper>

                {/* Image Gallery */}
                <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Gallery
                    </Typography>
                    <ImageGallery images={car.images} cols={3} />
                </Paper>

                <Grid container spacing={3}>
                    {/* Specifications */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Specifications
                            </Typography>
                            <Table size="small">
                                <TableBody>
                                    {Object.entries(car.specifications).map(([key, value]) => (
                                        <TableRow key={key}>
                                            <TableCell sx={{ fontWeight: 600, textTransform: "capitalize" }}>
                                                {key.replace(/([A-Z])/g, " $1").trim()}
                                            </TableCell>
                                            <TableCell>{value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>

                    {/* Features */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Features
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
                                {car.features.map((feature, index) => (
                                    <Chip key={index} label={feature} color="primary" variant="outlined" />
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Comments Section */}
                <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Comments ({comments.length})
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleCommentSubmit}
                            disabled={!comment.trim() || isCommenting}
                        >
                            {isCommenting ? "Posting..." : "Post Comment"}
                        </Button>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <List>
                        {comments.map((c) => (
                            <ListItem key={c.id} alignItems="flex-start" sx={{ px: 0 }}>
                                <ListItemAvatar>
                                    <Avatar src={c.userAvatar} alt={c.userName} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {c.userName}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography variant="body2" color="text.primary" paragraph>
                                                {c.comment}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(c.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>

                    {comments.length === 0 && (
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                            No comments yet. Be the first to comment!
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}
