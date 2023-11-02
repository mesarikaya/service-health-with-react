import { DashboardCardDataState } from "../data/dashboardCardDataState";

export const GET_DASHBOARD = 'GET_DASHBOARD';
interface GetDashboardCardDataRequest {
    type: typeof GET_DASHBOARD
    payload: DashboardCardDataState
}
export type GetDashboardCardDataRequestActionType = GetDashboardCardDataRequest;