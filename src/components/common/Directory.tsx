import { NavLink, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { navbarDataItem } from "./Navbar/components/Data/NavbarDataItem";

import { mainColor } from "../../constants/colors";
import { NavbarDataType } from "../../types/dataTypes";

const Directory = () => {
  const { pathname } = useLocation();
  const { params } = useParams();

  const [paths, setPaths] = useState<NavbarDataType[]>([]);
  useEffect(() => {
    const matchingItems = navbarDataItem.filter((item) =>
      pathname.includes(item.path)
    );
    setPaths(matchingItems);
  }, [pathname]);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ pb: 1 }}
    >
      {paths.map((path, index) => (
        <Typography
          component={NavLink}
          to={path.path}
          sx={{ textDecoration: "none" }}
          key={index}
          fontWeight={path.path === "/" || pathname ? 600 : 300}
          color={path.path === "/" ? mainColor : "#333"}
        >
          {path.item}
        </Typography>
      ))}
      {params && (
        <Typography
          component={NavLink}
          to={params ?? ""}
          sx={{ textDecoration: "none" }}
        >
          {params}
        </Typography>
      )}
    </Breadcrumbs>
  );
};

export default Directory;
