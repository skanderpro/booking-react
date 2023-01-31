import { BANNER_SET_PLACE } from "../actions/actionTypes";

const initializeState = {
  banners: {}
};

export default function bannerReducer(state = initializeState, action) {
  switch (action.type) {
      case BANNER_SET_PLACE:
          return {
              ...state,
              banners: {
                  ...state.banners,
                  [action.payload.place]: action.payload.banners,
              },
          };
    default:
      return { ...state };
  }
}
