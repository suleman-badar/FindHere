import Review from "../models/Reviews.js";

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