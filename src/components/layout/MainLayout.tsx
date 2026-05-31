import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

interface MainLayoutProps {
  themeMode: "light" | "dark";
  onToggleTheme: () => void;
}

const MainLayout = ({ themeMode, onToggleTheme }: MainLayoutProps) => (
  <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
    <Navbar themeMode={themeMode} onToggleTheme={onToggleTheme} />
    <Box component="main" sx={{ maxWidth: 1280, mx: "auto", px: { xs: 2, sm: 3 }, py: 3 }}>
      <Outlet />
    </Box>
  </Box>
);

export default MainLayout;