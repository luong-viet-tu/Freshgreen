import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

import { FaqDataItem } from "../../../redux/slices/faqSlice";
import { Box, Typography } from "@mui/material";
import { mainColor } from "../../../constants/colors";

export default function FaqItem(data: FaqDataItem) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper", pb: 5 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Typography fontWeight={600} fontSize={30} color={mainColor}>
            {data.title}
          </Typography>
        </ListSubheader>
      }
    >
      {data.cards.map((cart, i) => (
        <Box key={i}>
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary={
                <Typography fontSize={20} fontWeight={600}>
                  {cart.header}
                </Typography>
              }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={cart.body} />
              </ListItemButton>
            </List>
          </Collapse>
        </Box>
      ))}
    </List>
  );
}
