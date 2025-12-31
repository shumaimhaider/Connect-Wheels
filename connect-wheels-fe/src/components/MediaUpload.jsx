import { useState, useCallback } from "react";
import {
    Box,
    Button,
    LinearProgress,
    Typography,
    Paper,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function MediaUpload({ onUpload, accept = "image/*", multiple = true, maxFiles = 10 }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            const droppedFiles = Array.from(e.dataTransfer.files);
            handleFiles(droppedFiles);
        },
        [maxFiles]
    );

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        handleFiles(selectedFiles);
    };

    const handleFiles = (newFiles) => {
        const validFiles = newFiles.filter((file) => {
            if (accept.includes("image") && !file.type.startsWith("image/")) {
                return false;
            }
            if (accept.includes("video") && !file.type.startsWith("video/")) {
                return false;
            }
            return true;
        });

        const totalFiles = files.length + validFiles.length;
        if (totalFiles > maxFiles) {
            alert(`Maximum ${maxFiles} files allowed`);
            return;
        }

        const filesWithPreview = validFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            uploaded: false,
        }));

        setFiles((prev) => [...prev, ...filesWithPreview]);
    };

    const handleRemove = (index) => {
        setFiles((prev) => {
            const newFiles = [...prev];
            URL.revokeObjectURL(newFiles[index].preview);
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const handleUpload = async () => {
        setUploading(true);
        setProgress(0);

        // Simulate upload progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);

        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const uploadedUrls = files.map((f) => f.preview);
        if (onUpload) {
            onUpload(uploadedUrls);
        }

        setFiles((prev) => prev.map((f) => ({ ...f, uploaded: true })));
        setUploading(false);
    };

    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            <Box
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                sx={{
                    border: "2px dashed",
                    borderColor: "primary.main",
                    borderRadius: 2,
                    p: 4,
                    textAlign: "center",
                    bgcolor: "grey.50",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        bgcolor: "grey.100",
                        borderColor: "primary.dark",
                    },
                }}
            >
                <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                    Drag & Drop files here
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    or
                </Typography>
                <Button variant="contained" component="label" sx={{ mt: 1 }}>
                    Browse Files
                    <input
                        type="file"
                        hidden
                        accept={accept}
                        multiple={multiple}
                        onChange={handleFileSelect}
                    />
                </Button>
                <Typography variant="caption" display="block" sx={{ mt: 2 }} color="text.secondary">
                    Maximum {maxFiles} files allowed
                </Typography>
            </Box>

            {files.length > 0 && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Selected Files ({files.length})
                    </Typography>
                    <List>
                        {files.map((fileObj, index) => (
                            <ListItem key={index}>
                                <Box
                                    component="img"
                                    src={fileObj.preview}
                                    alt={`Preview ${index}`}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        objectFit: "cover",
                                        borderRadius: 1,
                                        mr: 2,
                                    }}
                                />
                                <ListItemText
                                    primary={fileObj.file.name}
                                    secondary={`${(fileObj.file.size / 1024 / 1024).toFixed(2)} MB`}
                                />
                                <ListItemSecondaryAction>
                                    {fileObj.uploaded ? (
                                        <CheckCircleIcon color="success" />
                                    ) : (
                                        <IconButton edge="end" onClick={() => handleRemove(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>

                    {uploading && (
                        <Box sx={{ mt: 2 }}>
                            <LinearProgress variant="determinate" value={progress} />
                            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                                Uploading... {progress}%
                            </Typography>
                        </Box>
                    )}

                    {!uploading && files.some((f) => !f.uploaded) && (
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleUpload}
                            sx={{ mt: 2 }}
                        >
                            Upload Files
                        </Button>
                    )}
                </Box>
            )}
        </Paper>
    );
}
