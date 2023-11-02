import { useEffect, useState, useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";
import { decodeToken } from "./JwtDecode";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store/store";

interface AuthInfo {
  accessToken: String;
  roles: Array<String>;
}

export function ProfileContent() {
  const dispatch = useDispatch<AppDispatch>();

  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState<String | null>(null);
  const [userDetails, setUserDetails] = useState<AuthInfo | null>(null);
  const name = accounts[0] && accounts[0].name;
  const RequestAccessToken = useCallback(() => {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };
    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then(async (response) => {
        setUserDetails(decodeToken(response.accessToken));
        setAccessToken(response.accessToken);
        dispatch({
          type: "SET_AUTH",
          payload: decodeToken(response.accessToken),
        });
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          const details = decodeToken(response.accessToken);
          console.log("SSO-DEBUG", "1-Requesting Token:", "new token");
          setUserDetails(details);
          setAccessToken(response.accessToken);
          dispatch({
            type: "SET_AUTH",
            payload: response.accessToken,
          });
        });
      });
  }, [accounts, dispatch, instance]);

  useEffect(() => {
    RequestAccessToken();
  }, [RequestAccessToken, inProgress, instance]);

  return (
    <>
      {/* <h5 className="card-title">Welcome {name}</h5>
            {accessToken ?
                <div>
                    <UserInfo userDetails={userDetails} />
                    <Button onClick={RequestAccessToken}>Request Access Token</Button>
                </div>
                :
                <div>
                    <UserInfo userDetails={userDetails} />
                    <Button onClick={RequestAccessToken}>Request Access Token</Button>
                </div>
            } */}
    </>
  );
}
