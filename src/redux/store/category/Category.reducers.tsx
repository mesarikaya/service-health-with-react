import { GetCategoryRequestActionType, GET_CATEGORY } from "../../types/actions/category";
import { CategoryState } from "../../types/data/categoryState";

const initialState:CategoryState = {  
  category: [],
  status: 'idle',
  error: {hasError: false, message: ''}
};
  
export default function categoryReducer(state = initialState, action:GetCategoryRequestActionType) {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}

  
  