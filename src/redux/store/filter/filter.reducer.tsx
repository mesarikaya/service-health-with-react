import { GetFilterRequestActionType, SET_FILTER } from "../../types/actions/filter";
import { FilterState } from "../../types/data/filterState";

const initialState:FilterState = {  
  filter: [],
  status: 'idle',
  error: {hasError: false, message: ''}
};
  
export default function getFilterReducer(state = initialState, action: GetFilterRequestActionType) {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
  