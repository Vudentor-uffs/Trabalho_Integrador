import { createTheme } from "@mui/material/styles";

const tema = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#009da5",
            dark: "#087f86",
            light: "#d8f1f2",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#092247",
        },
        background: {
            default: "#ffffff",
            paper: "#f5f5f5",
        },
        text: {
            primary: "#111111",
            secondary: "#686868",
        },
    },
    typography: {
        fontFamily: "Arial, Helvetica, sans-serif",
        button: {
            textTransform: "none",
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
    },
});

export default tema;
