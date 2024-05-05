import { Box, LinearProgress, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { NewsType } from "../../types/newsType";
import { useEffect, useState } from "react";
import { newsApi } from "../../utils/api/newsApi";

const NewsDetails = () => {
  const { pathname } = useLocation();
  const [news, setNews] = useState<null | NewsType>(null);

  const fetchNews = async () => {
    try {
      const res = await newsApi.get(pathname.split("/")[2]);
      setNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNews();
  }, [pathname]);

  return !news ? (
    <LinearProgress color="success" />
  ) : (
    <Box>
      <Typography
        textAlign={"center"}
        fontWeight={600}
        fontSize={30}
        pb={3}
        textTransform={"capitalize"}
      >
        {news.title}
      </Typography>

      <div dangerouslySetInnerHTML={{ __html: news.content }} />
    </Box>
  );
};

export default NewsDetails;
