import { createRef, useRef, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { NotificationToast } from "../../../utils/handlers/NotificationToast";
import { LoadingButton } from "@mui/lab";

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

interface Props {
  open: boolean;
  loading: boolean;
  setOpen: (open: boolean) => void;
  onVerify: (arg: number) => void;
}

const VerifyPhoneModal = (props: Props) => {
  const { open, setOpen, onVerify, loading } = props;

  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);
  const textFieldsRef = useRef(Array.from({ length: 6 }, () => createRef()));

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let { value } = event.target;

      value = value.replace(/[^0-9]/g, "");

      setInputValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = value;
        return newValues;
      });

      if (index < textFieldsRef.current.length - 1 && value.length === 1) {
        const nextTextField = textFieldsRef.current[index + 1].current;
        if (nextTextField) {
          (nextTextField as HTMLInputElement).focus();
        }
      }
    };

  const handleClose = () => setOpen(false);

  const handleVerify = () => {
    const inNull = inputValues.includes("");
    if (inNull)
      return NotificationToast({ message: "Mã không hợp lệ", type: "error" });
    onVerify(+inputValues.join(""));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant="h6" component="h2">
            Nhập mã OTP
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 1, my: 3 }}>
            {inputValues.map((value, index) => (
              <TextField
                key={index}
                inputProps={{ maxLength: 1 }}
                value={value}
                onChange={handleChange(index)}
                inputRef={textFieldsRef.current[index]}
                sx={{ textAlign: "center", fontSize: 22, fontWeight: 600 }}
              />
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              color="warning"
              type="submit"
              onClick={() => setOpen(false)}
              fullWidth
            >
              Huỷ
            </Button>

            <LoadingButton
              fullWidth
              variant="outlined"
              color="success"
              type="submit"
              onClick={handleVerify}
              loading={loading}
            >
              Xác nhận
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default VerifyPhoneModal;
