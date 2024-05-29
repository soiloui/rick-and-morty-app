import CssBaseline from "@mui/material/CssBaseline";
import { Container, Typography } from "@mui/material";
import CharacterTable from "./components/CharacterTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToggleTheme from "./components/ToggleTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { CharacterProvider } from "./components/CharacterProvider";
import CharacterDetails from "./components/CharacterDetails";
import Background from "./components/Background";
import useIntroAnimation from "./utils/hooks/useIntroAnimation";

const App = () => {
  const queryClient = new QueryClient();

  useIntroAnimation();

  return (
    <>
      <ThemeProvider>
        <CssBaseline />
        <Background />
        <Container
          sx={{
            height: "100%",
            paddingY: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 5,
          }}
        >
          <header>
            <Typography color={"primary"} component="h1" variant="h2" textAlign="center">
              Rick and Morty App
            </Typography>
          </header>

          <main>
            <CharacterProvider>
              <QueryClientProvider client={queryClient}>
                <CharacterTable />
                <CharacterDetails />
              </QueryClientProvider>
            </CharacterProvider>
          </main>

          <footer>
            <ToggleTheme />
          </footer>
        </Container>
        <ToastContainer limit={5} />
      </ThemeProvider>
    </>
  );
};

export default App;
