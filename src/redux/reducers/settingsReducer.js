import { INIT_SETTINGS } from "../actions/actionTypes";

const initializeState = {
    mainUrl: "http://bookingadmin.solver.com.ua",

};

export default function settingsReducer(state = initializeState, action) {
    switch (action.type) {
        default:
            return { ...state };
    }
}
