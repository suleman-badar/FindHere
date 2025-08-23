import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function MediaForm() {
    const [mainImage, setMainImage] = useState("");
    const [gallery, setGallery] = useState([""]);

    const handleGalleryChange = (index, value) => {
        const newGallery = [...gallery];
        newGallery[index] = value;
        setGallery(newGallery);
    };

    const addGalleryItem = () => setGallery([...gallery, ""]);

    const handleSave = () => {
        console.log({ mainImage, gallery });
    };

    return (
        <Box display="flex" flexDirection="column" gap={3} maxWidth="600px">
            <TextField
                label="Main Image URL"
                value={mainImage}
                onChange={(e) => setMainImage(e.target.value)}
                fullWidth
            />
            {gallery.map((img, idx) => (
                <TextField
                    key={idx}
                    label={`Gallery Image ${idx + 1}`}
                    value={img}
                    onChange={(e) => handleGalleryChange(idx, e.target.value)}
                    fullWidth
                />
            ))}
            <Button variant="outlined" onClick={addGalleryItem}>
                Add Gallery Image
            </Button>
            <Button variant="contained" onClick={handleSave}>
                Save
            </Button>
        </Box>
    );
}
