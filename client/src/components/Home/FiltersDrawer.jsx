import {
    Drawer,
    Button,
    Chip,
    Divider,
    Slide,
} from "@mui/material";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function FiltersDrawer({ open, onClose, onApply, search }) {
    const filterOptions = {
        cuisine: [
            "Italian",
            "Chinese",
            "Fast Food",
            "Cafe",
            "Indian",
            "Mexican",
            "Japanese",
        ],
        tags: [
            "Family Friendly",
            "Romantic",
            "Vegan Options",
            "Pet Friendly",
            "Casual",
        ],
        amenities: ["Wifi", "Parking", "Live Music", "Air Conditioning"],
        services: [
            "Dine-in",
            "Takeaway",
            "Delivery",
            "Outdoor Seating",
            "Reservation",
        ],
        paymentMethods: ["Cash", "Card", "Digital Wallet"],
    };

    const [selected, setSelected] = useState({
        cuisine: [],
        tags: [],
        amenities: [],
        services: [],
        paymentMethods: [],
    });

    const handleToggle = (category, value) => {
        setSelected((prev) => {
            const alreadySelected = prev[category].includes(value);
            const newFilters = {
                ...prev,
                [category]: alreadySelected
                    ? prev[category].filter((v) => v !== value)
                    : [...prev[category], value],
            };
            onApply(newFilters);
            return newFilters;
        });
    };

    const handleApply = () => {
        onApply(selected, true);
        onClose();
        search();

    };

    const handleClear = () => {
        const cleared = ({
            cuisine: [],
            tags: [],
            amenities: [],
            services: [],
            paymentMethods: [],
        });
        setSelected(cleared);
        onApply(cleared, false);
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: 380 },
                    borderTopLeftRadius: "16px",
                    borderBottomLeftRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "#f9fafb",
                },
            }}
            TransitionComponent={Slide}
            transitionDuration={400}
        >
            {/* Header */}
            <div className="px-4 py-4 flex items-center gap-2 bg-gradient-to-r from-indigo-300 to-blue-600 text-white sticky top-0 z-10 shadow">
                <FilterListIcon />
                <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
                {Object.entries(filterOptions).map(([category, options]) => (
                    <div
                        key={category}
                        className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition"
                    >
                        <h3 className="font-medium capitalize mb-3 text-gray-800 text-sm tracking-wide">
                            {category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {options.map((option) => (
                                <Chip
                                    key={option}
                                    label={option}
                                    clickable
                                    onClick={() => handleToggle(category, option)}
                                    color={
                                        selected[category].includes(option) ? "primary" : "default"
                                    }
                                    sx={{
                                        borderRadius: "9999px",
                                        px: 1.5,
                                        fontSize: "0.8rem",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-gray-200 bg-white sticky bottom-0 flex justify-between items-center">
                <Button
                    variant="text"
                    color="error"
                    onClick={handleClear}
                    sx={{ textTransform: "none", fontWeight: 500 }}
                >
                    Clear All
                </Button>
                <Button
                    variant="contained"
                    onClick={handleApply}
                    sx={{
                        background: "linear-gradient(90deg, #4f46e5, #2563eb)",
                        "&:hover": {
                            background: "linear-gradient(90deg, #4338ca, #1d4ed8)",
                        },
                        borderRadius: "9999px",
                        px: 4,
                        textTransform: "none",
                        fontWeight: 600,
                    }}
                >
                    Apply
                </Button>
            </div>
        </Drawer>
    );
}
