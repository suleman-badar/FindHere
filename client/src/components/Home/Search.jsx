import {
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Box
} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Btn from "../Btn";
import FiltersDrawer from "./FiltersDrawer";
import qs from "qs";

export default function Search() {
    const [value, setValue] = useState("");
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filters, setFilters] = useState({});
    const navigate = useNavigate();

    // Handle search submit
    async function handleSubmit(e) {
        if (e?.preventDefault) e.preventDefault();

        setHasSearched(true);

        try {
            const res = await axios.get("http://localhost:8000/api/search", {
                params: {
                    q: value,
                    ...filters,
                },
                paramsSerializer: (params) =>
                    qs.stringify(params, { arrayFormat: "repeat" }),
            });
            setResults(res.data);
            console.log("Result is:", res.data);
        } catch (err) {
            console.error("Search error:", err);
        }
    }

    // Handle filters applied
    const handleApplyFilters = (selectedFilters, shouldSearch = true) => {
        setFilters(selectedFilters);
        if (shouldSearch) {
            handleSubmit();
        }
    };

    const handleCloseResults = useCallback(() => {
        setResults([]);
        setHasSearched(false);
    }, []);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                handleCloseResults();
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [handleCloseResults]);
    return (
        <div className="bg-white w-full p-2 pt-5 px-4 rounded-2xl my-3 relative">
            {/* Search Bar */}
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <TextField
                    placeholder="Enter location, city, place or name..."
                    variant="filled"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    sx={{
                        backgroundColor: "#d0d0d0",
                        borderRadius: "15px",
                        "& .MuiFilledInput-root": {
                            borderRadius: "15px",
                            backgroundColor: "#d0d0d0",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            paddingBottom: 2,
                        },
                        "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                        {
                            borderBottom: "none",
                        },
                        flex: 1,
                    }}
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                <NearMeIcon sx={{ fontSize: 24, color: "gray" }} />
                            </InputAdornment>
                        ),
                    }}
                />


                <Btn
                    text="Search"
                    IconStart="p"
                    IconEnd="p"
                    w="20%"
                    onClick={handleSubmit}
                    sx={{
                        display: { xs: "none", sm: "flex" },
                    }}
                />

                <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                        borderColor: "#082567",
                        backgroundColor: "#d0d0d0",
                        color: "#082567",
                        borderRadius: "10px",
                        padding: "10px 20px",
                        height: "40px",
                        display: { xs: "flex", sm: "flex" },
                    }}
                >
                    Filters
                </Button>
            </form>

            {/* Results */}
            <div className="mt-4 w-full text-left relative">
                {hasSearched && results.length > 0 && (
                    <div className="space-y-2">
                        {/* Close Button */}
                        <IconButton
                            onClick={handleCloseResults}
                            size="small"
                            sx={{ position: "absolute", right: 15, top: -25 }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>

                        {results.map((r) => (
                            <div
                                key={r.id || r._id}
                                onClick={() => navigate(`/details/${r.id || r._id}`)}
                                className="p-3 rounded-lg border shadow-sm bg-gray-50 hover:bg-gray-100 transition w-[95%] mx-auto cursor-pointer"
                            >
                                <h5 className="text-sm font-medium text-gray-900">
                                    {r.name}
                                </h5>

                                {r.tags?.length > 0 ? (
                                    <p className="text-xs text-gray-500">{r.tags.join(", ")}</p>
                                ) : r.tagline ? (
                                    <p className="text-xs text-gray-500">{r.tagline}</p>
                                ) : null}
                            </div>
                        ))}
                    </div>
                )}

                {/* Show only when searched but no results */}
                {hasSearched && results.length === 0 && (
                    <p className="text-sm text-gray-500 mt-2 ml-4">
                        No results available
                    </p>
                )}
            </div>

            {/* Filters Drawer */}
            <FiltersDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onApply={handleApplyFilters}
                search={handleSubmit}
            />
        </div>
    );
}
