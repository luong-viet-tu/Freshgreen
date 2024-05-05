import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

import { ProductType } from "../types/productType";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { removeProductCompare } from "../redux/slices/compareSlice";
import { moneyFormat } from "../utils/handlers/moneyFormat";
import { setItem } from "../utils/handlers/tokenHandler";

const Compare = () => {
  const headers = [
    "Product",
    "Price",
    "Star Count",
    "Sold",
    "Category",
    "View",
    "Remove",
  ];
  const products = useAppSelector((state: RootState) => state.compare.products);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleView = (product: ProductType) => {
    navigate(`/san-pham/details/` + product.title, {
      state: { productId: product._id as string },
    });
    setItem("productId", product._id);
  };

  const handleDelete = (id: string) => {
    dispatch(removeProductCompare(id));
  };

  return !products.length ? (
    <Typography fontWeight={600} fontSize={23} align="center">
      Chưa có sản phẩm so sánh
    </Typography>
  ) : (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 10,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: 3,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: (theme) => theme.palette.success.main,
                  color: (theme) => theme.palette.common.white,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontSize: { xs: 12 } }}>
                  {header}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product._id}
              sx={{
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
              }}
            >
              <TableCell>{product.title}</TableCell>
              <TableCell>{moneyFormat(product.price)}</TableCell>
              <TableCell>{product.comments.length}</TableCell>
              <TableCell>{product.sold}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleView(product)}>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(product._id as string)}
                >
                  <HighlightOffIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Compare;
