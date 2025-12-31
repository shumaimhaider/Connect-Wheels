import {
    Container,
    Box,
    Typography,
    Paper,
    FormControlLabel,
    Switch,
    Button,
    Divider,
} from "@mui/material";
import { Formik, Form } from "formik";
import { preferencesSchema } from "../../validations/profile-validations";
import { toast } from "react-toastify";
import SaveIcon from "@mui/icons-material/Save";

export default function PreferencesPage() {
    const initialValues = {
        emailNotifications: true,
        pushNotifications: false,
        notifyOnFollow: true,
        notifyOnLike: true,
        notifyOnComment: true,
        notifyOnGarageUpdate: false,
        privacyShowEmail: false,
        privacyShowGarages: true,
        privacyShowCars: true,
    };

    const handleSubmit = async (values) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Preferences updated successfully!");
        console.log("Preferences update:", values);
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="md">
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Preferences
                </Typography>

                <Paper elevation={2} sx={{ p: 4, mt: 3 }}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={preferencesSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue, isSubmitting }) => (
                            <Form>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                    {/* Notification Settings */}
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            Notification Settings
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={values.emailNotifications}
                                                        onChange={(e) =>
                                                            setFieldValue("emailNotifications", e.target.checked)
                                                        }
                                                    />
                                                }
                                                label="Email Notifications"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={values.pushNotifications}
                                                        onChange={(e) =>
                                                            setFieldValue("pushNotifications", e.target.checked)
                                                        }
                                                    />
                                                }
                                                label="Push Notifications"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={values.notifyOnFollow}
                                                        onChange={(e) =>
                                                            setFieldValue("notifyOnFollow", e.target.checked)
                                                        }
                                                    />
                                                }
                                                label="Notify when someone follows you"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={values.notifyOnLike}
                                                        onChange={(e) =>
                                                            setFieldValue("notifyOnLike", e.target.checked)
                                                        }
                                                    />
                                                }
                                                label="Notify when someone likes your car"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={values.notifyOnComment}
                                                        onChange={(e) =>
                                                            setFieldValue("notifyOnComment", e.target.checked)
                                                        }
                                                    />
                                                }
                                                label="Notify when someone comments"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={values.notifyOnGarageUpdate}
                                                        onChange={(e) =>
                                                            setFieldValue("notifyOnGarageUpdate", e.target.checked)
                                                        }
                                                    />
                                                }
                                                label="Notify on garage updates"
                                            />
                                        </Box>
                                    </Box>

                                    <Divider />

                                    {/* Privacy Settings */}
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            Privacy Settings
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={values.privacyShowEmail}
                                                        onChange={(e) =>
                                                            setFieldValue("privacyShowEmail", e.target.checked)
                                                        }
                                                    />
                                                }
                                                label="Show email on profile"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={values.privacyShowGarages}
                                                        onChange={(e) =>
                                                            setFieldValue("privacyShowGarages", e.target.checked)
                                                        }
                                                    />
                                                }
                                                label="Show my garages publicly"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={values.privacyShowCars}
                                                        onChange={(e) =>
                                                            setFieldValue("privacyShowCars", e.target.checked)
                                                        }
                                                    />
                                                }
                                                label="Show my cars publicly"
                                            />
                                        </Box>
                                    </Box>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        disabled={isSubmitting}
                                        sx={{ alignSelf: "flex-start" }}
                                    >
                                        {isSubmitting ? "Saving..." : "Save Preferences"}
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </Box>
    );
}
