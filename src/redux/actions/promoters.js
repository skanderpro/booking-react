import axios from "axios";
import {memo} from "react";
import {SET_SHOW_WAITLIST_MODEAL} from "./actionTypes";

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

export function addToWaitList(data) {
    return async (dispatch, getState) => {
        let mainUrl = getState().settings.mainUrl;
        let response = await axios.post(mainUrl + `/api/wait-item`, {
            ...data
        });

        console.log('response', response);
        return response;
    };
}

export function setShowWaitingListMpodal(showWaitlistModal) {
    return {
        type: SET_SHOW_WAITLIST_MODEAL,
        payload: {
            showWaitlistModal
        }
    }
}
