import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const SkeletonLoading = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      gap={10}
    >
      <Box sx={{ width: { sm: "50%", xs: "100%" } }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={500}
          animation="wave"
        />
      </Box>
      <Box sx={{ width: { sm: "50%", xs: "100%" } }}>
        <Skeleton variant="text" width="40%" height={40} animation="wave" />
        <Skeleton variant="text" width="15%" height={30} animation="wave" />
        <br />
        <br />
        <Skeleton variant="text" width="25%" height={100} animation="wave" />
        <br />
        <br />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Skeleton variant="text" width="15%" height={90} animation="wave" />
          <Skeleton variant="text" width="35%" height={90} animation="wave" />
          <Skeleton variant="text" width="10%" height={90} animation="wave" />
          <Skeleton variant="text" width="10%" height={90} animation="wave" />
        </Box>
        <br />
        <br />
        <Skeleton variant="text" width="35%" height={20} animation="wave" />
        <Skeleton variant="text" width="35%" height={20} animation="wave" />
        <Skeleton variant="text" width="35%" height={20} animation="wave" />
        <Skeleton variant="text" width="35%" height={20} animation="wave" />
      </Box>
    </Box>
  );
};

export default SkeletonLoading;
