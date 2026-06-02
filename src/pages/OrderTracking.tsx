import {Box, Typography, Paper, Stepper, Step, StepLabel, StepContent, Chip, Divider, Avatar, Button, LinearProgress} from "@mui/material";
import { CheckCircle, Restaurant, TwoWheeler, DoneAll, ListAlt} from "@mui/icons-material";
import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import { updateOrderStatus, ORDER_STATUSES } from "../store/orderSlice";

const STATUS_ICONS: Record<string, React.ReactNode> = {
  "Order Placed": <CheckCircle />,
  "Preparing Food": <Restaurant />,
  "Food Ready": <CheckCircle />,
  "Out For Delivery": <TwoWheeler />,
  Delivered: <DoneAll />,
};

const STATUS_COLORS: Record<string, string> = {
  "Order Placed": "#FC8019",
  "Preparing Food": "#FFC107",
  "Food Ready": "#8BC34A",
  "Out For Delivery": "#2196F3",
  Delivered: "#4CAF50",
};

const OrderTracking = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const order = useAppSelector((state) =>
    state.orders.orders.find((o) => o.id === id)
  );

  const currentStatusIndex = useMemo(
    () => ORDER_STATUSES.indexOf(order?.status ?? "Order Placed"),
    [order?.status]
  );

  useEffect(() => {
    if (!order || order.status === "Delivered") return;

    const interval = setInterval(() => {
      dispatch(updateOrderStatus(order.id));
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [dispatch, order]);

  if (!order) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5">Order not found</Typography>
        <Button onClick={() => navigate("/my-orders")} sx={{ mt: 2 }}>
          View Orders
        </Button>
      </Box>
    );
  }

  const isDelivered = order.status === "Delivered";
  const progressValue = ((currentStatusIndex + 1) / ORDER_STATUSES.length) * 100;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto" }}>
      <Typography variant="h4" sx={{fontWeight:700, mb: 1}} >
        Order Tracking
      </Typography>
      <Typography color="text.secondary" sx={{mb: 3}}>
        Order #{order.orderNumber}
      </Typography>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, bgcolor: isDelivered ? "success.light" : "primary.light", color: isDelivered ? "success.contrastText" : "primary.contrastText"}}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          {STATUS_ICONS[order.status]}
          <Typography variant="h5" sx={{fontWeight:700}}>
            {order.status}
          </Typography>
        </Box>
        {!isDelivered && (
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{borderRadius: 2, bgcolor: "rgba(255,255,255,0.3)", "& .MuiLinearProgress-bar": { bgcolor: "white" }}}/>
        )}
        {!isDelivered && (
          <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
            Auto-updating every 10 seconds...
          </Typography>
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{fontWeight:700, mb: 2}} >
          Order Progress
        </Typography>
        <Stepper activeStep={currentStatusIndex} orientation="vertical">
          {ORDER_STATUSES.map((status, index) => (
            <Step key={status} completed={index <= currentStatusIndex}>
                <StepLabel
                slotProps={{
                    stepIcon: {
                    style: { color: index <= currentStatusIndex ? STATUS_COLORS[status] : undefined}},
                }}
                >
                <Typography sx={{fontWeight: index === currentStatusIndex ? 700 : 400, color: index === currentStatusIndex ? "primary.main" : "text.secondary"}}>
                  {status}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary">
                  {index < currentStatusIndex ? "Completed ✓" : "In progress..."}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{fontWeight:700, mb: 2}} >
          Items Ordered
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {order.items.map((item) => (
            <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 2 }} >
              <Avatar src={item.image} alt={item.name} variant="rounded" />
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{fontWeight:700}}>
            Total Paid
          </Typography>
          <Typography variant="h6" sx={{fontWeight:700}} color="primary">
            ₹{order.amount}
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{fontWeight:700, mb: 1}} >
          Delivery Address
        </Typography>
        <Typography sx={{fontWeight:600}}>{order.deliveryAddress.name}</Typography>
        <Typography color="text.secondary">
          {order.deliveryAddress.address}, {order.deliveryAddress.city} -{" "}
          {order.deliveryAddress.pincode}
        </Typography>
        <Typography color="text.secondary">
          {order.deliveryAddress.phone}
        </Typography>
        <Chip label={order.paymentMethod} size="small" sx={{ mt: 1 }} />
      </Paper>

      <Button
        startIcon={<ListAlt />}
        onClick={() => navigate("/my-orders")}
        variant="outlined"
        fullWidth
      >
        View All Orders
      </Button>
    </Box>
  );
};

export default OrderTracking;