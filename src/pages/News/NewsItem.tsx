import { memo } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import { NewsType } from "../../types/newsType";
import { formatDateInput } from "../../utils/handlers/formatDateInput";
import { useAppDispatch } from "../../redux/hooks";
import { newsActions } from "../../actions/newsActions";

const NewsItem = memo(({ news }: { news: NewsType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = { news } as NavigateOptions;

  const constent =
    news.content.length > 300
      ? news.content.slice(0, 300) + "..."
      : news.content;

  const handleViewNews = () => {
    navigate(`/tin-tuc/${news.title}`, { state });
    dispatch(newsActions.updateViewCount(news._id as string));
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        height: { sm: 400, xs: 600 },
        display: "flex",
        flexDirection: { sm: "row", xs: "column" },
        borderRadius: 1,
        overflow: "hidden",
        gap: 3,
      }}
    >
      <img
        src={news.thumbnail}
        alt={news.title}
        style={{
          width: window.innerWidth < 600 ? "100%" : "40%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Box p={{ sm: 5, xs: 2 }}>
        <Typography fontWeight={600} fontSize={{ sm: 32, xs: 20 }}>
          {news.title}
        </Typography>

        <div dangerouslySetInnerHTML={{ __html: constent }} />

        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={{ sm: "nowrap", xs: "wrap" }}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            gap={{ sm: 5, xs: 2 }}
          >
            <Typography fontSize={{ sm: 20, xs: 18 }}>
              {formatDateInput(news.createdAt)}
            </Typography>
            <Typography fontSize={{ sm: 25, xs: 20 }} fontWeight={600}>
              {news.viewCount} lượt xem
            </Typography>
          </Box>

          <Button color="success" onClick={handleViewNews}>
            Đọc thêm <ArrowRightAltIcon />
          </Button>
        </Box>
      </Box>
    </Paper>
  );
});

export default NewsItem;
