import { DashboardSiteLocationsState } from "../../types/data/dashboardSiteFiltersState";


const initialState:DashboardSiteLocationsState = {
    site: [],
    status: 'loading',
    error: {hasError: false, message: ''}
};
  
export default function siteReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_SITE":
      return {
        ...state,
        site: [...action.payload.site],
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
  