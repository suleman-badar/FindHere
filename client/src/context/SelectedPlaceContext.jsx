// context/SelectedPlaceContext.jsx
import { createContext, useContext, useState } from "react";

const SelectedPlaceContext = createContext();

export const SelectedPlaceProvider = ({ children }) => {
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    return (
        <SelectedPlaceContext.Provider value={{ selectedPlaceId, setSelectedPlaceId }}>
            {children}
        </SelectedPlaceContext.Provider>
    );
};

export const useSelectedPlace = () => useContext(SelectedPlaceContext);
