import { DashboardCardData } from "./dashboardCardData";
import { Error } from "./error";


export interface DashboardCardDataState {
    dashboard: DashboardCardData[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error;
}