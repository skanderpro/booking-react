import axios from "axios";
import { LOGIN_SUCCESS, SET_USER_PROFILE } from "./actionTypes";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function login(formData) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.post(`${mainUrl}/api/login`, {
      ...formData,
    });

    return response;
  };
}

export function register(formData) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.post(`${mainUrl}/api/register`, {
      ...formData,
    });
    return response;
  };
}

export function checkProfile() {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let response = await axios.get(`${mainUrl}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // dispatch(setUserProfile(response.data));
    return response;
  };
}

export function logout() {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let response = await axios.post(
      `${mainUrl}/api/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };
}

export function userDiscount(invite) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.get(`${mainUrl}/api/user-discount`, {
      params: {
        invite,
      },
    });
    return response;
  };
}

export function setUserProfile(user) {
  return {
    type: SET_USER_PROFILE,
    data: {
      user: user,
    },
  };
}
