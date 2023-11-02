import { createLogger } from "redux-logger";

export const logger = createLogger({
  // Example to collapse certain type of log action e.x., GET_CATEGORY
  //collapsed: (getState, action) => action.type === "GET_CATEGORY",

  // Example to log only certain type of action
  //predicate: (getState, action) => action.type === "GET_CATEGORY",

  // to show the difference between what changed in state
  diff: false,

  // to log time
  duration: true,
  timestamp: true,

  // custom colors for each log
  colors: {
    title: () => "#0f1842",
    prevState: () => "#de6f0d",
    action: () => "#6e13ab",
    nextState: () => "#1a9134",
  },

  logErrors: true,

  // instead of colors - use console type
  level: "info",
});
