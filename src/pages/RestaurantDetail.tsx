import { Box, Typography, Chip, Tabs, Tab, Grid, Rating, Button, Paper} from "@mui/material";
import { AccessTime, LocationOn, ArrowBack } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { menuItems } from "../data/menuItems";
import MenuItemCard from "../components/restaurant/MenuItemCard";

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);

  const restaurant = useAppSelector((state) =>
    state.restaurants.items.find((r) => r.id === id)
  );

  const { categories, groupedItems } = useMemo(() => {
    const items = menuItems.filter((m) => m.restaurantId === id);
    const cats = [...new Set(items.map((m) => m.category))];
    const grouped: Record<string, typeof items> = {};
    cats.forEach((cat) => {
      grouped[cat] = items.filter((m) => m.category === cat);
    });
    return { categories: cats, groupedItems: grouped };
  }, [id]);

  if (!restaurant) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5">Restaurant not found</Typography>
        <Button onClick={() => navigate("/restaurants")} sx={{ mt: 2 }}>Back to Restaurants</Button>
      </Box>
    );
  }

  const currentCategory = categories[activeCategory];

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={() => navigate("/restaurants")} sx={{ mb: 2 }}>Back</Button>
      <Paper sx={{ borderRadius: 3, overflow: "hidden", mb: 3, position: "relative"}}>
        <Box
          component="img"
          src={restaurant.image}
          alt={restaurant.name}
          sx={{width: "100%", height: { xs: 200, sm: 300 }, objectFit: "cover"}}
        />
        <Box sx={{position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)", p: 3, color: "white"}}>
          <Typography variant="h4" sx={{fontWeight: 700}}>
            {restaurant.name}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Rating
                value={restaurant.rating}
                precision={0.1}
                size="small"
                readOnly
                sx={{ color: "#FFD700" }}
              />
              <Typography sx={{fontWeight: 700}}>{restaurant.rating}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTime fontSize="small" />
              <Typography>{restaurant.deliveryTime} min</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOn fontSize="small" />
              <Typography>{restaurant.location}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
            {restaurant.cuisines.map((c) => (
              <Chip key={c} label={c} size="small" sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}/>
            ))}
          </Box>
        </Box>
      </Paper>

      <Typography variant="h5" sx={{fontWeight: 700, mb: 2}} >Menu</Typography>

      <Tabs
        value={activeCategory}
        onChange={(_, v) => setActiveCategory(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, bgcolor: "background.paper", borderRadius: 2, px: 1 }}
      >
        {categories.map((cat) => (
          <Tab key={cat} label={cat} />
        ))}
      </Tabs>

      <Grid container spacing={2}>
        {(groupedItems[currentCategory] ?? []).map((item) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <MenuItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RestaurantDetail;