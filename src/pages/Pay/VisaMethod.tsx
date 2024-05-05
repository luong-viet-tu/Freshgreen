import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { Paper } from "@mui/material";

import { payActions } from "../../actions/payActions";
import FormPayment from "./components/FormPayment";
import { setItem } from "../../utils/handlers/tokenHandler";

export default function VisaMethod() {
  const { state } = useLocation();
  const [secretClient, setSecretClient] = useState<{
    id: string;
    client_secret: string;
  }>({ id: "", client_secret: "" });

  useEffect(() => {
    const secretClient = async () => {
      try {
        const data = await payActions.payment(state.payData.amount);
        setItem("client_secret", data.client_secret);
        setSecretClient(data);
      } catch (error) {
        return false;
      }
    };
    secretClient();
  }, [state.payData.amount]);

  return (
    <Box width={"100%"}>
      <Paper elevation={9} sx={{ p: 3, mt: 5 }}>
        <FormPayment state={state} secretClient={secretClient} />
      </Paper>
    </Box>
  );
}
