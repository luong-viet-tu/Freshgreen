import { Paper, Box, Button, Skeleton } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const NewsSkeleton = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "row",
        borderRadius: 1,
        overflow: "hidden",
        gap: 3,
      }}
    >
      {/* <Skeleton variant="rectangular" width="40%" height={400} /> */}
      <Box p={5} width={"100%"}>
        <Skeleton variant="text" width="80%" height={23} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="100%" height={100} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            gap={5}
          >
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={120} height={20} />
          </Box>
          <Button disabled>
            <ArrowRightAltIcon />
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default NewsSkeleton;
