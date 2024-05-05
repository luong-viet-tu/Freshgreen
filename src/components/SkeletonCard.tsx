import { Box, Paper, Skeleton } from "@mui/material";

const SkeletonCard = ({ width = 350 }: { width: number }) => (
  <Paper
    variant="outlined"
    sx={{
      // borderRadius: 5,
      width,
    }}
  >
    <Skeleton variant="rectangular" height={400} />
    <Box p={2}>
      <Skeleton variant="text" height={20} width="70%" />
      <Skeleton variant="text" height={20} width="90%" />
      <Skeleton variant="text" height={15} width="60%" />
      <Skeleton variant="text" height={15} width="50%" />
      <Skeleton variant="text" height={15} width="70%" />
    </Box>
  </Paper>
);

export default SkeletonCard;
