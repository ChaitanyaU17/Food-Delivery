import { Box, CircularProgress } from "@mui/material";

const PageLoader = () => (
  <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh"}}>
    <CircularProgress color="primary" size={48} />
  </Box>
);

export default PageLoader;