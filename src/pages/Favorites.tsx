import { Box, Typography, Grid, Button } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import RestaurantCard from "../components/restaurant/RestaurantCard";

const Favorites = () => {
  const navigate = useNavigate();
  const allRestaurants = useAppSelector((state) => state.restaurants.items);
  const favoriteIds = useAppSelector((state) => state.favorites.restaurantIds);

  const favoriteRestaurants = useMemo(
    () => allRestaurants.filter((r) => favoriteIds.includes(r.id)),
    [allRestaurants, favoriteIds]
  );

  if (favoriteRestaurants.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Favorite sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
        <Typography variant="h5" sx={{fontWeight:700}} gutterBottom>
          No favorites yet
        </Typography>
        <Typography color="text.secondary" sx={{mb: 3}}>
          Tap the ❤️ on any restaurant to save it here
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/restaurants")}
        >
          Browse Restaurants
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{fontWeight:700, mb: 1}}>
        Favorite Restaurants
      </Typography>
      <Typography color="text.secondary" sx={{mb: 3}} >
        {favoriteRestaurants.length} saved restaurant
        {favoriteRestaurants.length > 1 ? "s" : ""}
      </Typography>

      <Grid container spacing={3}>
        {favoriteRestaurants.map((restaurant) => (
          <Grid key={restaurant.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <RestaurantCard restaurant={restaurant} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favorites;