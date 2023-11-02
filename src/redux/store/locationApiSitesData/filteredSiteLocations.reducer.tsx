import {  GetLocationApiFilteredSitesRequestActionType, SET_FILTERED_LOCATIONS } from "../../types/actions/locationApiSite";
import { LocationApiFilteredSitesState } from "../../types/data/locationApiSites";

const initialState:LocationApiFilteredSitesState = {  
  locations: [],
  status: 'idle',
  error: {hasError: false, message: ''}
};
  
  
export default function getFilteredLocationApiSitesReducer(state = initialState, action: GetLocationApiFilteredSitesRequestActionType) {
  switch (action.type) {
    case SET_FILTERED_LOCATIONS:
      return {
        ...state,
        locations: action.payload.locations,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
  