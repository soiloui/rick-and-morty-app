import Box from "@mui/material/Box";
import ToggleColorMode from "./ToggleThemeMode";
import ToggleThemeVariant from "./ToggleThemeVariant";

const ToggleTheme = () => {
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gridTemplateColumns: "auto auto",
        gap: 1,
        width: "100%",
        left: 0,
        bottom: 24,
      }}
    >
      <ToggleColorMode />
      <ToggleThemeVariant />
    </Box>
  );
};

export default ToggleTheme;
