import { combineReducers } from "redux";
import { completedFeedback, currentFeedback } from "./feedback";

export default combineReducers({
  completedFeedback,
  currentFeedback,
});
