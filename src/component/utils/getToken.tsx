import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { msalInstance } from "../..";
import { loginRequest } from "../../config/authConfig";

export const getToken = () => {
  const accounts = msalInstance.getAllAccounts();
  const request = {
    ...loginRequest,
    account: accounts[0],
  };
  // Silently acquires an access token which is then attached to a request for Microsoft Graph data
  const accessToken = msalInstance
    .acquireTokenSilent(request)
    .then(async (response) => {
      return response.accessToken;
    })
    .catch((error) => {
      if (error instanceof InteractionRequiredAuthError) {
        msalInstance
          .acquireTokenPopup(request)
          .then((response) => {
            console.log(
              "SSO-DEBUG",
              "1-Requesting Token:",
              "new token with pop up"
            );

            return response.accessToken;
          })
          .catch((error) => {
            // Acquire token interactive failure
            console.log(error);
          });
        console.log(error);
      }
    });
  return accessToken;
};
