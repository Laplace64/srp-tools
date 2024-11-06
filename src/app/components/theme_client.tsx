"use client"

import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});


export default function ThemeClient({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider theme={darkTheme}>
            {children}
        </ThemeProvider>
    )
}