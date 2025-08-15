import { Button, TextField, InputAdornment } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";

export default function Search() {
    const [value, setValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Searching for:", value);
    }

    return (
        <div className="bg-white w-[80%] p-6 rounded-2xl flex justify-center my-3">
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
                    placeholder="Enter location,city,place or name..."
                    variant="filled"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    sx={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: "15px",
                        "& .MuiFilledInput-root": {
                            borderRadius: "15px",
                            backgroundColor: "#f0f0f0",
                            height: "60px",
                            display: "flex",
                            alignItems: "center", // ✅ centers icon & text
                            paddingBottom: 2,
                        },
                        "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after": {
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

                {/* Search Button */}
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SearchIcon />}
                    sx={{
                        backgroundColor: "#082567",
                        borderRadius: "20px",
                        padding: "10px 20px",
                        height: "60px",
                    }}
                >
                    Search
                </Button>

                {/* Filters Button */}
                <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    sx={{
                        borderColor: "#082567",
                        backgroundColor: "#f0f0f0",
                        color: "#082567",
                        borderRadius: "20px",
                        padding: "10px 20px",
                        height: "60px",
                    }}
                >
                    Filters
                </Button>
            </form>
        </div>
    );
}
