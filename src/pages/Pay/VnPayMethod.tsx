import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import { payApi } from "../../utils/api/payApi";
import { useAppSelector } from "../../redux/hooks";
import { setItem } from "../../utils/handlers/tokenHandler";

const VnPayMethod = () => {
  const [bankList, setBankList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bankCode, setBankCode] = useState("");

  const { data } = useAppSelector((state) => state.pay.modal);

  useEffect(() => {
    const getBank = async () => {
      const res = await axios.get("https://api.vietqr.io/v2/banks");
      res.data && setBankList(res.data.data);
      setIsLoading(false);
    };
    getBank();
  }, []);

  const handlePay = async () => {
    try {
      const response = await payApi.vnpayMethod({
        amount: data.payData.amount,
        bankCode,
      });
      setItem("order", data.order);
      window.location.replace(response.data.vnpUrl);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = () => {};
  return isLoading ? (
    <LinearProgress color="success" />
  ) : (
    <Paper sx={{ p: 5 }}>
      <Typography align="center" fontWeight={600}>
        Phương thức thanh toán VNPAY
      </Typography>
      <FormControl fullWidth sx={{ my: 5 }}>
        <InputLabel id="demo-simple-select-label">Chọn ngân hàng</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={bankCode}
          label="Chọn ngân hàng"
          onChange={handleChange}
        >
          {bankList.map((data: any) => (
            <MenuItem
              value={data.code}
              key={data.id}
              onClick={() => setBankCode(data.code)}
            >
              {data.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LoadingButton
        fullWidth
        variant="outlined"
        color="success"
        onClick={handlePay}
      >
        Thanh toán ngay
      </LoadingButton>
    </Paper>
  );
};

export default VnPayMethod;
