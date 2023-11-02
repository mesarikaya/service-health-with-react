import { LocationApiAllSitesListState, LocationApiFilteredSitesState } from "../data/locationApiSites";

export const SET_FILTERED_LOCATIONS = 'SET_FILTERED_LOCATIONS';
interface GetLocationApiFilteredSitesRequest {
    type: typeof SET_FILTERED_LOCATIONS
    payload: LocationApiFilteredSitesState
}
export type GetLocationApiFilteredSitesRequestActionType = GetLocationApiFilteredSitesRequest;

export const SET_AVAILABLE_LOCATION_SITE_NAMES = 'SET_AVAILABLE_LOCATION_SITE_NAMES';
interface GetAllLocationApiSiteNamesRequest {
    type: typeof SET_AVAILABLE_LOCATION_SITE_NAMES
    payload: LocationApiAllSitesListState
}
export type GetAllLocationApiSiteNamesRequestActionType = GetAllLocationApiSiteNamesRequest;