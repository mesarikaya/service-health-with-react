import axios, { AxiosError, AxiosResponse } from "axios";
import { dashboardApi } from "../../../api";
import { getToken } from "../../../component/utils/getToken";
import { setErrorStatus } from "../../../component/utils/setErrorMessage";
import { GET_DASHBOARD } from "../../types/actions/dashboardCardData";
import { Error } from "../../types/data/error";

export const getDashboard = (site: string) => async (dispatch) => {
  dispatch({
    type: GET_DASHBOARD,
    payload: { status: "loading", error: { hasError: false, message: "" } },
  });
  try {
    const accessToken = await getToken().then((token) => {
      return token;
    });

    await axios
      .post(
        dashboardApi(),
        { name: site },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: AxiosResponse<any>) => {
        dispatch({
          type: GET_DASHBOARD,
          payload: {
            dashboard: response.data,
            status: "succeeded",
            error: { hasError: false, message: "" },
          },
        });
      })
      .catch((error: AxiosError) => {
        const errorDetails: Error = setErrorStatus(error);
        dispatch({
          type: GET_DASHBOARD,
          payload: { dashboard: [], status: "failed", error: errorDetails },
        });
      });
  } catch (error: any) {
    const errorDetails: Error = setErrorStatus(error);
    dispatch({
      type: GET_DASHBOARD,
      payload: { dashboard: [], status: "failed", error: errorDetails },
    });
  }
};
