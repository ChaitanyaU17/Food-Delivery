import { Box, Typography, Paper, Chip, Button, Avatar, Divider} from "@mui/material";
import { ShoppingBag, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import type { OrderStatus } from "../types/types";

const getStatusColor = (
  status: OrderStatus
): "warning" | "info" | "success" | "primary" | "default" => {
  const map: Record<OrderStatus, any> = {
    "Order Placed": "warning",
    "Preparing Food": "info",
    "Food Ready": "primary",
    "Out For Delivery": "info",
    Delivered: "success",
  };
  return map[status] ?? "default";
};

const Orders = () => {
  const navigate = useNavigate();
  const orders = useAppSelector((state) => state.orders.orders);

  if (orders.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <ShoppingBag sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
        <Typography variant="h5" sx={{fontWeight:700}} gutterBottom>
          No orders yet
        </Typography>
        <Typography color="text.secondary" sx={{mb: 3}}>
          Your order history will appear here
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/restaurants")}
        >
          Order Now
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{fontWeight:700, mb: 3}}>
        My Orders
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {orders.map((order) => (
          <Paper key={order.id} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 1, mb: 2}}>
              <Box>
                <Typography sx={{fontWeight:700}} variant="h6">
                  #{order.orderNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(order.orderedAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={order.status}
                  color={getStatusColor(order.status)}
                  size="small"
                  variant="filled"
                />
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => navigate(`/orders/${order.id}`)}
                  variant="outlined"
                >
                  Track
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              {order.items.slice(0, 4).map((item) => (
                <Avatar
                  key={item.id}
                  src={item.image}
                  alt={item.name}
                  variant="rounded"
                  sx={{ width: 52, height: 52 }}
                />
              ))}
              {order.items.length > 4 && (
                <Avatar variant="rounded" sx={{width: 52, height: 52, bgcolor: "primary.main", fontSize: 14}}>
                  +{order.items.length - 4}
                </Avatar>
              )}
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <Typography variant="body2" color="text.secondary">
                {order.items.reduce((s, i) => s + i.quantity, 0)} items •{" "}
                {order.paymentMethod}
              </Typography>
              <Typography sx={{fontWeight:700}} color="primary">
                ₹{order.amount}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Orders;