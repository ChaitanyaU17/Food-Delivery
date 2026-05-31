import { Card, CardContent, Skeleton, Box } from "@mui/material";

const SkeletonCard = () => (
  <Card>
    <Skeleton variant="rectangular" height={180} />
    <CardContent>
      <Skeleton variant="text" width="70%" height={28} />
      <Skeleton variant="text" width="50%" height={20} />
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Skeleton variant="rounded" width={60} height={24} />
        <Skeleton variant="rounded" width={60} height={24} />
      </Box>
    </CardContent>
  </Card>
);

export default SkeletonCard;