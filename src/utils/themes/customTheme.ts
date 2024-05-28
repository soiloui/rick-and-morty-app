import { ThemeOptions } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: "#d32f2f",
    },
    secondary: {
      main: "#ef9a9a",
    },
    background: {
      default: "#f5f5f5",
    },
    ...(mode === "dark" && {
      primary: {
        main: "#d32f2f",
      },
      secondary: {
        main: "#ef9a9a",
      },
      background: {
        default: "#181818",
      },
    }),
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
  },
});

export default function getCustomTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            ...(mode === "light" && { background: "#fff" }),
            ...(mode === "dark" && { background: "#333" }),
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          },
        },
      },
    },
  };
}
