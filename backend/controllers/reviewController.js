import Review from "../models/Reviews.js";
import Listing from "../models/Listing.js";

export const createReviews = async(req, res) => {
    try {
        const { rating, reviewText, name } = req.body;
        const { id } = req.params;

        const img = req.file ? req.file.path : "";

        const review = new Review({
            rating,
            reviewText,
            name: name || "Anonymous",
            image: img,
            listingId: id,
        });

        await review.save();
        res.status(201).json({ success: true, data: review });
    } catch (e) {
        console.error("Error creating review:", e.message);
        res.status(500).json({ message: e.message });
    }
};



export const getReviewsByListingId = async(req, res) => {
    try {
        const { id } = req.params;
        const reviews = await Review.find({ listingId: id });
        res.json(reviews);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }

}


// Get all listings with average ratings
export const getListingsWithRatings = async(req, res) => {
    try {
        const listings = await Listing.aggregate([{
                $lookup: {
                    from: "reviews", // collection name in MongoDB
                    localField: "_id",
                    foreignField: "listingId",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    averageRating: { $avg: "$reviews.rating" },
                    reviewCount: { $size: "$reviews" }
                }
            },
            {
                $project: {
                    name: 1,
                    location: 1,
                    description: 1,
                    number: 1,
                    website: 1,
                    openingHours: 1,
                    images: 1,
                    owner: 1,
                    averageRating: { $ifNull: ["$averageRating", 0] },
                    reviewCount: 1
                }
            }
        ]);

        res.json(listings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteReview = async(req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);

        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        await review.deleteOne();

        res.json({ success: true, message: "Review deleted successfully" });

    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Server error" });
    }
};