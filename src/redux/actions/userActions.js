import axios from "axios";
import {
  LOGIN_SUCCESS, LOGOUT_USER,
  SET_USER_PROFILE,
  UPDATE_USER_PROFILE
} from "./actionTypes";
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
    dispatch(logoutUser());

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

export function updateUserProfile(user) {
  return {
    type: UPDATE_USER_PROFILE,
    data: {
      user,
    },
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    data: {},
  };
}

export function forgotPassword(email) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.post(`${mainUrl}/api/password/email`, {
      email,
    });
    return response;
  };
}

export function resetPassword(formData) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.post(`${mainUrl}/api/password/reset`, {
      email: formData.email,
      token: formData.token,
      password: formData.newPassword,
      password_confirmation: formData.newPassword_c,
    });
    return response;
  };
}
