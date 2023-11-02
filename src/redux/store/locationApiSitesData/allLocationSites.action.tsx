import axios, { AxiosError, AxiosResponse } from "axios";
import { locationSiteApi } from "../../../api";
import { getToken } from "../../../component/utils/getToken";
import { setErrorStatus } from "../../../component/utils/setErrorMessage";
import { SET_AVAILABLE_LOCATION_SITE_NAMES } from "../../types/actions/locationApiSite";
import { Error } from "../../types/data/error";

export const getSiteLocation = () => async (dispatch) => {
  if (process.env.REACT_APP_NODE_ENV === "local") {
    dispatch({
      type: SET_AVAILABLE_LOCATION_SITE_NAMES,
      payload: {
        siteNames: [],
        status: "succeeded",
        error: { hasError: false, message: "" },
      },
    });
  } else {
    const accessToken = await getToken().then((token) => {
      return token;
    });

    dispatch({
      type: SET_AVAILABLE_LOCATION_SITE_NAMES,
      payload: { status: "loading", error: { hasError: false, message: "" } },
    });
    try {
      await axios
        .post(
          locationSiteApi(),
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response: AxiosResponse<any>) => {
          dispatch({
            type: SET_AVAILABLE_LOCATION_SITE_NAMES,
            payload: {
              siteNames: response.data,
              status: "succeeded",
              error: { hasError: false, message: "" },
            },
          });
        })
        .catch((error: AxiosError) => {
          const errorDetails: Error = setErrorStatus(error);
          dispatch({
            type: SET_AVAILABLE_LOCATION_SITE_NAMES,
            payload: { siteNames: [], status: "failed", error: errorDetails },
          });
        });
    } catch (error: any) {
      const errorDetails: Error = setErrorStatus(error);
      dispatch({
        type: SET_AVAILABLE_LOCATION_SITE_NAMES,
        payload: { siteNames: [], status: "failed", error: errorDetails },
      });
    }
  }
};
