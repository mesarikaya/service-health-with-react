import axios, { AxiosError, AxiosResponse } from "axios";
import { siteApi } from "../../../api";
import { getToken } from "../../../component/utils/getToken";
import { setErrorStatus } from "../../../component/utils/setErrorMessage";
import { GET_SITE } from "../../types/actions/dashboardSiteFilter";
import { Error } from "../../types/data/error";

export const getSite = (region: string[]) => async (dispatch) => {
  try {
    const accessToken = await getToken().then((token) => {
      return token;
    });

    await axios
      .post(
        siteApi(),
        {
          region: region,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: AxiosResponse<any>) => {
        dispatch({
          type: GET_SITE,
          payload: {
            site: response.data,
            status: "succeeded",
            error: { hasError: false, message: "" },
          },
        });
      })
      .catch((error: AxiosError) => {
        const errorDetails: Error = setErrorStatus(error);
        dispatch({
          type: GET_SITE,
          payload: { site: [], status: "failed", error: errorDetails },
        });
      });
  } catch (error: any) {
    const errorDetails: Error = setErrorStatus(error);
    dispatch({
      type: GET_SITE,
      payload: { site: [], status: "failed", error: errorDetails },
    });
  }
};
