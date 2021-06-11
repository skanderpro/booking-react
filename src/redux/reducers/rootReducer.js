import { combineReducers } from "redux";

import settingsReducer from "./settingsReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
    user:userReducer,
    settings: settingsReducer,
    cart: cartReducer
});
