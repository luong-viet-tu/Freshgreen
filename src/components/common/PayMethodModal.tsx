import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPayMethod } from "../../redux/slices/paySlice";
import { RootState } from "../../redux/store";

import { MomoLogo, VNpayLogo, VisaLogo } from "../../constants/images";
import { PayMethodOptionItem } from "../../types/payType";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const payMethodOptions: Array<PayMethodOptionItem> = [
  {
    name: "VNPAY",
    image: VNpayLogo,
    path: "/gio-hang/payment/vnpay",
    value: "VNPAY",
  },
  {
    name: "Bằng thẻ VISA",
    image: VisaLogo,
    path: "/gio-hang/payment/visa",
    value: "VISA",
  },
  {
    name: "Bằng MoMo",
    image: MomoLogo,
    path: "/gio-hang/payment/momo",
    value: "MOMO",
  },
];

const PayMethodModal = () => {
  const { open, data } = useAppSelector((state: RootState) => state.pay.modal);
  const [selected, setSelected] = useState<any>("/gio-hang/payment/vnpay");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(setPayMethod({ data: {}, open: false }));
  };

  const handlePay = async () => {
    navigate(selected, {
      state: { ...data },
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormControl fullWidth>
          <FormLabel id="demo-radio-buttons-group-label">
            Chọn phương thức thanh toán
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="VNPAY"
            name="radio-buttons-group"
          >
            {payMethodOptions.map((data, index) => (
              <Box sx={{ display: "flex" }}>
                <FormControlLabel
                  key={index}
                  value={data.value}
                  control={<Radio color="success" />}
                  label={data.name}
                  onClick={() => setSelected(data.path)}
                />
                <img
                  alt={data.name}
                  src={data.image}
                  style={{ width: "auto", height: 40, objectFit: "cover" }}
                />
              </Box>
            ))}
          </RadioGroup>
        </FormControl>
        <LoadingButton
          fullWidth
          variant="contained"
          sx={{ mt: 5 }}
          color={"success"}
          onClick={handlePay}
        >
          Thanh toán
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default PayMethodModal;
