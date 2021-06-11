import axios from "axios";

export function fetchAllClasses() {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.get(mainUrl + `/api/lessons`);
    return response;
  };
}

export function fetchClass(class_id) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.get(mainUrl + `/api/products/${class_id}`);
    return response;
  };
}
export function searchClasses(
  level,
  search = "",
  location = "",
  page = 1,
  limit = 3
) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.get(`${mainUrl}/api/products/search`, {
      params: {
        level: level,
        name: search,
        venue_id: location,
        page: page,
        limit: limit,
        type: "class",
      },
    });
    return response;
  };
}
