import axios from "axios";

export function fetchSettings() {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.get(`${mainUrl}/api/settings`);
    return response;
  };
}
