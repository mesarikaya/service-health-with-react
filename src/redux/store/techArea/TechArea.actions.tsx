import axios, { AxiosError, AxiosResponse } from "axios";
import { techAreaApi } from "../../../api";
import { getToken } from "../../../component/utils/getToken";
import { setErrorStatus } from "../../../component/utils/setErrorMessage";
import { GET_TECH_AREA } from "../../types/actions/techArea";
import { Error } from "../../types/data/error";

export const getTechArea = () => async (dispatch) => {
  try {
    const accessToken = await getToken().then((token) => {
      return token;
    });

    await axios
      .get(techAreaApi(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response: AxiosResponse<any>) => {
        dispatch({
          type: GET_TECH_AREA,
          payload: {
            techArea: response.data,
            status: "succeeded",
            error: { hasError: false, message: "" },
          },
        });
      })
      .catch((error: AxiosError) => {
        const errorDetails: Error = setErrorStatus(error);
        dispatch({
          type: GET_TECH_AREA,
          payload: { techArea: [], status: "failed", error: errorDetails },
        });
      });
  } catch (error: any) {
    const errorDetails: Error = setErrorStatus(error);
    dispatch({
      type: GET_TECH_AREA,
      payload: { techArea: [], status: "failed", error: errorDetails },
    });
  }
};
