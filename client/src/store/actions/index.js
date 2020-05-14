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
  SET_ROWS_FILTER,
  POST_FEEDBACK_REQUESTING,
  POST_FEEDBACK_SUCCESSFUL,
  POST_FEEDBACK_FAILED,
  DELETE_FEEDBACK_REQUESTING,
  DELETE_FEEDBACK_SUCCESSFUL,
  DELETE_FEEDBACK_FAILED,
  TOGGLE_FLAG_REQUESTING,
  TOGGLE_FLAG_SUCCESSFUL,
  TOGGLE_FLAG_FAILED,
} from "./actionTypes";

// For API calls
import axios from "axios";

// ACTION CREATORS
export const submitFeeling = (value) => ({
  type: SUBMIT_FEELING,
  value,
});
export const submitUnderstanding = (value) => ({
  type: SUBMIT_UNDERSTANDING,
  value,
});
export const submitSupport = (value) => ({
  type: SUBMIT_SUPPORT,
  value,
});
export const submitComments = (value) => ({
  type: SUBMIT_COMMENTS,
  value,
});
export const clearCurrentFeedback = () => ({
  type: CLEAR_CURRENT_FEEDBACK,
});
export const setRowsFilter = (filter) => ({
  type: SET_ROWS_FILTER,
  filter,
});

// API ACTIONS
// https://medium.com/velotio-perspectives/how-to-make-asynchronous-calls-in-redux-without-middlewares-cbf7181020b2
// GET /feedback - Return all rows
const getCompletedFeedback = async (dispatch) => {
  dispatch({ type: GET_FEEDBACK_REQUESTING });
  try {
    const res = await axios.get("/feedback");
    dispatch({ type: GET_FEEDBACK_SUCCESSFUL, rows: res.data });
  } catch (error) {
    dispatch({ type: GET_FEEDBACK_FAILED, error });
  }
};
export const getCompletedFeedbackFunction = (dispatch) => {
  return () => getCompletedFeedback(dispatch);
};

// POST /feedback - Post the current feedback
const postFeedback = async (dispatch, feedback) => {
  dispatch({ type: POST_FEEDBACK_REQUESTING });
  try {
    await axios.post("/feedback", feedback);
    dispatch({ type: POST_FEEDBACK_SUCCESSFUL });
  } catch (error) {
    dispatch({ type: POST_FEEDBACK_FAILED, error });
  }
};
export const postFeedbackFunction = (dispatch) => {
  return (feedback) => postFeedback(dispatch, feedback);
};

// DELETE /feedback/:id - Delete feedback by id
const deleteFeedback = async (dispatch, id) => {
  dispatch({ type: DELETE_FEEDBACK_REQUESTING });
  try {
    await axios.delete(`/feedback/${id}`);
    dispatch({ type: DELETE_FEEDBACK_SUCCESSFUL, id });
  } catch (error) {
    dispatch({ type: DELETE_FEEDBACK_FAILED, error });
  }
};
export const deleteFeedbackFunction = (dispatch) => {
  return (id) => deleteFeedback(dispatch, id);
};

// PUT /feedback/:id - Toggle flag for given id
const toggleFlag = async (dispatch, id) => {
  dispatch({ type: TOGGLE_FLAG_REQUESTING });
  try {
    await axios.put(`/feedback/${id}`);
    dispatch({ type: TOGGLE_FLAG_SUCCESSFUL, id });
  } catch (error) {
    dispatch({ type: TOGGLE_FLAG_FAILED, error });
  }
};
export const toggleFlagFunction = (dispatch) => {
  return (id) => toggleFlag(dispatch, id);
};
