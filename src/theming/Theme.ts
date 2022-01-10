import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1e88e5",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#fb8c00",
        },
        success: {
            main: "#71be44",
        },
        error: {
            main: "#d50000",
        },
        warning: {
            main: "#fb8c00",
        },
        info: {
            main: '#1e88e5',
        },
    },
    components: {
        MuiGrid: {
            styleOverrides: {
                item: {
                    "&.MuiGrid-item": {
                        display: "flex",
                        padding: "0.25rem 1rem"
                    },
                    ".MuiFormControlLabel-root": {
                        flex: 1,
                        whiteSpace: "nowrap"
                    }
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    position: "relative",
                    background: "var(--blueGrey-200)"
                },
                label: {

                }
            }
        }
    }
});