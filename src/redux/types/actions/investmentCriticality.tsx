import { InvestmentCriticalityState } from "../data/investmentCriticalityState";

export const GET_INVESTMENT_CRITICALITY = 'GET_INVESTMENT_CRITICALITY';
interface GetInvestmentCriticalityRequest {
    type: typeof GET_INVESTMENT_CRITICALITY
    payload: InvestmentCriticalityState
}
export type GetInvestmentCriticalityRequestActionType = GetInvestmentCriticalityRequest;