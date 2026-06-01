import { type Restaurant } from "../types/types";

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Spice Garden",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop",
    rating: 4.5,
    deliveryTime: 30,
    cuisines: ["North Indian", "Mughlai"],
    location: "Koramangala, Bangalore",
  },
  {
    id: "r2",
    name: "Pizza Paradise",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop",
    rating: 4.2,
    deliveryTime: 25,
    cuisines: ["Italian", "Pizza", "Pasta"],
    location: "Indiranagar, Bangalore",
  },
  {
    id: "r3",
    name: "Burger Barn",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=250&fit=crop",
    rating: 4.0,
    deliveryTime: 20,
    cuisines: ["American", "Burgers", "Snacks"],
    location: "HSR Layout, Bangalore",
  },
  {
    id: "r4",
    name: "Sushi Sakura",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=250&fit=crop",
    rating: 4.7,
    deliveryTime: 40,
    cuisines: ["Japanese", "Sushi", "Asian"],
    location: "MG Road, Bangalore",
  },
  {
    id: "r5",
    name: "Dosa Dynasty",
    image:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=250&fit=crop",
    rating: 4.3,
    deliveryTime: 15,
    cuisines: ["South Indian", "Breakfast"],
    location: "Jayanagar, Bangalore",
  },
  {
    id: "r6",
    name: "Dragon Palace",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=250&fit=crop",
    rating: 4.1,
    deliveryTime: 35,
    cuisines: ["Chinese", "Thai", "Asian"],
    location: "Whitefield, Bangalore",
  },
  {
    id: "r7",
    name: "Tandoor Tales",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=250&fit=crop",
    rating: 4.6,
    deliveryTime: 30,
    cuisines: ["North Indian", "Tandoor", "Kebabs"],
    location: "Marathahalli, Bangalore",
  },
  {
    id: "r8",
    name: "The Waffle House",
    image:
      "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=250&fit=crop",
    rating: 4.4,
    deliveryTime: 20,
    cuisines: ["Desserts", "Waffles", "Beverages"],
    location: "BTM Layout, Bangalore",
  },
  {
    id: "r9",
    name: "Kerala Kitchen",
    image:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400&h=250&fit=crop",
    rating: 4.5,
    deliveryTime: 25,
    cuisines: ["Kerala", "South Indian", "Seafood"],
    location: "Electronic City, Bangalore",
  },
  {
    id: "r10",
    name: "Biryani Brothers",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=250&fit=crop",
    rating: 4.8,
    deliveryTime: 45,
    cuisines: ["Biryani", "Hyderabadi", "Mughlai"],
    location: "Banjara Hills, Hyderabad",
  },
  //   {
  //   id: "r11",
  //   name: "Spice Garden",
  //   image:
  //     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop",
  //   rating: 4.5,
  //   deliveryTime: 30,
  //   cuisines: ["North Indian", "Mughlai"],
  //   location: "Koramangala, Bangalore",
  // },
  // {
  //   id: "r12",
  //   name: "Pizza Paradise",
  //   image:
  //     "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop",
  //   rating: 4.2,
  //   deliveryTime: 25,
  //   cuisines: ["Italian", "Pizza", "Pasta"],
  //   location: "Indiranagar, Bangalore",
  // },
  // {
  //   id: "r13",
  //   name: "Burger Barn",
  //   image:
  //     "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=250&fit=crop",
  //   rating: 4.0,
  //   deliveryTime: 20,
  //   cuisines: ["American", "Burgers", "Snacks"],
  //   location: "HSR Layout, Bangalore",
  // },
  // {
  //   id: "r14",
  //   name: "Sushi Sakura",
  //   image:
  //     "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=250&fit=crop",
  //   rating: 4.7,
  //   deliveryTime: 40,
  //   cuisines: ["Japanese", "Sushi", "Asian"],
  //   location: "MG Road, Bangalore",
  // },
  // {
  //   id: "r15",
  //   name: "Dosa Dynasty",
  //   image:
  //     "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=250&fit=crop",
  //   rating: 4.3,
  //   deliveryTime: 15,
  //   cuisines: ["South Indian", "Breakfast"],
  //   location: "Jayanagar, Bangalore",
  // },
  // {
  //   id: "r16",
  //   name: "Dragon Palace",
  //   image:
  //     "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=250&fit=crop",
  //   rating: 4.1,
  //   deliveryTime: 35,
  //   cuisines: ["Chinese", "Thai", "Asian"],
  //   location: "Whitefield, Bangalore",
  // },
  // {
  //   id: "r17",
  //   name: "Tandoor Tales",
  //   image:
  //     "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=250&fit=crop",
  //   rating: 4.6,
  //   deliveryTime: 30,
  //   cuisines: ["North Indian", "Tandoor", "Kebabs"],
  //   location: "Marathahalli, Bangalore",
  // },
  // {
  //   id: "r18",
  //   name: "The Waffle House",
  //   image:
  //     "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=250&fit=crop",
  //   rating: 4.4,
  //   deliveryTime: 20,
  //   cuisines: ["Desserts", "Waffles", "Beverages"],
  //   location: "BTM Layout, Bangalore",
  // },
  // {
  //   id: "r19",
  //   name: "Kerala Kitchen",
  //   image:
  //     "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400&h=250&fit=crop",
  //   rating: 4.5,
  //   deliveryTime: 25,
  //   cuisines: ["Kerala", "South Indian", "Seafood"],
  //   location: "Electronic City, Bangalore",
  // },
  // {
  //   id: "r20",
  //   name: "Biryani Brothers",
  //   image:
  //     "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=250&fit=crop",
  //   rating: 4.8,
  //   deliveryTime: 45,
  //   cuisines: ["Biryani", "Hyderabadi", "Mughlai"],
  //   location: "Banjara Hills, Hyderabad",
  // },
];