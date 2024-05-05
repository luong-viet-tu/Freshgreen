import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { orderActions } from "../../actions/orderActions";
import { RootState } from "../../redux/store";
import { clearCart } from "../../redux/slices/cartSlice";
import { getItem, removeItem } from "../handlers/tokenHandler";
import { moneyFormat } from "../handlers/moneyFormat";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const [message, setMessage] = useState<any | null>(null);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const order = getItem("order");

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!order) {
      navigate("/");
      return;
    }

    const clientSecret: any = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        switch (paymentIntent.status) {
          case "succeeded":
            dispatch(
              orderActions.createOrder({ userId: user?._id as string, order })
            ).then(() => {
              dispatch(clearCart());
              removeItem("order");
              setMessage(
                `Cảm ơn bạn! Giao dịch của bạn với số tiền ${moneyFormat(
                  paymentIntent.amount
                )} đã được chấp nhận thành công.`
              );
            });
            break;

          case "processing":
            setMessage(
              "Đang xử lý thanh toán. Chúng tôi sẽ thông báo cho bạn khi thanh toán được nhận."
            );
            break;

          case "requires_payment_method":
            navigate(-1);
            setMessage(
              "Thanh toán thất bại. Vui lòng thử phương thức thanh toán khác."
            );
            break;

          default:
            navigate(-1);
            setMessage("Something went wrong.");
            removeItem("order");
            break;
        }
      });
  }, [stripe, navigate, dispatch]);

  return message;
};

export default PaymentStatus;
