import { Box, Button, Paper, TextField, Typography } from "@mui/material";

const Contact = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19495.138125727393!2d106.71168150000003!3d10.821202999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1svi!2s!4v1692209632094!5m2!1svi!2s"
        width="100%"
        height="450"
        loading="lazy"
        title="map info"
      ></iframe>

      {/* form */}
      <Paper
        elevation={9}
        sx={{
          width: { sm: 600, xs: "100%" },
          m: "0 auto",
          p: 3,
          my: 5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography align="center" fontWeight={600} fontSize={25} p={2}>
          Gửi mail đến chúng tôi
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          gap={2}
        >
          <TextField label="Tên" name="name" fullWidth />
          <TextField label="Email" name="email" fullWidth />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          gap={2}
        >
          <TextField label="Địa chỉ" name="name" fullWidth />
          <TextField label="Số điện thoại" name="email" fullWidth />
        </Box>
        <TextField label="Chủ đề" fullWidth name="email" />
        <TextField label="Nội dung" fullWidth multiline={true} name="email" />

        <Button fullWidth variant="outlined" color="success" size="large">
          Gửi
        </Button>
      </Paper>
    </div>
  );
};

export default Contact;
