import { ThemeOptions } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
  },
  typography: {},
});

export default function getDefaultTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {},
  };
}
