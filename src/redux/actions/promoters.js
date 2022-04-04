import axios from "axios";

export function getPromoter(id) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.get(mainUrl + `/api/promoters/${id}`);
    return response;
  };
}

export function getPromoters() {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.get(mainUrl + `/api/promoters`);
    return response;
  };
}
