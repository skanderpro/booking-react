import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function createPayment(data) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let response = await axios.post(
      `${mainUrl}/api/transactions`,
      {
        ...data,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  };
}

export function setPaymentToOrder(data) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let response = await axios.post(
      `${mainUrl}/api/orders/set-payment`,
      {
        ...data,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  };
}

export function createCustomer() {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let response = await axios.post(
      `${mainUrl}/api/stripe/customer`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };
}

export function createPaymentIntent(data) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let response = await axios.post(
      `${mainUrl}/api/stripe/payment-intent`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };
}
