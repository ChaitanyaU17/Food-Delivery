import {Box, Stepper, Step, StepLabel, Button, Typography, TextField, Paper, Grid, RadioGroup, FormControlLabel, Radio, FormLabel, Divider, Avatar, Chip} from "@mui/material";
import { ArrowForward, ArrowBack, CheckCircle} from "@mui/icons-material";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/store";
import { placeOrder } from "../store/orderSlice";
import { clearCart, selectCartSubtotal } from "../store/cartSlice";
import type { DeliveryAddress, Order, PaymentMethod } from "../types/types";
import { useSnackbar } from "notistack";

const STEPS = ["Delivery Address", "Payment Method", "Order Summary"];
const GST_RATE = 0.05;
const DELIVERY_CHARGE = 40;
 
const addressSchema = yup.object({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number")
    .required("Phone is required"),
  address: yup.string().min(10, "Enter full address").required("Address is required"),
  city: yup.string().required("City is required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Enter valid 6-digit pincode")
    .required("Pincode is required"),
});

type AddressForm = yup.InferType<typeof addressSchema>;

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [activeStep, setActiveStep] = useState(0);
  const [savedAddress, setSavedAddress] = useState<DeliveryAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash On Delivery");

  const cartItems = useAppSelector((state) => state.cart.items);
  const subtotal = useAppSelector(selectCartSubtotal);
  const user = useAppSelector((state) => state.auth.user);

  const { grandTotal } = useMemo(() => {
    const gst = Math.round(subtotal * GST_RATE);
    const delivery = subtotal >= 500 ? 0 : DELIVERY_CHARGE;
    return { gst, delivery, grandTotal: subtotal + gst + delivery };
  }, [subtotal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({ resolver: yupResolver(addressSchema) });

  const handleAddressSubmit = (data: AddressForm) => {
    setSavedAddress(data);
    setActiveStep(1);
  };

  const handlePlaceOrder = () => {
    if (!savedAddress || !user) return;

    const orderId = `ord_${Date.now()}`;
    const orderNumber = `FD${Math.floor(100000 + Math.random() * 900000)}`;

    const order: Order = {
      id: orderId,
      orderNumber,
      items: cartItems,
      amount: grandTotal,
      status: "Order Placed",
      orderedAt: new Date().toISOString(),
      deliveryAddress: savedAddress,
      paymentMethod,
    };

    dispatch(placeOrder(order));
    dispatch(clearCart());
    enqueueSnackbar("Order placed successfully!", { variant: "success" });
    navigate(`/orders/${orderId}`);
  };

  if (cartItems.length === 0 && activeStep < 2) {
    navigate("/cart");
    return null;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" sx={{fontWeight:700, mb: 3}}>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{fontWeight:700, mb: 3}} >
            Delivery Address
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleAddressSubmit)}
            noValidate
          >
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Full Name"
                  fullWidth
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  slotProps={{
                    htmlInput: {
                      maxLength: 10,
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (!/[0-9]/.test(e.key)) e.preventDefault();
                      },
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Full Address"
                  fullWidth
                  multiline
                  rows={3}
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="City"
                  fullWidth
                  {...register("city")}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Pincode"
                  fullWidth
                  {...register("pincode")}
                  error={!!errors.pincode}
                  helperText={errors.pincode?.message}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {activeStep === 1 && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{fontWeight:700, mb: 3}}>
            Payment Method
          </Typography>

          <FormLabel>Choose how to pay</FormLabel>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            sx={{ mt: 1, gap: 1 }}
          >
            {(["UPI", "Card", "Cash On Delivery"] as PaymentMethod[]).map(
              (method) => (
                <Paper
                  key={method}
                  variant="outlined"
                  sx={{p: 2, borderRadius: 2, borderColor: paymentMethod === method ? "primary.main" : "divider", borderWidth: paymentMethod === method ? 2 : 1}}>
                  <FormControlLabel
                    value={method}
                    control={<Radio color="primary" />}
                    label={
                      <Box>
                        <Typography sx={{fontWeight:600}}>{method}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {method === "UPI" && "Pay via Google Pay, PhonePe, Paytm"}
                          {method === "Card" && "Credit / Debit Card"}
                          {method === "Cash On Delivery" && "Pay when order arrives"}
                        </Typography>
                      </Box>
                    }
                    sx={{ m: 0, width: "100%" }}
                  />
                </Paper>
              )
            )}
          </RadioGroup>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button startIcon={<ArrowBack />} onClick={() => setActiveStep(0)} variant="outlined">
              Back
            </Button>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => setActiveStep(2)}
            >
              Review Order
            </Button>
          </Box>
        </Paper>
      )}

      {activeStep === 2 && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{fontWeight:700, mb: 3}}>
            Order Summary
          </Typography>

          {savedAddress && (
            <Box sx={{ mb: 3, p: 2, bgcolor: "action.hover", borderRadius: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{mb: 0.5}} >
                Delivering to
              </Typography>
              <Typography sx={{fontWeight:600}}>{savedAddress.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {savedAddress.address}, {savedAddress.city} -{" "}
                {savedAddress.pincode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {savedAddress.phone}
              </Typography>
              <Chip
                label={paymentMethod}
                size="small"
                color="primary"
                sx={{ mt: 1 }}
              />
            </Box>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  src={item.image}
                  alt={item.name}
                  variant="rounded"
                  sx={{ width: 48, height: 48 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{fontWeight:500}}>{item.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    x{item.quantity}
                  </Typography>
                </Box>
                <Typography sx={{fontWeight:600}}>
                  ₹{item.price * item.quantity}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography color="text.secondary">Subtotal</Typography>
            <Typography>₹{subtotal}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography color="text.secondary">GST (5%)</Typography>
            <Typography>₹{Math.round(subtotal * 0.05)}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography color="text.secondary">Delivery</Typography>
            <Typography>{subtotal >= 500 ? "FREE" : `₹${DELIVERY_CHARGE}`}</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6" sx={{fontWeight:700}}>
              Grand Total
            </Typography>
            <Typography variant="h6" sx={{fontWeight:700}} color="primary">
              ₹{grandTotal}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => setActiveStep(1)}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<CheckCircle />}
              onClick={handlePlaceOrder}
              sx={{ flex: 1 }}
            >
              Place Order — ₹{grandTotal}
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Checkout;