// import dentsMock from '../../mock/dents.json'

import { GetAllLocationApiSiteNamesRequestActionType, SET_AVAILABLE_LOCATION_SITE_NAMES } from "../../types/actions/locationApiSite";
import { LocationApiAllSitesListState } from "../../types/data/locationApiSites";

const initialState:LocationApiAllSitesListState = {  
  siteNames: [],
  status: 'idle',
  error: {hasError: false, message: ''}
};
  
export default function getAllLocationApiSiteNamesReducer(state = initialState, action: GetAllLocationApiSiteNamesRequestActionType) {
  switch (action.type) {
    case SET_AVAILABLE_LOCATION_SITE_NAMES:
      return {
        ...state,
        siteNames: action.payload.siteNames,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
  