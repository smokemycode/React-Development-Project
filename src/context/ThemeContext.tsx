import { createContext, useState, useEffect, ReactNode } from "react";
import type { Theme, ThemeContextType } from "../types";

// Context with a default value of undefined
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component that wraps the whole app and shares the theme data inside it
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // Check localStorage to see if user picked a theme before
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme');
        return (savedTheme as Theme) || 'light';
    });

    // When the theme changes save it to the localStorage and add attribute to the <html> tag
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Toggle function
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};