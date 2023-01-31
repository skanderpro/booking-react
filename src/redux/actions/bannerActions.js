import {BANNER_SET_PLACE} from "./actionTypes";


export function placeBannersSelector(place) {
    return state => state.banner.banners[place] || [];
}
export function setBanners(place, banners) {
    return {
        type: BANNER_SET_PLACE,
        payload: {
            place,
            banners,
        }
    }
}

export function requestBannersForPlace(place) {
    return async (dispatch, getState) => {
        const mainUrl = getState().settings.mainUrl;
        const response = await fetch(`${mainUrl}/api/banners?place=${place}`);
        const json = await response.json();
        dispatch(setBanners(place, json));
    }
}