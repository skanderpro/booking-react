import { INIT_SETTINGS } from "../actions/actionTypes";

const initializeState = {
  mainUrl: "http://localhost:8000",
};

export default function settingsReducer(state = initializeState, action) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
