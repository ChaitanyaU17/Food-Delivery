import { createTheme, type Theme } from "@mui/material/styles";
const BRAND_RED = "#E23744";
const BRAND_DARK_RED = "#cb202d";

export const getTheme = (mode: "light" | "dark"): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: BRAND_RED,
        dark: BRAND_DARK_RED,
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#FC8019",
      },
      background: {
        default: mode === "light" ? "#f8f8f8" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
      success: { main: "#60b246" }, 
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow:
              mode === "light"
                ? "0 2px 12px rgba(0,0,0,0.08)"
                : "0 2px 12px rgba(0,0,0,0.4)",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
    },
  });