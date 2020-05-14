// CONSTANTS
import {
  SUBMIT_FEELING,
  SUBMIT_UNDERSTANDING,
  SUBMIT_SUPPORT,
  SUBMIT_COMMENTS,
  CLEAR_CURRENT_FEEDBACK,
  GET_FEEDBACK_REQUESTING,
  GET_FEEDBACK_SUCCESSFUL,
  GET_FEEDBACK_FAILED,
  POST_FEEDBACK_REQUESTING,
  POST_FEEDBACK_SUCCESSFUL,
  POST_FEEDBACK_FAILED,
  DELETE_FEEDBACK_REQUESTING,
  DELETE_FEEDBACK_SUCCESSFUL,
  DELETE_FEEDBACK_FAILED,
  TOGGLE_FLAG_REQUESTING,
  TOGGLE_FLAG_SUCCESSFUL,
  TOGGLE_FLAG_FAILED,
  SET_ROWS_FILTER,
} from "../actions/actionTypes";

// REDUCERS - no api calls or mutating!
export const completedFeedback = (
  state = {},
  { type, rows, error, filter, id }
) => {
  switch (type) {
    case GET_FEEDBACK_REQUESTING:
    case DELETE_FEEDBACK_REQUESTING:
    case TOGGLE_FLAG_REQUESTING:
      // Set fetching to true
      return { ...state, isFetching: true };
    case GET_FEEDBACK_FAILED:
    case DELETE_FEEDBACK_FAILED:
    case TOGGLE_FLAG_FAILED:
      // Return the error and set fetching to false
      return { ...state, isFetching: false, errors: [...state.errors, error] };
    case GET_FEEDBACK_SUCCESSFUL:
      // Return all rows
      return { ...state, isFetching: false, rows, errors: [] };
    case DELETE_FEEDBACK_SUCCESSFUL:
      // Return rows that don't match the id of deleted item
      return {
        ...state,
        isFetching: false,
        rows: [...state.rows.filter((row) => row.id !== id)],
        errors: [],
      };
    case TOGGLE_FLAG_SUCCESSFUL:
      return {
        ...state,
        isFetching: false,
        rows: [
          // Check each row, if the id matches, toggle the flag
          ...state.rows.map((row) => {
            return {
              ...row,
              flagged: row.id === id ? !row.flagged : row.flagged,
            };
          }),
        ],
        errors: [],
      };
    case SET_ROWS_FILTER:
      return { ...state, showingRowsWithFilter: filter };
    default:
      return state;
  }
};

export const currentFeedback = (state = {}, { type, value, error }) => {
  switch (type) {
    case SUBMIT_FEELING:
      return { ...state, feedback: { ...state.feedback, feeling: value } };
    case SUBMIT_UNDERSTANDING:
      return {
        ...state,
        feedback: { ...state.feedback, understanding: value },
      };
    case SUBMIT_SUPPORT:
      return { ...state, feedback: { ...state.feedback, support: value } };
    case SUBMIT_COMMENTS:
      return { ...state, feedback: { ...state.feedback, comments: value } };
    case CLEAR_CURRENT_FEEDBACK:
      return {
        feedback: {},
        isPosting: false,
        errors: [],
        didPostSuccessfully: false,
      };
    case POST_FEEDBACK_REQUESTING:
      return { ...state, isPosting: true };
    case POST_FEEDBACK_SUCCESSFUL:
      return {
        feedback: {},
        isPosting: false,
        errors: [],
        didPostSuccessfully: true,
      };
    case POST_FEEDBACK_FAILED:
      return {
        ...state,
        isPosting: false,
        errors: [...state.errors, error],
        didPostSuccessfully: false,
      };
    default:
      return state;
  }
};
