import axios from "axios";

export function fetchAllClasses(){
    return async (dispatch, getState) => {
        let mainUrl = getState().settings.mainUrl;
        let response = await axios.get(mainUrl + `/api/lessons`);
        return response;
    }
}