import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// Custom hook to share theme across app
export const useTheme = () => {
    const context = useContext(ThemeContext);

    // If used outside of the Provider, an error is thrown
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};