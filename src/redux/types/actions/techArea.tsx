import { TechAreaState } from "../data/techAreaState";

export const GET_TECH_AREA = 'GET_TECH_AREA';
interface GetTechAreaRequest {
    type: typeof GET_TECH_AREA
    payload: TechAreaState
}
export type GetTechAreaRequestActionType = GetTechAreaRequest;