import { CategoryState } from "../data/categoryState";

export const GET_CATEGORY = 'GET_CATEGORY';
interface GetCategoryRequest {
    type: typeof GET_CATEGORY
    payload: CategoryState
}
export type GetCategoryRequestActionType = GetCategoryRequest;