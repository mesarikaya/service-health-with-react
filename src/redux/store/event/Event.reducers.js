const initialState = {
  domain_event: [],
  technology_event: [],
  category_event: [],
  filterData: [],
  siteSearch: "",
  authDetail: [],
  criticalities: [],
  filterSite:[]
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOMAIN_EVENT":
      return {
        ...state,
        domain_event: action.payload,
      };
    case "GET_TECHNOLOGY_EVENT":
      return {
        ...state,
        technology_event: action.payload,
      };
    case "GET_CATEGORY_EVENT":
      return {
        ...state,
        category_event: action.payload,
      };
    case "GET_CRITERIA_EVENT":
      return {
        ...state,
        criteria_event: action.payload,
      };
    case "GET_FILTER_DATA":
      return {
        ...state,
        filterData: action.payload,
      };
    case "GET_FILTER_SITE":
      return {
        ...state,
        filterSite: action.payload,
      };
    case "SET_AUTH":
      return {
        ...state,
        authDetail: action.payload,
      };
    default:
      return state;
  }
}
