// PricingEdit.jsx
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";
import Loader from "../Loader";

const paymentOptions = ["Cash", "Card", "Digital Wallet"];
const serviceOptions = [
    "Dine-in",
    "Takeaway",
    "Delivery",
    "Outdoor Seating",
    "Reservation",
];

export default function PricingEdit() {
    const { listingDetails, setListingDetails, loading, onSave, onCancel } = useOutletContext();

    // Guard while data loads
    if (!listingDetails || loading) return <Loader />;

    const handleCheckboxChange = (field, option, checked) => {
        setListingDetails((prev) => {
            const current = Array.isArray(prev[field]) ? [...prev[field]] : [];
            let updated;
            if (checked) {
                updated = current.includes(option) ? current : [...current, option];
            } else {
                updated = current.filter((o) => o !== option);
            }
            return { ...prev, [field]: updated };
        });
    };

    return (
        <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
                <Typography variant="h5" className="mb-4 font-bold">
                    Edit Pricing & Services
                </Typography>

                {/* Average Meal Price */}
                <TextField
                    fullWidth
                    label="Average Meal Price"
                    name="price"
                    type="number"
                    value={listingDetails.price ?? ""}
                    onChange={(e) =>
                        setListingDetails((prev) => ({ ...prev, price: e.target.value }))
                    }
                    margin="normal"
                />

                {/* Payment Methods */}
                <Typography variant="subtitle1" className="mt-4">
                    Payment Methods
                </Typography>
                <FormGroup row>
                    {paymentOptions.map((option) => (
                        <FormControlLabel
                            key={option}
                            control={
                                <Checkbox
                                    checked={Array.isArray(listingDetails?.paymentMethods) && listingDetails.paymentMethods.includes(option)}
                                    onChange={(e) =>
                                        handleCheckboxChange("paymentMethods", option, e.target.checked)
                                    }
                                />
                            }
                            label={option}
                        />
                    ))}
                </FormGroup>

                {/* Services */}
                <Typography variant="subtitle1" className="mt-4">
                    Services
                </Typography>
                <FormGroup row>
                    {serviceOptions.map((option) => (
                        <FormControlLabel
                            key={option}
                            control={
                                <Checkbox
                                    checked={Array.isArray(listingDetails?.services) && listingDetails.services.includes(option)}
                                    onChange={(e) =>
                                        handleCheckboxChange("services", option, e.target.checked)
                                    }
                                />
                            }
                            label={option}
                        />
                    ))}
                </FormGroup>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="outlined" onClick={() => onCancel && onCancel()}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSave && onSave(listingDetails)}
                    >
                        Save Changes
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
