import { ChangeEvent, memo } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { mainColor } from "../../constants/colors";

const SearchStyled = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  outline: "1px solid #ddd",
  "&:hover": {
    outline: `2px solid ${mainColor}`,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  paddingRight: 10,
  width: "100%",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "15rem",
      "&:focus": {
        // width: "20ch",
      },
    },
  },
}));
interface SearchProps {
  placeholder: string;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

const Search = memo(
  ({ placeholder, searchQuery, setSearchQuery }: SearchProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    };

    return (
      <Box sx={{ minWidth: "20%" }}>
        <SearchStyled>
          <SearchIconWrapper>
            <SearchIcon color={"success"} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={placeholder}
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
            value={searchQuery}
          />
          {searchQuery !== "" && (
            <CancelIcon onClick={() => setSearchQuery("")} color="warning" />
          )}
        </SearchStyled>
      </Box>
    );
  }
);

export default Search;
