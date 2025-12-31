import {
    Container,
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { profileSchema } from "../../validations/profile-validations";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SaveIcon from "@mui/icons-material/Save";

export default function ProfileSettingsPage() {
    const { user } = useSelector((state) => state.user);

    const initialValues = {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
    };

    const handleSubmit = async (values) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Profile updated successfully!");
        console.log("Profile update:", values);
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="md">
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Profile Settings
                </Typography>

                <Paper elevation={2} sx={{ p: 4, mt: 3 }}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={profileSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Field name="firstName">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="First Name"
                                                    fullWidth
                                                    required
                                                    error={touched.firstName && Boolean(errors.firstName)}
                                                    helperText={touched.firstName && errors.firstName}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Field name="lastName">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Last Name"
                                                    fullWidth
                                                    required
                                                    error={touched.lastName && Boolean(errors.lastName)}
                                                    helperText={touched.lastName && errors.lastName}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="email">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Email"
                                                    type="email"
                                                    fullWidth
                                                    required
                                                    error={touched.email && Boolean(errors.email)}
                                                    helperText={touched.email && errors.email}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            startIcon={<SaveIcon />}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </Box>
    );
}
