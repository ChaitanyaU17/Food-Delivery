import {Box, Typography, Button, Divider, IconButton, Paper, Grid, Chip, Avatar} from "@mui/material";
import {Add, Remove, Delete, ShoppingCart, ArrowForward} from "@mui/icons-material";
import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import {incrementQuantity, decrementQuantity, removeFromCart, clearCart} from "../store/cartSlice";
import { VegIcon, NonVegIcon } from "../assets/VegIcon";
import { useSnackbar } from "notistack";

const GST_RATE = 0.05; // 5%
const DELIVERY_CHARGE = 40;
const FREE_DELIVERY_THRESHOLD = 500;

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const cartItems = useAppSelector((state) => state.cart.items);

  const { subtotal, gst, deliveryCharge, grandTotal } = useMemo(() => {
    const sub = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 0);
    const gstAmount = Math.round(sub * GST_RATE);
    const delivery = sub >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
    return {
      subtotal: sub,
      gst: gstAmount,
      deliveryCharge: delivery,
      grandTotal: sub + gstAmount + delivery,
    };
  }, [cartItems]);

  const handleRemove = useCallback(
    (id: string, name: string) => {
      dispatch(removeFromCart(id));
      enqueueSnackbar(`${name} removed from cart`, { variant: "info" });
    },
    [dispatch, enqueueSnackbar]
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
    enqueueSnackbar("Cart cleared", { variant: "warning" });
  }, [dispatch, enqueueSnackbar]);

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <ShoppingCart sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
        <Typography variant="h5" sx={{fontWeight:700}} gutterBottom>
          Your cart is empty
        </Typography>
        <Typography color="text.secondary" sx={{mb: 3}}>
          Add items from a restaurant to get started
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
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: "center" }}>
        <Typography variant="h4" sx={{fontWeight:700}}>
          Your Cart ({cartItems.length} items)
        </Typography>
        <Button color="error" startIcon={<Delete />} onClick={handleClearCart}>
          Clear All
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
            {cartItems.map((item, index) => (
              <Box key={item.id}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                  <Avatar src={item.image} alt={item.name} variant="rounded" sx={{ width: 72, height: 72 }}/>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {item.isVeg ? <VegIcon /> : <NonVegIcon />}
                      <Typography sx={{fontWeight:600}} noWrap>
                        {item.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.category}
                    </Typography>
                    <Typography color="primary" sx={{fontWeight:700}}>
                      ₹{item.price}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      sx={{ border: 1, borderColor: "primary.main" }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography sx={{ minWidth: 28, textAlign: "center", fontWeight:700 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      sx={{ border: 1, borderColor: "primary.main" }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>

                  <Box sx={{ textAlign: "right", minWidth: 80 }}>
                    <Typography sx={{fontWeight:700}}>
                      ₹{item.price * item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemove(item.id, item.name)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                {index < cartItems.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3, position: "sticky", top: 80 }}>
            <Typography variant="h6" sx={{fontWeight:700, mb: 2}}>
              Bill Summary
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography sx={{fontWeight:500}}>₹{subtotal}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">GST (5%)</Typography>
                <Typography sx={{fontWeight:500}}>₹{gst}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Delivery</Typography>
                {deliveryCharge === 0 ? (
                  <Chip label="FREE" size="small" color="success" />
                ) : (
                  <Typography sx={{fontWeight:500}}>₹{deliveryCharge}</Typography>
                )}
              </Box>

              {subtotal < FREE_DELIVERY_THRESHOLD && (
                <Typography variant="caption" color="primary">
                  Add ₹{FREE_DELIVERY_THRESHOLD - subtotal} more for free delivery
                </Typography>
              )}

              <Divider />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{fontWeight:700}} variant="h6">
                  Grand Total
                </Typography>
                <Typography sx={{fontWeight:700}} variant="h6" color="primary">
                  ₹{grandTotal}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate("/checkout")}
              sx={{ mt: 3 }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;