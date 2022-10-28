import axios from "axios";
import Cookies from "universal-cookie";
import {setToken} from "./userActions";

const cookies = new Cookies();

export function createOrder(data) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let promocode = getState().cart.promocode;
    if (promocode !== "") {
      data.code = promocode;
    }
    let response = await axios.post(
      `${mainUrl}/api/orders`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.token) {
      dispatch(setToken(response.data.token))
    }
    return response;
  };
}

export function loadOrder(order_id) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let response = await axios.get(`${mainUrl}/api/orders/${order_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };
}
