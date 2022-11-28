import {
  ADD_LOCAL_CART,
  GET_REMOTE_CART,
  ADD_PROMOCODE,
  CLEAR_PROMOCODE, SET_INVITE,
} from "./../actions/actionTypes";

const initializeState = {
  items: [],
  promocode: "",
  invite: null,
};
export default function cartReducer(state = initializeState, action) {
  switch (action.type) {
    case ADD_LOCAL_CART:
      console.log(action);
      return {
        ...state,
        items: [...action.data.items],
      };
    case ADD_PROMOCODE:
      return {
        ...state,
        promocode: action.data.promocode,
      };
    case CLEAR_PROMOCODE:
      return { ...state, promocode: "" };
    case SET_INVITE:
      return {...state, invite: action.payload.invite};
    default:
      return state;
  }
}
