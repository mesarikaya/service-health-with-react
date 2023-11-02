import axios, { AxiosError, AxiosResponse } from "axios";
import { locationsApi } from "../../../api";
import { getToken } from "../../../component/utils/getToken";
import { setErrorStatus } from "../../../component/utils/setErrorMessage";
import { location } from "../../../sample/sampleData";
import { SET_FILTERED_LOCATIONS } from "../../types/actions/locationApiSite";
import { Error } from "../../types/data/error";

export const getLocations = (site: string) => async (dispatch) => {
  if (process.env.REACT_APP_NODE_ENV === "local") {
    dispatch({
      type: SET_FILTERED_LOCATIONS,
      payload: {
        locations: location,
        status: "succeeded",
        error: { hasError: false, message: "" },
      },
    });
  } else {
    dispatch({
      type: SET_FILTERED_LOCATIONS,
      payload: { status: "loading", error: { hasError: false, message: "" } },
    });
    try {
      let data = {
        siteName: site,
      };

      const accessToken = await getToken().then((token) => {
        return token;
      });

      await axios
        .post(locationsApi(), data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response: AxiosResponse<any>) => {
          dispatch({
            type: SET_FILTERED_LOCATIONS,
            payload: {
              locations: response.data,
              status: "succeeded",
              error: { hasError: false, message: "" },
            },
          });
        })
        .catch((error: AxiosError) => {
          const errorDetails: Error = setErrorStatus(error);
          dispatch({
            type: SET_FILTERED_LOCATIONS,
            payload: { locations: [], status: "failed", error: errorDetails },
          });
        });
    } catch (error: any) {
      const errorDetails: Error = setErrorStatus(error);
      dispatch({
        type: SET_FILTERED_LOCATIONS,
        payload: { locations: [], status: "failed", error: errorDetails },
      });
    }
  }
};
