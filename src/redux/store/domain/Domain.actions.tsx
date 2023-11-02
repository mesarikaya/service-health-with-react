import axios, { AxiosError, AxiosResponse } from "axios";
import { domainApi } from "../../../api";
import { getToken } from "../../../component/utils/getToken";
import { setErrorStatus } from "../../../component/utils/setErrorMessage";
import { GET_DOMAIN } from "../../types/actions/domain";
import { Error } from "../../types/data/error";

export const getDomain = () => async (dispatch) => {
  try {
    const accessToken = await getToken().then((token) => {
      return token;
    });

    await axios
      .get(domainApi(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response: AxiosResponse<any>) => {
        dispatch({
          type: GET_DOMAIN,
          payload: {
            domain: response.data,
            status: "succeeded",
            error: { hasError: false, message: "" },
          },
        });
      })
      .catch((error: AxiosError) => {
        const errorDetails: Error = setErrorStatus(error);
        dispatch({
          type: GET_DOMAIN,
          payload: { domain: [], status: "failed", error: errorDetails },
        });
      });
  } catch (error: any) {
    const errorDetails: Error = setErrorStatus(error);
    dispatch({
      type: GET_DOMAIN,
      payload: { domain: [], status: "failed", error: errorDetails },
    });
  }
};
