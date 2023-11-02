import { SitesState } from "../data/sitesState";

export const GET_SITES = 'GET_SITES';
interface GetSitesRequest {
    type: typeof GET_SITES
    payload: SitesState
}
export type GetSitesRequestActionType = GetSitesRequest;