import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`, // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "/login",
  },
  knownAuthorities: [
    "https://login.microsoftonline.com/",
    `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
  ],
  postLogoutRedirectUri: "/login",
  protocolMode: "OIDC",
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      logLevel:
        process.env.REACT_APP_NODE_ENV !== "production"
          ? LogLevel.Warning
          : LogLevel.Error,
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: [`${process.env.REACT_APP_RESOURCE_ID}/DefaultAppAccess`],
};
