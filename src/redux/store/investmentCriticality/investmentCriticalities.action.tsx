import axios, { AxiosError, AxiosResponse } from "axios";
import { investmentCriticalitiesApi } from "../../../api";
import { getToken } from "../../../component/utils/getToken";
import { setErrorStatus } from "../../../component/utils/setErrorMessage";
import { GET_INVESTMENT_CRITICALITY } from "../../types/actions/investmentCriticality";
import { Error } from "../../types/data/error";

export const getInvestmentCriticalities = () => async (dispatch) => {
  try {
    const accessToken = await getToken().then((token) => {
      return token;
    });

    await axios
      .get(investmentCriticalitiesApi(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response: AxiosResponse<any>) => {
        dispatch({
          type: GET_INVESTMENT_CRITICALITY,
          payload: {
            investmentCriticality: response.data,
            status: "succeeded",
            error: { hasError: false, message: "" },
          },
        });
      })
      .catch((error: AxiosError) => {
        const errorDetails: Error = setErrorStatus(error);
        dispatch({
          type: GET_INVESTMENT_CRITICALITY,
          payload: {
            investmentCriticality: [],
            status: "failed",
            error: errorDetails,
          },
        });
      });
  } catch (error: any) {
    const errorDetails: Error = setErrorStatus(error);
    dispatch({
      type: GET_INVESTMENT_CRITICALITY,
      payload: {
        investmentCriticality: [],
        status: "failed",
        error: errorDetails,
      },
    });
  }
};
