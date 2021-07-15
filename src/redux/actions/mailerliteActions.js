import axios from "axios";

export function putEmailToGroup(email) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let response = await axios.post(
      `${mainUrl}/api/mailerlite/email-to-groups`,
      {
        email,
      }
    );
    return response;
  };
}
