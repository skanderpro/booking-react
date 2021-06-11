import {ADD_LOCAL_CART, GET_REMOTE_CART} from './../actions/actionTypes';


const initializeState = {
    items:[]

};
export default function cartReducer(state = initializeState, action) {
    switch (action.type) {
        case ADD_LOCAL_CART:
            console.log(action)
            return {
                ...state,
                items:[...action.data.items]
            };
        default: return state;
    }
}

