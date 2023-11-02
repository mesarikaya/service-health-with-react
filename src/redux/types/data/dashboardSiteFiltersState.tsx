import { Error } from "./error";
import InvestmentCriticality from "./investmentCriticality";

export default interface Site {
    id: number;
    name: string;
    mdmSiteId: number;
    mdmSiteName: string;
    comment: string;
    isActive: boolean;
    region:	string;
    enterprise:	string;
    businessGroup: string;
    reportingUnit: string;
    address: string;
    country: string;
    countryCode: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number
    investmentCriticality: InvestmentCriticality;
    investmentCriticalityId: number;
}


export interface DashboardSiteLocationsState {
    site: DashboardFilterSiteList[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error;
}

export interface DashboardFilterSiteList {
    site: string;
    region: string;
    siteId: number;
    country: string;
    active: boolean;
}