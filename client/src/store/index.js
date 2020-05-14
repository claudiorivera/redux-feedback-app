import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./initialState.json";

export default createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
