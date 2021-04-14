import { INIT_SETTINGS } from "../actions/actionTypes";

const initializeState = {
    mainUrl: "https://aws.witit.com",

};

export default function settingsReducer(state = initializeState, action) {
    switch (action.type) {
        default:
            return { ...state };
    }
}
