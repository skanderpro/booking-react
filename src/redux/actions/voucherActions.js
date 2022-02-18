import axios from "axios";
import Cookies from "universal-cookie";

import { ADD_PROMOCODE } from "./actionTypes";
import { CLEAR_PROMOCODE } from "./actionTypes";

const cookies = new Cookies();

export function fetchVouchers() {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.get(`${mainUrl}/api/products/search`, {
      params: {
        limit: 20,
        page: 1,
        type: "voucher",
      },
    });
    return response;
  };
}

export function confirmVoucher(code) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");

    let response = await axios.post(
      `${mainUrl}/api/voucher/confirm`,
      {
        code,
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

export function addPromocode(promocode) {
  return {
    type: ADD_PROMOCODE,
    data: {
      promocode,
    },
  };
}

export function clearPromocodes() {
  return {
    type: CLEAR_PROMOCODE,
  };
}
