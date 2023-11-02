// import dentsMock from '../../mock/dents.json'

import { GetTechAreaRequestActionType, GET_TECH_AREA } from "../../types/actions/techArea";
import { TechAreaState } from "../../types/data/techAreaState";

const initialState:TechAreaState = {  
  techArea: [],
  status: 'idle',
  error: {hasError: false, message: ''}
};
  
  export default function technologyReducer(state = initialState, action: GetTechAreaRequestActionType) {
    switch (action.type) {
      case GET_TECH_AREA:
        return {
          ...state,
          techArea: action.payload.techArea,
          status: action.payload.status,
          error: action.payload.error
        };
      default:
        return state;
    }
  }
  