import axios from "axios";
import Cookies from "universal-cookie";

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
