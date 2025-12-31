import * as Yup from "yup";

// Garage Create/Edit Validation Schema
export const garageSchema = Yup.object().shape({
    name: Yup.string()
        .required("Garage name is required")
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name must be 100 characters or less"),

    description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be 500 characters or less"),

    location: Yup.string()
        .required("Location is required")
        .min(3, "Location must be at least 3 characters")
        .max(100, "Location must be 100 characters or less"),

    type: Yup.string()
        .required("Garage type is required")
        .oneOf(
            ["Classic", "Performance", "Electric", "Off-Road", "Luxury", "Custom"],
            "Invalid garage type"
        ),

    tags: Yup.array()
        .of(Yup.string())
        .min(1, "At least one tag is required")
        .max(10, "Maximum 10 tags allowed"),

    images: Yup.array()
        .of(Yup.string().url("Invalid image URL"))
        .min(1, "At least one image is required")
        .max(10, "Maximum 10 images allowed"),
});

// Garage Search/Filter Schema
export const garageFilterSchema = Yup.object().shape({
    search: Yup.string().max(100, "Search query too long"),
    location: Yup.string().max(100, "Location filter too long"),
    type: Yup.string().oneOf(
        ["", "Classic", "Performance", "Electric", "Off-Road", "Luxury", "Custom"],
        "Invalid garage type"
    ),
    sortBy: Yup.string().oneOf(
        ["name", "followers", "cars", "date"],
        "Invalid sort option"
    ),
    sortOrder: Yup.string().oneOf(["asc", "desc"], "Invalid sort order"),
});
