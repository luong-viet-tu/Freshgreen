import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeError, loadStripe } from "@stripe/stripe-js";
import { LoadingButton } from "@mui/lab";
import { LinearProgress } from "@mui/material";
import { ChangeEvent, useState } from "react";

import { PayDataProps } from "../../../types/payType";
import { OrderItemType } from "../../../types/orderType";
import { setItem } from "../../../utils/handlers/tokenHandler";
import { hostClient } from "../../../utils/api/axiosClient";

const stripePromise = loadStripe(
  "pk_test_51NFrKrEup2wfutAaLVem6eRVtamjYxuUJwOy6F9ewZ7BtakNcARqqzcV9nZa6hbuQNj73JWxf1CywUOaaie5lbrO005zUQAI7K"
);

interface Props {
  state: {
    payData: PayDataProps;
    order: OrderItemType;
  };
  secretClient: {
    id: string;
    client_secret: string;
  };
}

const FormPay = (props: Props) => {
  const { payData, order } = props.state;
  const [isProcessingPayment, setIsProcessingPayment] =
    useState<boolean>(false);

  const elements = useElements();
  const stripe = useStripe();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessingPayment(true);

    try {
      setItem("order", order);
      const { error }: { error: StripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${hostClient}/thankyou`,
          payment_method_data: {
            billing_details: {
              name: payData.nameOfUser,
              phone: payData.phone,
              email: payData.email,
              address: {
                line1: payData.address,
              },
            },
          },
        },
      });

      if (error) {
        console.log("Error during payment:", error.message);
        return;
      }
    } catch (error) {
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        size="large"
        disabled={!stripe}
        type="submit"
        loading={isProcessingPayment}
      >
        Thanh toán
      </LoadingButton>
    </form>
  );
};

const FormPayment = (props: Props) => {
  const options = {
    clientSecret: props.secretClient.client_secret,
  };

  return !props.secretClient.client_secret ? (
    <LinearProgress />
  ) : (
    <Elements stripe={stripePromise} options={options}>
      <FormPay {...props} />
    </Elements>
  );
};

export default FormPayment;
