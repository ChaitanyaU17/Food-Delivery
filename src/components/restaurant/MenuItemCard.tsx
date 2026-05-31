import {Card, CardMedia, CardContent, Typography, Box, Button, ButtonGroup, IconButton} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { memo, useCallback } from "react";
import type { MenuItem } from "../../types/types";
import { VegIcon, NonVegIcon } from "../../assets/VegIcon";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { addToCart, incrementQuantity, decrementQuantity} from "../../store/cartSlice";
import { useSnackbar } from "notistack";

interface Props {
  item: MenuItem;
}

const MenuItemCard = memo(({ item }: Props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const cartItem = useAppSelector((state) =>
    state.cart.items.find((i) => i.id === item.id)
  );
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = useCallback(() => {
    dispatch(addToCart(item));
    enqueueSnackbar(`${item.name} added to cart!`, { variant: "success" });
  }, [dispatch, item, enqueueSnackbar]);

  const handleIncrement = useCallback(() => {
    dispatch(incrementQuantity(item.id));
  }, [dispatch, item.id]);

  const handleDecrement = useCallback(() => {
    dispatch(decrementQuantity(item.id));
  }, [dispatch, item.id]);

  return (
    <Card sx={{ display: "flex", alignItems: "stretch", height: "100%" }}>
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          {item.isVeg ? <VegIcon /> : <NonVegIcon />}
          <Typography variant="subtitle1" sx={{fontWeight: 600}}>
            {item.name}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {item.category}
        </Typography>

        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mt: "auto"}}>
          <Typography variant="h6" color="primary" sx={{fontWeight: 700}}>
            ₹{item.price}
          </Typography>

          {quantity === 0 ? (
            <Button variant="outlined" color="primary" size="small" startIcon={<Add />} onClick={handleAdd}>
              Add
            </Button>
          ) : (
            <ButtonGroup size="small" variant="contained" color="primary">
              <IconButton
                size="small"
                onClick={handleDecrement}
                sx={{ bgcolor: "primary.main", color: "white", borderRadius: 1 }}
              >
                <Remove fontSize="small" />
              </IconButton>
              <Box sx={{px: 1.5, display: "flex", alignItems: "center", bgcolor: "primary.main", color: "white"}}>
                <Typography sx={{fontWeight: 700}}>{quantity}</Typography>
              </Box>
              <IconButton
                size="small"
                onClick={handleIncrement}
                sx={{ bgcolor: "primary.main", color: "white", borderRadius: 1 }}
              >
                <Add fontSize="small" />
              </IconButton>
            </ButtonGroup>
          )}
        </Box>
      </CardContent>

      <CardMedia
        component="img"
        sx={{ width: 120, height: 120, objectFit: "cover", alignSelf: "center", mr: 1, borderRadius: 2 }}
        image={item.image}
        alt={item.name}
      />
    </Card>
  );
});

MenuItemCard.displayName = "MenuItemCard";

export default MenuItemCard;