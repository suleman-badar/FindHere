import * as Yup from "yup";

export const reviewValidations = Yup.object().shape({
    rating: Yup.number()
        .required("Rating is required")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot be more than 5"),

    reviewText: Yup.string()
        .required("Comment is required")
        .max(500, "Review cannot exceed 500 characters"),

    name: Yup.string()
        .max(50, "Name cannot exceed 50 characters"),

    image: Yup.mixed().nullable(),
});