import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function createOrder(data) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
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
    return response;
  };
}
