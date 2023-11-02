import axios, { AxiosError, AxiosResponse } from "axios";
import { filterApi } from "../../../api";
import { getToken } from "../../../component/utils/getToken";
import { setErrorStatus } from "../../../component/utils/setErrorMessage";
import { SET_FILTER } from "../../types/actions/filter";
import { Error } from "../../types/data/error";

export const getFilter = () => async (dispatch) => {
  try {
    const accessToken = await getToken().then((token) => {
      return token;
    });

    dispatch({
      type: SET_FILTER,
      payload: { filter: [], status: "loading", error: { hasError: false, message: "" } },
    });

    await axios.get(filterApi(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((response: AxiosResponse<any>) => {
      dispatch({
        type: SET_FILTER,
        payload: {
          filter: response.data,
          status: "succeeded",
          error: { hasError: false, message: "" },
        },
      });
    }).catch((error: AxiosError) => {
      const errorDetails: Error = setErrorStatus(error);
      dispatch({
        type: SET_FILTER,
        payload: { filter: [], status: "failed", error: errorDetails },
      });
    });
  } catch (error: any) {
    const errorDetails: Error = setErrorStatus(error);
    dispatch({
      type: SET_FILTER,
      payload: { filter: [], status: "failed", error: errorDetails },
    });
  }
};
