import { Error } from "../../types/data/error";

export const SET_SITE_LOCATIONS_ERROR = 'SET_SITE_LOCATIONS_ERROR';
interface GetAlllCargillLocationsError {
    type: typeof SET_SITE_LOCATIONS_ERROR
    payload: Error
}
export type GetAlllCargillLocationsErrorActionType = GetAlllCargillLocationsError;


export const SITE_LOCATION_DETAIL_RETRIEVAL_ERROR = 'SITE_LOCATION_DETAIL_RETRIEVAL_ERROR';
interface GetSiteLocationDataRequest {
    type: typeof SITE_LOCATION_DETAIL_RETRIEVAL_ERROR
    payload: Error
}
export type GetSiteLocationDataErrorActionType = GetSiteLocationDataRequest;