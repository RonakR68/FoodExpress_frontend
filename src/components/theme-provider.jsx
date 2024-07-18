import React, { createContext, useContext, useEffect, useState } from "react";

// Initial state for the theme
const initialState = {
    theme: "system",
    setTheme: () => null,
};

// Create a context with the initial state
const ThemeProviderContext = createContext(initialState);

// ThemeProvider component definition
export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }) {
    // State for the theme, defaulting to the value from localStorage or the default theme
    const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);

    // Effect to update the document's theme based on the state
    useEffect(() => {
        const root = window.document.documentElement;

        // Remove any existing theme classes
        root.classList.remove("light", "dark");

        if (theme === "system") {
            // Determine the system theme
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

            // Add the system theme class to the document root
            root.classList.add(systemTheme);
            return;
        }

        // Add the selected theme class to the document root
        root.classList.add(theme);
    }, [theme]);

    // Context value to be provided to consumers
    const value = {
        theme,
        setTheme: (newTheme) => {
            // Store the theme in localStorage and update the state
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
    };

    return (
        // Provide the context value to children components
        <ThemeProviderContext.Provider value={value} {...props}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

// Hook to access the theme context
export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
