import * as Yup from "yup";

export const signUpValidations = Yup.object({
    name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),

    email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),

    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
            "Password must contain at least one uppercase, one lowercase, and one number"
        ),
});