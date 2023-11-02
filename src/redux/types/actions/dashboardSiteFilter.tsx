import { DashboardSiteLocationsState } from "../data/dashboardSiteFiltersState";

export const GET_SITE = 'GET_SITE';
interface SetDashboardSiteLocationsRequest {
    type: typeof GET_SITE
    payload: DashboardSiteLocationsState
}
export type SetDashboardSiteLocationsRequestActionType = SetDashboardSiteLocationsRequest;