import {
  ADD_LOCAL_CART,
  GET_REMOTE_CART,
  ADD_PROMOCODE,
  CLEAR_PROMOCODE, SET_INVITE, ADD_VOUCHER, SET_SHOW_WAITLIST_MODEAL,
} from "./../actions/actionTypes";

const initializeState = {
  items: [],
  promocode: "",
  invite: null,
  voucherData: null,
  showWaitlistModal: false,
};
export default function cartReducer(state = initializeState, action) {
  switch (action.type) {
    case SET_SHOW_WAITLIST_MODEAL:
      return {
        ...state,
        showWaitlistModal: action.payload.showWaitlistModal
      };
    case ADD_LOCAL_CART:
      return {
        ...state,
        items: [...action.data.items],
      };
    case ADD_PROMOCODE:
      return {
        ...state,
        promocode: action.data.promocode,
      };
    case ADD_VOUCHER:
      return {
        ...state,
        voucherData: action.payload.voucher,
      };
    case CLEAR_PROMOCODE:
      return {
        ...state,
        promocode: "",
        voucherData: null,
      };
    case SET_INVITE:
      return {...state, invite: action.payload.invite};
    default:
      return state;
  }
}
