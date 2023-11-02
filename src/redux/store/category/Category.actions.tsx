import axios, { AxiosError, AxiosResponse } from "axios";
import { categoryApi } from "../../../api";
import { getToken } from "../../../component/utils/getToken";
import { setErrorStatus } from "../../../component/utils/setErrorMessage";
import { GET_CATEGORY } from "../../types/actions/category";
import { Error } from "../../types/data/error";

export const getCategory = () => async (dispatch) => {
  try {
    const accessToken = await getToken().then((token) => {
      return token;
    });

    await axios
      .get(categoryApi(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response: AxiosResponse<any>) => {
        dispatch({
          type: GET_CATEGORY,
          payload: {
            category: response.data,
            status: "succeeded",
            error: { hasError: false, message: "" },
          },
        });
      })
      .catch((error: AxiosError) => {
        const errorDetails: Error = setErrorStatus(error);
        dispatch({
          type: GET_CATEGORY,
          payload: { category: [], status: "failed", error: errorDetails },
        });
      });
  } catch (error: any) {
    const errorDetails: Error = setErrorStatus(error);
    dispatch({
      type: GET_CATEGORY,
      payload: { category: [], status: "failed", error: errorDetails },
    });
  }
};
