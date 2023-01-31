import { INIT_SETTINGS } from "../actions/actionTypes";

const initializeState = {
  // mainUrl: "https://crm.sewconfident.co.uk",
  // mainUrl: "http://booking",
   mainUrl: "http://127.0.0.1:8000",
};

export default function settingsReducer(state = initializeState, action) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
