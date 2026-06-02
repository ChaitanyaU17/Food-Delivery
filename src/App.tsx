import {lazy, Suspense, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {ThemeProvider, CssBaseline} from '@mui/material';
import {SnackbarProvider} from "notistack";
import {getTheme} from "./theme/theme";
import PageLoader from "./components/common/PageLoader";
import ProtectedRoute from "./components/common/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Restaurants = lazy(() => import("./pages/Restaurants"));
const RestaurantDetail = lazy(() => import("./pages/RestaurantDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Cart = lazy(() => import("./pages/Cart"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderTracking = lazy(() => import("./pages/OrderTracking"));

function App() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const toggleTheme = () => setThemeMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{vertical: "bottom", horizontal: "right"}}
      autoHideDuration={2500}
      >
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout themeMode={themeMode} onToggleTheme={toggleTheme} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurants/:id" element={<RestaurantDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/my-orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderTracking />} />
              <Route path="/favorites" element={<Favorites />} />
              </Route>
              </Route>

              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
