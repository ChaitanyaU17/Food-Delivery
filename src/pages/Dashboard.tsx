import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { Restaurant, Favorite, ShoppingBag, CurrencyRupee} from "@mui/icons-material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { selectTotalSpent } from "../store/orderSlice";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  onClick?: () => void;
}

const StatCard = ({ icon, label, value, color, onClick }: StatCardProps) => (
  <Card onClick={onClick} sx={{cursor: onClick ? "pointer" : "default", transition: "transform 0.2s", "&:hover": onClick ? { transform: "translateY(-4px)" } : {}}}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{bgcolor: `${color}20`, color, borderRadius: 2, p: 1.5, display: "flex"}}>{icon}</Box>
        <Box>
          <Typography variant="h4" sx={{fontWeight: 700}}>{value}</Typography>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const totalRestaurants = useAppSelector(
    (state) => state.restaurants.items.length
  );
  const favoritesCount = useAppSelector(
    (state) => state.favorites.restaurantIds.length
  );
  const ordersCount = useAppSelector((state) => state.orders.orders.length);
  const totalSpent = useAppSelector(selectTotalSpent);

  const stats = useMemo(
    () => [
      {
        icon: <Restaurant />,
        label: "Total Restaurants",
        value: totalRestaurants,
        color: "#E23744",
        path: "/restaurants",
      },
      {
        icon: <Favorite />,
        label: "Favorite Restaurants",
        value: favoritesCount,
        color: "#e91e63",
        path: "/favorites",
      },
      {
        icon: <ShoppingBag />,
        label: "Total Orders",
        value: ordersCount,
        color: "#FC8019",
        path: "/my-orders",
      },
      {
        icon: <CurrencyRupee />,
        label: "Total Spent",
        value: `₹${totalSpent.toLocaleString()}`,
        color: "#4caf50",
        path: "/my-orders",
      },
    ],
    [totalRestaurants, favoritesCount, ordersCount, totalSpent]
  );

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{fontWeight: 700}}>
          Welcome back {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          What would you like to eat today?
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard {...stat} onClick={() => navigate(stat.path)} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{fontWeight: 700, mb: 2}}>Quick Actions</Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Restaurant />}
          onClick={() => navigate("/restaurants")}
          sx={{ py: 1.5, px: 3 }}
        >
          Order Food
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<ShoppingBag />}
          onClick={() => navigate("/my-orders")}
          sx={{ py: 1.5, px: 3 }}
        >
          My Orders
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;