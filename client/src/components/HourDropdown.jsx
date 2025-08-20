import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function HourDropdown({ label, value, onChange }) {
    const hours = Array.from({ length: 24 }, (_, i) => i + 1);

    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {hours.map((h) => (
                    <MenuItem key={h} value={h}>
                        {h}:00
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
