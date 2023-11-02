import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import dashboardReducer from "./dashboard/Dashboard.reducers";
import siteReducer from "./site/Site.reducers";
import eventReducer from "./event/Event.reducers";
import sitesReducer from "./sites/Sites.reducers";
import techAreaReducer from "./techArea/TechArea.reducers";
import criteriaReducer from "./criteria/Criteria.reducers";
import domainReducer from "./domain/Domain.reducers";
import categoryReducer from "./category/Category.reducers";
import getAllLocationApiSiteNamesReducer from "./locationApiSitesData/allLocationSites.reducer";
import getFilteredLocationApiSitesReducer from "./locationApiSitesData/filteredSiteLocations.reducer";
import investmentCriticalityReducer from "./investmentCriticality/investmentCriticalities.reducer";
import getFilterReducer from "./filter/filter.reducer";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  site: siteReducer,
  event: eventReducer,
  investmentCriticality: investmentCriticalityReducer,
  sites: sitesReducer,
  techArea: techAreaReducer,
  criteria: criteriaReducer,
  domain: domainReducer,
  category: categoryReducer,
  locationApiSiteNames: getAllLocationApiSiteNamesReducer,
  filteredLocationApiSites: getFilteredLocationApiSitesReducer,
  filter: getFilterReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareList = [thunk];

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
  middleware: middlewareList,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistedStore = persistStore(store);
