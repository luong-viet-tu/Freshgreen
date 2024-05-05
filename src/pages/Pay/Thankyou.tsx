import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Box, Typography } from "@mui/material";
import PaymentStatus from "../../utils/stripe/payment-status";

const nodeEnv: string =
  "pk_test_51NFrKrEup2wfutAaLVem6eRVtamjYxuUJwOy6F9ewZ7BtakNcARqqzcV9nZa6hbuQNj73JWxf1CywUOaaie5lbrO005zUQAI7K";

const stripePromise = loadStripe(nodeEnv);

const Thankyou = () => {
  return (
    <Elements stripe={stripePromise}>
      <Box>
        <Typography fontWeight={600} fontSize={30} align="center" mt={10}>
          <PaymentStatus />
        </Typography>
      </Box>
    </Elements>
  );
};

export default Thankyou;
