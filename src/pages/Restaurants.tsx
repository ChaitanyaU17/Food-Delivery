import {Box, TextField, Select, MenuItem, FormControl, InputLabel, InputAdornment, Typography, Chip, Grid, Button} from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";
import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  selectFilteredRestaurants,
  setSearch,
  setRatingFilter,
  setSortBy,
  clearFilters,
} from "../store/restaurantSlice";
import RestaurantCard from "../components/restaurant/RestaurantCard";
import SkeletonCard from "../components/common/SkeletonCard";

const PAGE_SIZE = 8;
const RATING_OPTIONS = [3, 3.5, 4, 4.5];

const Restaurants = () => {
  const dispatch = useAppDispatch();
  const filteredRestaurants = useAppSelector(selectFilteredRestaurants);
  const filters = useAppSelector((state) => state.restaurants.filters);

  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredRestaurants.length));
        }
      },
      { threshold: 0.1 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [filteredRestaurants.length]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters]);

  const visibleRestaurants = useMemo(
    () => filteredRestaurants.slice(0, visibleCount),
    [filteredRestaurants, visibleCount]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearch(e.target.value));
    },
    [dispatch]
  );

  const handleClear = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const hasActiveFilters =
    filters.search || filters.rating !== null || filters.sortBy !== null;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{fontWeight: 700}} gutterBottom>Restaurants</Typography>
        <Typography variant="body1" color="text.secondary">
          {filteredRestaurants.length} restaurants found
        </Typography>
      </Box>

      <Box sx={{display: "flex", flexWrap: "wrap", gap: 2, mb: 3, p: 2, bgcolor: "background.paper", borderRadius: 3, boxShadow: 1}}>
        <TextField
          placeholder="Search restaurants or cuisines..."
          value={filters.search}
          onChange={handleSearch}
          size="small"
          sx={{ flex: "1 1 280px" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Min Rating</InputLabel>
            <Select<number | "">
            value={filters.rating ?? ""}
            label="Min Rating"
            onChange={(e) =>
                dispatch(setRatingFilter(e.target.value === "" ? null : Number(e.target.value)))
            }
            >
            <MenuItem value="">Any</MenuItem>
            {RATING_OPTIONS.map((r) => (
              <MenuItem key={r} value={r}>
                ⭐ {r}+
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
            <Select<"deliveryTime" | "name" | "rating" | "">
            value={filters.sortBy ?? ""}
            label="Sort By"
            onChange={(e) =>
                dispatch(setSortBy(e.target.value === "" ? null : e.target.value))
            }
            >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="deliveryTime">Delivery Time</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>

        {hasActiveFilters && (
          <Button
            startIcon={<FilterList />}
            onClick={handleClear}
            size="small"
            variant="outlined"
            color="error"
          >
            Clear
          </Button>
        )}
      </Box>

      {hasActiveFilters && (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          {filters.search && (
            <Chip label={`Search: "${filters.search}"`} onDelete={() => dispatch(setSearch(""))} size="small" />
          )}
          {filters.rating && (
            <Chip label={`Rating ≥ ${filters.rating}`} onDelete={() => dispatch(setRatingFilter(null))} size="small" />
          )}
          {filters.sortBy && (
            <Chip label={`Sort: ${filters.sortBy}`} onDelete={() => dispatch(setSortBy(null))} size="small" />
          )}
        </Box>
      )}

      <Grid container spacing={3}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <SkeletonCard />
              </Grid>
            ))
          : visibleRestaurants.map((restaurant) => (
              <Grid key={restaurant.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <RestaurantCard restaurant={restaurant} />
              </Grid>
            ))}
      </Grid>

      {!isLoading && filteredRestaurants.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No restaurants found
          </Typography>
          <Button onClick={handleClear} sx={{ mt: 2 }} variant="contained">
            Clear Filters
          </Button>
        </Box>
      )}

      <Box ref={sentinelRef} sx={{ height: 40 }} />
    </Box>
  );
};

export default Restaurants;