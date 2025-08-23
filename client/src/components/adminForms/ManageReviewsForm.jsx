import { Box, Button, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";

export default function ReviewManager() {
    const [reviews, setReviews] = useState([
        { id: 1, user: "Ali", text: "Great food!", rating: 5 },
        { id: 2, user: "Sara", text: "Service was slow.", rating: 3 },
    ]);

    const deleteReview = (id) => {
        setReviews(reviews.filter((r) => r.id !== id));
    };

    return (
        <Box>
            <Typography variant="h6" mb={2}>Manage Reviews</Typography>
            <List>
                {reviews.map((r) => (
                    <ListItem
                        key={r.id}
                        secondaryAction={
                            <Button color="error" onClick={() => deleteReview(r.id)}>
                                Delete
                            </Button>
                        }
                    >
                        <ListItemText primary={`${r.user} (${r.rating}/5)`} secondary={r.text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
