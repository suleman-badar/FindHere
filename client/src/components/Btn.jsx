import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Btn({ text, className = "", IconStart = null, IconEnd = null, w = "80%", to = null, sx: sxProp, ...props }) {
    return (
        <Button
            {...props}
            sx={(theme) => ({
                backgroundColor: "#082567",
                width: w,
                margin: "0.5rem",
                color: "white",
                borderRadius: "8px",
                padding: "8px 16px",
                textTransform: "none",
                boxShadow: 3,
                cursor: "pointer",
                gap: 2,
                "&:hover": {
                    backgroundColor: "#000d1a",
                },
                // Merge parent sx safely
                ...(typeof sxProp === "function" ? sxProp(theme) : sxProp),
            })}
            startIcon={IconStart ? <IconStart /> : null}
            endIcon={IconEnd ? <IconEnd /> : null}
            component={to ? Link : "button"}
            to={to || undefined}
            className={className}
        >
            {text}
        </Button>
    );
}
