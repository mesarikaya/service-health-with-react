import { Error } from "../../redux/types/data/error";

export const setErrorStatus = (error: any): Error => {
  let errorMessage: string = "";
  if (error.response) {
    errorMessage = error.response.data?.message || "";
    const errorPath: string = error.response.data?.path || "";
    if (error.response.status === 401) {
      errorMessage =
        "No authorization for such actions or expired credentials. Please signing in again or if needed, request more access rights! Error details:" +
        errorMessage;
    } else if (error.response.status === 403) {
      errorMessage =
        "Forbidden! Please check if you have VPN connection! Error details:" +
        errorPath +
        " " +
        errorMessage;
    } else if (error.response.status === 407) {
      errorMessage =
        "Proxy Authentication Required. Please check your VPN connection! Error details:" +
        errorPath +
        " " +
        errorMessage;
    } else if (error.response.status >= 400 && error.response.status < 500) {
      errorMessage =
        "Server rejected request for path: " +
        errorPath +
        " " +
        errorMessage +
        " with response status:" +
        error.response.status;
    } else if (error.response.status >= 500) {
      errorMessage =
        "Issue with the server. Please try again later! Error details:" +
        errorPath +
        " " +
        errorMessage;
    } else {
      errorMessage = "UnknownAxiosError:" + errorPath + " " + errorMessage;
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Browser Error:", error);
    errorMessage =
      "Browser Error. Request could not be sent. Request: " +
       error.request+
      " Error: " +
      (error?.message || "");
  } else {
    errorMessage = "UnknownError " + (error?.message || "");
  }

  return { hasError: true, message: errorMessage };
};
