import { useState } from "react";
import { Box, ImageList, ImageListItem, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ImageGallery({ images, cols = 3 }) {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleOpen = (index) => {
        setCurrentIndex(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <ImageList cols={cols} gap={8}>
                {images.map((image, index) => (
                    <ImageListItem
                        key={index}
                        sx={{
                            cursor: "pointer",
                            overflow: "hidden",
                            borderRadius: 1,
                            transition: "transform 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                        onClick={() => handleOpen(index)}
                    >
                        <img
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            loading="lazy"
                            style={{ objectFit: "cover", height: "100%" }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            {/* Lightbox Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        maxWidth: "90vw",
                        maxHeight: "90vh",
                        outline: "none",
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            bgcolor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            "&:hover": {
                                bgcolor: "rgba(0, 0, 0, 0.7)",
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Previous Button */}
                    {images.length > 1 && (
                        <IconButton
                            onClick={handlePrevious}
                            sx={{
                                position: "absolute",
                                left: 10,
                                top: "50%",
                                transform: "translateY(-50%)",
                                bgcolor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                                "&:hover": {
                                    bgcolor: "rgba(0, 0, 0, 0.7)",
                                },
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    )}

                    {/* Image */}
                    <img
                        src={images[currentIndex]}
                        alt={`Gallery image ${currentIndex + 1}`}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "90vh",
                            objectFit: "contain",
                        }}
                    />

                    {/* Next Button */}
                    {images.length > 1 && (
                        <IconButton
                            onClick={handleNext}
                            sx={{
                                position: "absolute",
                                right: 10,
                                top: "50%",
                                transform: "translateY(-50%)",
                                bgcolor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                                "&:hover": {
                                    bgcolor: "rgba(0, 0, 0, 0.7)",
                                },
                            }}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    )}
                </Box>
            </Modal>
        </>
    );
}
