import * as Yup from "yup";

// Profile Update Validation Schema
export const profileSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must be 50 characters or less"),

    lastName: Yup.string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must be 50 characters or less"),

    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
});

// Password Update Validation Schema
export const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .required("Current password is required")
        .min(6, "Password must be at least 6 characters"),

    newPassword: Yup.string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters")
        .notOneOf(
            [Yup.ref("currentPassword")],
            "New password must be different from current password"
        ),

    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

// Preferences Validation Schema
export const preferencesSchema = Yup.object().shape({
    emailNotifications: Yup.boolean(),
    pushNotifications: Yup.boolean(),
    notifyOnFollow: Yup.boolean(),
    notifyOnLike: Yup.boolean(),
    notifyOnComment: Yup.boolean(),
    notifyOnGarageUpdate: Yup.boolean(),
    privacyShowEmail: Yup.boolean(),
    privacyShowGarages: Yup.boolean(),
    privacyShowCars: Yup.boolean(),
});
