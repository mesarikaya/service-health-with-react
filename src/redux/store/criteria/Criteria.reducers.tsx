// import dentsMock from '../../mock/dents.json'

import { GetCriteriaRequestActionType, GET_CRITERIA } from "../../types/actions/criteria";
import { AssessmentCriteriaState } from "../../types/data/criteriaState";

const initialState:AssessmentCriteriaState = {  
  criteria: [],
  status: 'idle',
  error: {hasError: false, message: ''}
};
  
export default function criteriaReducer(state = initialState, action: GetCriteriaRequestActionType) {
  switch (action.type) {
    case GET_CRITERIA:
      return {
        ...state,
        criteria: action.payload.criteria,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
  