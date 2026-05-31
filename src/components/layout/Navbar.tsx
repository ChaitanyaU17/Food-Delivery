import {AppBar, Toolbar, IconButton, Badge, Box, Typography, Button, useMediaQuery, useTheme, Tooltip} from "@mui/material";
import {ShoppingCart, Brightness4, Brightness7, Logout, Dashboard, Restaurant, Favorite, ListAlt} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { logout } from "../../store/authSlice";
import { selectCartItemCount } from "../../store/cartSlice";
import AppLogo from "../../assets/AppLogo";

interface NavbarProps {
  themeMode: "light" | "dark";
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { label: "Dashboard", path: "/dashboard", icon: <Dashboard fontSize="small" /> },
  { label: "Restaurants", path: "/restaurants", icon: <Restaurant fontSize="small" /> },
  { label: "Favorites", path: "/favorites", icon: <Favorite fontSize="small" /> },
  { label: "Orders", path: "/my-orders", icon: <ListAlt fontSize="small" /> },
];

const Navbar = ({ themeMode, onToggleTheme }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const cartCount = useAppSelector(selectCartItemCount);
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);

  return (
    <AppBar position="sticky" elevation={0} sx={{bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider", color: "text.primary"}}>
      <Toolbar sx={{ gap: 1 }}>
        <Box sx={{ cursor: "pointer", flexShrink: 0 }} onClick={() => navigate("/dashboard")}>
          <AppLogo />
        </Box>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 0.5, ml: 3 }}>
            {NAV_LINKS.map((link) => (
              <Button
                key={link.path}
                startIcon={link.icon}
                onClick={() => navigate(link.path)}
                color={location.pathname === link.path ? "primary" : "inherit"}
                sx={{fontWeight: location.pathname === link.path ? 700 : 500}}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />
        {!isMobile && user && (
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            Hi, {user.name}
          </Typography>
        )}

        <Tooltip title="Toggle theme">
          <IconButton onClick={onToggleTheme} color="inherit">
            {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Cart">
          <IconButton onClick={() => navigate("/cart")} color="primary">
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Logout">
          <IconButton onClick={handleLogout} color="inherit">
            <Logout />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;