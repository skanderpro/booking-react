import {
    LOGIN_SUCCESS,
    SET_USER_PROFILE,
    UPDATE_USER_PROFILE,
    LOGOUT_USER,
} from './../actions/actionTypes';

const initializeState = {
    token: "",
    user: {}

};
export default function userReducer(state = initializeState, action) {
    // console.log(action)
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.data.token
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                user: {...action.data.user}
            }
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.data.user,
                }
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: {},
                token: ''
            }
        default:
            return state;
    }
}