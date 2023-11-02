// import dentsMock from '../../mock/dents.json'

import { GetDomainRequestActionType, GET_DOMAIN } from "../../types/actions/domain";
import { DomainState } from "../../types/data/domainState";

const initialState:DomainState = {  
  domain: [],
  status: 'idle',
  error: {hasError: false, message: ''}
};
  
export default function domainReducer(state = initialState, action:GetDomainRequestActionType) {
  switch (action.type) {
    case GET_DOMAIN:
      return {
        ...state,
        domain: action.payload.domain,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
