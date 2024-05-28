import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useThemeContext } from "./ThemeProvider";

const ToggleTheme = () => {
  const { showCustomTheme, toggleCustomTheme } = useThemeContext();
  return (
    <ToggleButtonGroup
      color="primary"
      exclusive
      value={showCustomTheme}
      onChange={toggleCustomTheme}
      sx={{
        backgroundColor: "background.default",
        "& .Mui-selected": {
          pointerEvents: "none",
        },
        display: { xs: "flex", md: "inline-flex" },
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <ToggleButton value>
        <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
        Custom theme
      </ToggleButton>
      <ToggleButton value={false}>Default theme</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleTheme;
