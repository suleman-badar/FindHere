import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function Btn({ text, IconStart = null, IconEnd = null, w = "80%", to = null, ...props }) {
    return (
        <Button sx={{
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
        }}
            startIcon={IconStart ? <IconStart /> : null}
            endIcon={IconEnd ? <IconEnd /> : null}
            component={to ? Link : "button"}
            to={to || undefined}
            {...props}   >
            {text}
        </Button>
    );
}