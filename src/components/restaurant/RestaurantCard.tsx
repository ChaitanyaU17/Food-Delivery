import { Card, CardMedia, CardContent, Typography, Box, Chip, IconButton, Rating} from "@mui/material";
import { Favorite, FavoriteBorder, AccessTime } from "@mui/icons-material";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Restaurant } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { toggleFavorite } from "../../store/favoriteSlice";

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard = memo(({ restaurant }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFavorite = useAppSelector((state) =>
    state.favorites.restaurantIds.includes(restaurant.id)
  );

  const handleFavoriteToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(toggleFavorite(restaurant.id));
    },
    [dispatch, restaurant.id]
  );

  return (
    <Card
      sx={{cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", "&:hover": { transform: "translateY(-4px)", boxShadow: 6 }, height: "100%", display: "flex", flexDirection: "column"}}
      onClick={() => navigate(`/restaurants/${restaurant.id}`)}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height={180}
          image={restaurant.image}
          alt={restaurant.name}
          sx={{ objectFit: "cover" }}
        />
        <IconButton
          sx={{position: "absolute", top: 8, right: 8, bgcolor: "rgba(255,255,255,0.9)", "&:hover": { bgcolor: "white" }}}
          size="small"
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? (
            <Favorite sx={{ color: "primary.main" }} fontSize="small" />
          ) : (
            <FavoriteBorder fontSize="small" />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{fontWeight: 700}} noWrap>
          {restaurant.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
          {restaurant.location}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Rating value={restaurant.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" sx={{fontWeight: 600}} color="primary">
            {restaurant.rating}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, ml: "auto" }}>
            <AccessTime fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {restaurant.deliveryTime} min
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {restaurant.cuisines.slice(0, 2).map((cuisine) => (
            <Chip key={cuisine} label={cuisine} size="small" variant="outlined" />
          ))}
          {restaurant.cuisines.length > 2 && (
            <Chip label={`+${restaurant.cuisines.length - 2}`} size="small" color="primary" variant="outlined" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

RestaurantCard.displayName = "RestaurantCard";

export default RestaurantCard;