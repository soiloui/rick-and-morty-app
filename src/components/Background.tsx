import { Box } from "@mui/material";
import { useThemeContext } from "./ThemeProvider";
import bgImg from "../assets/rick-and-morty-poster.webp";

const Background = () => {
  const { themeMode, showCustomTheme } = useThemeContext();

  if (!showCustomTheme) return <></>;

  return (
    <>
      <Box
        sx={{
          zIndex: -1,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${bgImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: themeMode === "dark" ? "brightness(0.1)" : "",
          opacity: themeMode === "light" ? 0.5 : "",
        }}
      ></Box>
    </>
  );
};

export default Background;
