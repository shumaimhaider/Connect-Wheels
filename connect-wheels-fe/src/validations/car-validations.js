import * as Yup from "yup";

// Car Create/Edit Validation Schema
export const carSchema = Yup.object().shape({
    make: Yup.string()
        .required("Make is required")
        .min(2, "Make must be at least 2 characters")
        .max(50, "Make must be 50 characters or less"),

    model: Yup.string()
        .required("Model is required")
        .min(1, "Model must be at least 1 character")
        .max(50, "Model must be 50 characters or less"),

    year: Yup.number()
        .required("Year is required")
        .min(1900, "Year must be 1900 or later")
        .max(new Date().getFullYear() + 1, "Year cannot be in the future")
        .integer("Year must be a whole number"),

    garageId: Yup.number()
        .required("Garage is required")
        .positive("Invalid garage selection"),

    description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description must be 1000 characters or less"),

    images: Yup.array()
        .of(Yup.string().url("Invalid image URL"))
        .min(1, "At least one image is required")
        .max(20, "Maximum 20 images allowed"),

    videos: Yup.array()
        .of(Yup.string().url("Invalid video URL"))
        .max(5, "Maximum 5 videos allowed"),

    specifications: Yup.object().shape({
        engine: Yup.string().max(100, "Engine description too long"),
        horsepower: Yup.string().max(50, "Horsepower description too long"),
        torque: Yup.string().max(50, "Torque description too long"),
        transmission: Yup.string().max(100, "Transmission description too long"),
        drivetrain: Yup.string().max(50, "Drivetrain description too long"),
        topSpeed: Yup.string().max(50, "Top speed description too long"),
        acceleration: Yup.string().max(50, "Acceleration description too long"),
    }),

    features: Yup.array()
        .of(Yup.string().max(100, "Feature description too long"))
        .max(20, "Maximum 20 features allowed"),

    pricing: Yup.string().max(50, "Pricing description too long"),
});

// Car Search/Filter Schema
export const carFilterSchema = Yup.object().shape({
    search: Yup.string().max(100, "Search query too long"),
    make: Yup.string().max(50, "Make filter too long"),
    year: Yup.number()
        .min(1900, "Year must be 1900 or later")
        .max(new Date().getFullYear() + 1, "Year cannot be in the future")
        .integer("Year must be a whole number"),
    garageId: Yup.number().positive("Invalid garage selection"),
    sortBy: Yup.string().oneOf(
        ["make", "year", "likes", "date"],
        "Invalid sort option"
    ),
    sortOrder: Yup.string().oneOf(["asc", "desc"], "Invalid sort order"),
});
