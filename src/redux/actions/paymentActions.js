import axios from "axios";
import Cookies from "universal-cookie";

let cookies = new Cookies();

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
    cookies = new Cookies();
    console.log('token 1', cookies.get("token"))
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
  console.log('token 1', cookies.get("token"))
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
    console.log('token 2', cookies.get("token"))
    return response;
  };
}

export function createPaypalOrder(order_id) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let response = await axios.post(
      `${mainUrl}/api/paypal`,
      {
        order_id,
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

export function approvalPaypal(order_id, token) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let authToken = cookies.get("token");
    let response = await axios.post(
      `${mainUrl}/api/paypal/approval`,
      { order_id, token },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response;
  };
}
