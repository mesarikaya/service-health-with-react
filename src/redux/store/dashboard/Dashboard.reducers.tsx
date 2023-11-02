// import dentsMock from '../../mock/dents.json'

import { GetDashboardCardDataRequestActionType, GET_DASHBOARD } from "../../types/actions/dashboardCardData";
import { DashboardCardDataState } from "../../types/data/dashboardCardDataState";

const initialState:DashboardCardDataState = {  
  dashboard: [],
  status: 'loading',
  error: {hasError: false, message: ''}
};
  
  
export default function dashboardReducer(state = initialState, action: GetDashboardCardDataRequestActionType) {
  switch (action.type) {
    case GET_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload.dashboard,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
  