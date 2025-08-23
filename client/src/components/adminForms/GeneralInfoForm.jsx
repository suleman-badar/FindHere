import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function GeneralInfoForm() {
  const [name, setName] = useState("Restaurant Name");
  const [description, setDescription] = useState("Short description here...");
  const [about, setAbout] = useState("Detailed about text...");

  const handleSave = () => {
    // later: call API to save changes
    console.log({ name, description, about });
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} maxWidth="600px">
      <TextField
        label="Restaurant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
      />
      <TextField
        label="About"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        fullWidth
        multiline
        rows={4}
      />
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
}
