import { AssessmentCriteriaState } from "../data/criteriaState";

export const GET_CRITERIA = 'GET_CRITERIA';
interface GetCriteriaRequest {
    type: typeof GET_CRITERIA
    payload: AssessmentCriteriaState
}
export type GetCriteriaRequestActionType = GetCriteriaRequest;