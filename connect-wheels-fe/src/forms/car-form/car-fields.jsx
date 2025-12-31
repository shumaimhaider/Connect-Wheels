import { useState } from "react";
import { useFormikContext, Field } from "formik";
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
    Grid,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import MediaUpload from "../../components/MediaUpload";
import { mockGarages } from "../../data/mock-data";

export const CarFormFields = ({ loading, isEdit }) => {
    const navigate = useNavigate();
    const { values, errors, touched, setFieldValue } = useFormikContext();
    const [featureInput, setFeatureInput] = useState("");

    const handleAddFeature = () => {
        if (featureInput.trim() && !values.features.includes(featureInput.trim())) {
            setFieldValue("features", [...values.features, featureInput.trim()]);
            setFeatureInput("");
        }
    };

    const handleDeleteFeature = (featureToDelete) => {
        setFieldValue(
            "features",
            values.features.filter((feature) => feature !== featureToDelete)
        );
    };

    const handleImageUpload = (urls) => {
        setFieldValue("images", urls);
    };

    return (
        <Box sx={{ maxWidth: 1000, mx: "auto" }}>
            <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    {isEdit ? "Edit Car" : "Add New Car"}
                </Typography>

                <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* Basic Information */}
                    <Typography variant="h6" color="primary">
                        Basic Information
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Field name="make">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Make"
                                        fullWidth
                                        required
                                        error={touched.make && Boolean(errors.make)}
                                        helperText={touched.make && errors.make}
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Field name="model">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Model"
                                        fullWidth
                                        required
                                        error={touched.model && Boolean(errors.model)}
                                        helperText={touched.model && errors.model}
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Field name="year">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Year"
                                        type="number"
                                        fullWidth
                                        required
                                        error={touched.year && Boolean(errors.year)}
                                        helperText={touched.year && errors.year}
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    {/* Garage Selection */}
                    <FormControl
                        fullWidth
                        required
                        error={touched.garageId && Boolean(errors.garageId)}
                    >
                        <InputLabel>Garage</InputLabel>
                        <Field name="garageId">
                            {({ field }) => (
                                <Select {...field} label="Garage">
                                    {mockGarages.map((garage) => (
                                        <MenuItem key={garage.id} value={garage.id}>
                                            {garage.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        </Field>
                        {touched.garageId && errors.garageId && (
                            <FormHelperText>{errors.garageId}</FormHelperText>
                        )}
                    </FormControl>

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

                    {/* Pricing */}
                    <Field name="pricing">
                        {({ field }) => (
                            <TextField
                                {...field}
                                label="Pricing (Optional)"
                                fullWidth
                                placeholder="e.g., $50,000"
                                error={touched.pricing && Boolean(errors.pricing)}
                                helperText={touched.pricing && errors.pricing}
                            />
                        )}
                    </Field>

                    {/* Specifications */}
                    <Typography variant="h6" color="primary">
                        Specifications
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="specifications.engine">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Engine"
                                        fullWidth
                                        placeholder="e.g., 3.0L V6"
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name="specifications.horsepower">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Horsepower"
                                        fullWidth
                                        placeholder="e.g., 300 hp"
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name="specifications.torque">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Torque"
                                        fullWidth
                                        placeholder="e.g., 280 lb-ft"
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name="specifications.transmission">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Transmission"
                                        fullWidth
                                        placeholder="e.g., 8-Speed Automatic"
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name="specifications.drivetrain">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Drivetrain"
                                        fullWidth
                                        placeholder="e.g., AWD"
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name="specifications.topSpeed">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Top Speed"
                                        fullWidth
                                        placeholder="e.g., 155 mph"
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <Field name="specifications.acceleration">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Acceleration (0-60 mph)"
                                        fullWidth
                                        placeholder="e.g., 0-60 mph in 5.5s"
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    {/* Features */}
                    <Typography variant="h6" color="primary">
                        Features
                    </Typography>

                    <Box>
                        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                            <TextField
                                value={featureInput}
                                onChange={(e) => setFeatureInput(e.target.value)}
                                placeholder="Add a feature"
                                size="small"
                                fullWidth
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddFeature();
                                    }
                                }}
                            />
                            <Button onClick={handleAddFeature} variant="outlined">
                                Add
                            </Button>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            {values.features.map((feature, index) => (
                                <Chip
                                    key={index}
                                    label={feature}
                                    onDelete={() => handleDeleteFeature(feature)}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Images */}
                    <Typography variant="h6" color="primary">
                        Images
                    </Typography>

                    <MediaUpload
                        onUpload={handleImageUpload}
                        accept="image/*"
                        multiple
                        maxFiles={20}
                    />
                    {values.images.length > 0 && (
                        <Typography variant="caption" color="text.secondary">
                            {values.images.length} image(s) selected
                        </Typography>
                    )}
                    {touched.images && errors.images && (
                        <FormHelperText error>{errors.images}</FormHelperText>
                    )}

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
                            {loading ? "Saving..." : isEdit ? "Update Car" : "Add Car"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};
