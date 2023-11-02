import { FilterState } from "../data/filterState";

export const SET_FILTER = 'SET_FILTER';
interface GetFilterRequest {
    type: typeof SET_FILTER
    payload: FilterState
}
export type GetFilterRequestActionType = GetFilterRequest;