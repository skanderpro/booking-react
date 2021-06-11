import {LOGIN_SUCCESS,SET_USER_PROFILE} from './../actions/actionTypes';

const initializeState = {
    token: "",
    user:{}

};
export default function userReducer(state = initializeState, action) {
  // console.log(action)
    switch (action.type) {
        case LOGIN_SUCCESS:  return {
            ...state,
            token: action.data.token
        };
        case SET_USER_PROFILE: return {
            ...state,
            user:{...action.data.user}
        }
        default:
            return state;
    }
}