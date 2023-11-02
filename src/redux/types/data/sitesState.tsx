import { Error } from "./error";
import Site from "./dashboardSiteFiltersState";


export interface SitesState {
    sites: Site[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error;
}