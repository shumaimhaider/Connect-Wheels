import { useState } from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";
import {
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Chip,
    Paper,
    Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import MediaUpload from "../../components/MediaUpload";

export const GarageFormFields = ({ loading, isEdit }) => {
    const navigate = useNavigate();
    const { values, errors, touched, setFieldValue } = useFormikContext();
    const [tagInput, setTagInput] = useState("");

    const handleAddTag = () => {
        if (tagInput.trim() && !values.tags.includes(tagInput.trim())) {
            setFieldValue("tags", [...values.tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        setFieldValue(
            "tags",
            values.tags.filter((tag) => tag !== tagToDelete)
        );
    };

    const handleImageUpload = (urls) => {
        setFieldValue("images", urls);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    {isEdit ? "Edit Garage" : "Create New Garage"}
                </Typography>

                <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* Name */}
                    <Field name="name">
                        {({ field }) => (
                            <TextField
                                {...field}
                                label="Garage Name"
                                fullWidth
                                required
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                        )}
                    </Field>

                    {/* Description */}
                    <Field name="description">
                        {({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                required
                                multiline
                                rows={4}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                            />
                        )}
                    </Field>

                    {/* Location */}
                    <Field name="location">
                        {({ field }) => (
                            <TextField
                                {...field}
                                label="Location"
                                fullWidth
                                required
                                placeholder="e.g., Los Angeles, CA"
                                error={touched.location && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                            />
                        )}
                    </Field>

                    {/* Type */}
                    <FormControl
                        fullWidth
                        required
                        error={touched.type && Boolean(errors.type)}
                    >
                        <InputLabel>Garage Type</InputLabel>
                        <Field name="type">
                            {({ field }) => (
                                <Select {...field} label="Garage Type">
                                    <MenuItem value="Classic">Classic</MenuItem>
                                    <MenuItem value="Performance">Performance</MenuItem>
                                    <MenuItem value="Electric">Electric</MenuItem>
                                    <MenuItem value="Off-Road">Off-Road</MenuItem>
                                    <MenuItem value="Luxury">Luxury</MenuItem>
                                    <MenuItem value="Custom">Custom</MenuItem>
                                </Select>
                            )}
                        </Field>
                        {touched.type && errors.type && (
                            <FormHelperText>{errors.type}</FormHelperText>
                        )}
                    </FormControl>

                    {/* Tags */}
                    <Box>
                        <Typography variant="subtitle2" gutterBottom>
                            Tags
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                            <TextField
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                placeholder="Add a tag"
                                size="small"
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddTag();
                                    }
                                }}
                            />
                            <Button onClick={handleAddTag} variant="outlined">
                                Add
                            </Button>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            {values.tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    onDelete={() => handleDeleteTag(tag)}
                                />
                            ))}
                        </Box>
                        {touched.tags && errors.tags && (
                            <FormHelperText error>{errors.tags}</FormHelperText>
                        )}
                    </Box>

                    {/* Images */}
                    <Box>
                        <Typography variant="subtitle2" gutterBottom>
                            Images
                        </Typography>
                        <MediaUpload
                            onUpload={handleImageUpload}
                            accept="image/*"
                            multiple
                            maxFiles={10}
                        />
                        {values.images.length > 0 && (
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                                {values.images.length} image(s) selected
                            </Typography>
                        )}
                        {touched.images && errors.images && (
                            <FormHelperText error>{errors.images}</FormHelperText>
                        )}
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => navigate(-1)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : isEdit ? "Update Garage" : "Create Garage"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};
