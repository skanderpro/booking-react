import axios from "axios";

export function fetchAllVenues() {
    return async (dispatch, getState) => {
        let mainUrl = getState().settings.mainUrl;
        let response = await axios.get(`${mainUrl}/api/venues`);
        return response;
    }
}