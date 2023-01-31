import { combineReducers } from "redux";

import settingsReducer from "./settingsReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import bannerReducer from "./bannerReducer";

export default combineReducers({
    user:userReducer,
    settings: settingsReducer,
    cart: cartReducer,
    banner: bannerReducer,
});
