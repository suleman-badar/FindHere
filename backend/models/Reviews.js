    import mongoose, { Schema } from "mongoose";

    const reviewSchema = new Schema({

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        reviewText: {
            type: String,
            required: true,
            maxlength: 500,
        },
        name: {
            type: String,
            maxlength: 50,
            default: "Anonymous",
        },

        image: {
            type: String,
            required: false,
            default: "/default-user.png",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        listingId: {
            type: Schema.Types.ObjectId,
            ref: "Listing",
            required: true
        }

    });

    const Review = mongoose.model("Review", reviewSchema);
    export default Review;