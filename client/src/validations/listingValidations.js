import * as Yup from "yup";

const ListingValidation = {
    1: Yup.object({
        name: Yup.string()
            .required("Name is required")
            .min(2, "Name must be at least 2 characters"),
        number: Yup.string()
            .required("Phone number is required")
            .matches(/^[0-9]+$/, "Phone must only contain digits")
            .min(7, "Too short"),
        description: Yup.string()
            .max(1000, "Description must be under 1000 characters"),
    }),

    2: Yup.object().shape({
        location: Yup.array()
            .of(Yup.number().typeError("Latitude and Longitude must be numbers"))
            .min(2, "Both latitude and longitude are required")
            .required("Location is required"),
    }),

    3: Yup.object().shape({
        openingHours: Yup.object().shape({
            open: Yup.string().required("Opening time required"),
            close: Yup.string()
                .required("Closing time required")
                .test("is-after", "Closing must be after opening", function(val) {
                    const { open } = this.parent;
                    return !open || !val || val > open;
                }),
        }),
    }),

    4: Yup.object({
        images: Yup.array()
            .min(1, "At least one image is required")
            .max(5, "You can only upload up to 5 images"),
    }),
};

export default ListingValidation;