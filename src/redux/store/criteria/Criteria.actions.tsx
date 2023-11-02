import axios, { AxiosError, AxiosResponse } from "axios";
import { criteriaApi } from "../../../api";
import { getToken } from "../../../component/utils/getToken";
import { setErrorStatus } from "../../../component/utils/setErrorMessage";
import { GET_CRITERIA } from "../../types/actions/criteria";
import { Error } from "../../types/data/error";

export const getCriteria = () => async (dispatch) => {
  try {
    const accessToken = await getToken().then((token) => {
      return token;
    });

    await axios
      .get(criteriaApi(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response: AxiosResponse<any>) => {
        dispatch({
          type: GET_CRITERIA,
          payload: {
            criteria: response.data,
            status: "succeeded",
            error: { hasError: false, message: "" },
          },
        });
      })
      .catch((error: AxiosError) => {
        const errorDetails: Error = setErrorStatus(error);
        dispatch({
          type: GET_CRITERIA,
          payload: { criteria: [], status: "failed", error: errorDetails },
        });
      });
  } catch (error: any) {
    const errorDetails: Error = setErrorStatus(error);
    dispatch({
      type: GET_CRITERIA,
      payload: { criteria: [], status: "failed", error: errorDetails },
    });
  }
};
