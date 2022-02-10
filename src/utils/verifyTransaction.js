import axios from "axios";
import config from "../config";

export const verifyTransaction = async (transactionId) => {
  const { data } = await axios.get(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.flutterwave.FLUTTERWAVE_SECRET_KEY}`,
    },
  });
  return data;
};
