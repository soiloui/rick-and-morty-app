import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import { useThemeContext } from "./ThemeProvider";

const ToggleColorMode = () => {
  const { themeMode, toggleThemeMode } = useThemeContext();

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Button
        variant="text"
        onClick={toggleThemeMode}
        size="small"
        aria-label="button to toggle theme mode"
        sx={{
          width: "100%",
          height: "100%",
          p: "4px",
          background: themeMode === "dark" ? "#333" : "#ddd",
        }}
      >
        {themeMode === "dark" ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" />
        )}
      </Button>
    </Box>
  );
};

export default ToggleColorMode;
