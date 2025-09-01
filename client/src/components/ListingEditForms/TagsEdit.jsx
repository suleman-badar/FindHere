// TagsEdit.jsx
import {
    Card,
    CardContent,
    Typography,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Chip,
    MenuItem,
    Select,
    OutlinedInput,
    Box,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";

const tagsOptions = [
    "Family Friendly",
    "Romantic",
    "Vegan Options",
    "Pet Friendly",
    "Casual",
];
const amenitiesOptions = [
    "Wifi",
    "Parking",
    "Live Music",
    "Air Conditioning",
];

export default function TagsEdit() {
    const { listingDetails, setListingDetails, loading, onSave, onCancel } =
        useOutletContext();

    const handleCheckboxChange = (field, option, checked) => {
        let updated = listingDetails[field] ? [...listingDetails[field]] : [];
        if (checked) {
            if (!updated.includes(option)) updated.push(option);
        } else {
            updated = updated.filter((o) => o !== option);
        }
        setListingDetails({ ...listingDetails, [field]: updated });
    };

    return (
        <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
                <Typography variant="h5" className="mb-4 font-bold">
                    Edit Tags & Amenities
                </Typography>

                {/* Tags Select */}
                <FormGroup>
                    <Typography variant="subtitle1">Tags</Typography>
                    <Select
                        multiple
                        fullWidth
                        value={listingDetails?.tags || []}
                        onChange={(e) =>
                            setListingDetails({
                                ...listingDetails,
                                tags: e.target.value,
                            })
                        }
                        input={<OutlinedInput label="Tags" />}
                        renderValue={(selected) => (
                            <Box className="flex flex-wrap gap-1">
                                {selected.map((tag) => (
                                    <Chip key={tag} label={tag} size="small" />
                                ))}
                            </Box>
                        )}
                    >
                        {tagsOptions.map((tag) => (
                            <MenuItem key={tag} value={tag}>
                                {tag}
                            </MenuItem>
                        ))}
                    </Select>
                </FormGroup>

                {/* Amenities Checkboxes */}
                <FormGroup className="mt-4">
                    <Typography variant="subtitle1">Amenities</Typography>
                    {amenitiesOptions.map((amenity) => (
                        <FormControlLabel
                            key={amenity}
                            control={
                                <Checkbox
                                    checked={
                                        listingDetails?.amenities?.includes(
                                            amenity
                                        ) || false
                                    }
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                            "amenities",
                                            amenity,
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label={amenity}
                        />
                    ))}
                </FormGroup>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="outlined" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSave && onSave(listingDetails)}

                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
