import Site from "./dashboardSiteFiltersState";
import { Error } from "./error";


export interface LocationApiFilteredSitesState {
    locations: Site[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error;
}

export interface LocationApiAllSitesListState {
    siteNames: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error;
}