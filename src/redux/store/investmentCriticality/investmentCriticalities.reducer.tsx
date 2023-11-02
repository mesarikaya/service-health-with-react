import { GetInvestmentCriticalityRequestActionType, GET_INVESTMENT_CRITICALITY } from "../../types/actions/investmentCriticality";
import { InvestmentCriticalityState } from "../../types/data/investmentCriticalityState";

const initialState:InvestmentCriticalityState = {  
  investmentCriticality: [],
  status: 'idle',
  error: {hasError: false, message: ''}
};
  
export default function investmentCriticalityReducer(state = initialState, action: GetInvestmentCriticalityRequestActionType) {
  switch (action.type) {
    case GET_INVESTMENT_CRITICALITY:
      return {
        ...state,
        investmentCriticality: action.payload.investmentCriticality,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
