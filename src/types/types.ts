export interface User {
    id: string;
    name: string;
    email: string;
    isLoggedIn: boolean;
}

export interface Restaurant {
    id: string;
    name: string;
    image: string;
    rating: number;
    deliveryTime: number;
    cuisines: string[];
    location: string;
}

export interface MenuItem {
    id: string;
    restaurantId: string;
    name: string;
    image: string;
    price: number;
    category: string;
    isVeg: boolean;
}

export interface CartItem extends MenuItem {
    quantity: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    items: CartItem[];
    amount: number;
    status: OrderStatus;
    orderedAt: string;
    deliveryAddress: DeliveryAddress;
    paymentMethod: PaymentMethod;
}

export type OrderStatus = "Order Placed" | "Preparing Food" | "Food Ready" | "Out For Delivery" | "Delivered";

export type PaymentMethod = "UPI" | "Card" | "Cash On Delivery";

export interface DeliveryAddress {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
}

export interface ThemeState {
    mode: "light" | "dark";
}

export interface FilterState {
    search: string;
    rating: number | null;
    sortBy: "rating" | "deliveryTime" | "name" | null;
}