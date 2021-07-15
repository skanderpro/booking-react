import axios from "axios";

const loginWithFacebook = (access_token) => {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.post(`${mainUrl}/api/auth/facebook/callback`, {
      access_token,
    });
    return response;
  };
};

export { loginWithFacebook };
