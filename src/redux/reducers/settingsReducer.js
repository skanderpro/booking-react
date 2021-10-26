import { INIT_SETTINGS } from "../actions/actionTypes";

const initializeState = {
  mainUrl: "https://crm.sewconfident.co.uk",
};

export default function settingsReducer(state = initializeState, action) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
