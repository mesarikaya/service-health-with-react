// import dentsMock from '../../mock/dents.json'

import { GetSitesRequestActionType, GET_SITES } from "../../types/actions/sites";
import { SitesState } from "../../types/data/sitesState";

const initialState:SitesState = {  
  sites: [],
  status: 'loading',
  error: {hasError: false, message: ''}
};
  
export default function sitesReducer(state = initialState, action: GetSitesRequestActionType) {
  switch (action.type) {
    case GET_SITES:
      return {
        ...state,
        sites: action.payload.sites,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
  