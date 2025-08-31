// OpeningHoursSection.jsx
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

// Parse "HH:MM", "H:MM", "H AM/PM", "H:MM am/pm" -> minutes since midnight
const parseTimeToMinutes = (str) => {
    if (!str) return null;
    const s = String(str).trim();
    const m = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
    if (!m) return null;

    let hours = parseInt(m[1], 10);
    const minutes = parseInt(m[2] || "0", 10);
    const suffix = (m[3] || "").toUpperCase();

    if (suffix === "AM") {
        if (hours === 12) hours = 0;
    } else if (suffix === "PM") {
        if (hours !== 12) hours += 12;
    }
    // 24h inputs pass through unchanged
    if (hours >= 24 || minutes >= 60) return null;

    return hours * 60 + minutes;
};

// Check if currentMinutes falls inside [open, close) with overnight support
const isWithinRange = (currentMinutes, openMin, closeMin) => {
    if (openMin == null || closeMin == null) return false;
    if (openMin === closeMin) return false; // treat as closed
    if (closeMin > openMin) {
        // same-day window
        return currentMinutes >= openMin && currentMinutes < closeMin;
    }
    // overnight window (e.g., 20:00 -> 02:00)
    return currentMinutes >= openMin || currentMinutes < closeMin;
};

export default function OpeningHoursSection({ hours }) {
    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return (
        <Box className="my-10 px-4 sm:px-8 md:px-16">


            <Box className="space-y-3">
                {daysOfWeek.map((day) => {
                    const open = hours?.[day]?.open || null;
                    const close = hours?.[day]?.close || null;
                    const isClosedAllDay = !open || !close;
                    const isToday = day === todayName;

                    const openMin = parseTimeToMinutes(open);
                    const closeMin = parseTimeToMinutes(close);
                    const openNow = !isClosedAllDay && isWithinRange(currentMinutes, openMin, closeMin);

                    return (
                        <Accordion
                            key={day}
                            defaultExpanded={isToday}
                            className={`rounded-xl shadow-md transition ${isToday ? "border-2 border-blue-400 bg-blue-50/40" : ""
                                }`}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                {/* Day name + icon */}
                                <Typography
                                    className={`font-semibold flex items-center gap-3 ${isToday ? "text-blue-700" : "text-gray-800"
                                        }`}
                                >
                                    <AccessTimeIcon
                                        className={`${isToday ? "text-blue-600" : "text-gray-500"}`}
                                    />
                                    {day}
                                </Typography>

                                {/* Right side content */}
                                <Box className="ml-auto flex items-center gap-3">
                                    {/* Show status ONLY for today */}
                                    {isToday && (
                                        <>
                                            {isClosedAllDay ? (
                                                <Chip
                                                    icon={<CancelIcon />}
                                                    label="Closed Today"
                                                    color="error"
                                                    size="small"
                                                    variant="filled"
                                                />
                                            ) : openNow ? (
                                                <Chip
                                                    icon={<CheckCircleIcon />}
                                                    label="Open Now"
                                                    color="success"
                                                    size="small"
                                                    variant="filled"
                                                />
                                            ) : (
                                                <Chip
                                                    icon={<CancelIcon />}
                                                    label="Closed Now"
                                                    color="error"
                                                    size="small"
                                                    variant="filled"
                                                />
                                            )}
                                        </>
                                    )}

                                    {/* Always show timings for every day (including today) */}
                                    <Typography
                                        className={`text-sm ${isClosedAllDay ? "text-red-500 font-medium" : "text-gray-700"
                                            }`}
                                    >
                                        {isClosedAllDay ? "Closed" : `${open} - ${close}`}
                                    </Typography>
                                </Box>
                            </AccordionSummary>

                            {/* Optional details area; keep concise */}
                            <AccordionDetails>
                                <Typography className="text-gray-700">
                                    {isClosedAllDay
                                        ? "No service hours on this day."
                                        : isToday
                                            ? `Today's schedule: ${open} to ${close}.`
                                            : `Open from ${open} to ${close}.`}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Box>
        </Box>
    );
}
