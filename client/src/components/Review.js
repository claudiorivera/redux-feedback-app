import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Box, CircularProgress } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { postFeedbackFunction } from "../store/actions";

class Review extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the submitFeedback action from the redux store, passing it the currentFeedback object
    this.props.postFeedback(this.props.feedback);
  };
  handleBackClick = () => {
    this.props.history.push("/comments");
  };
  handleHomeClick = () => {
    this.props.history.push("/");
  };

  render() {
    // Deconstruct store keys for convenience
    const { feeling, understanding, support, comments } = this.props.feedback;

    return (
      <div>
        {!this.props.didPostSuccessfully ? (
          // If the feedback hasn't been posted yet
          <div>
            <h1>Ready to send the following feedback?</h1>
            <p>Feeling: {feeling}</p>
            <p>Understanding: {understanding}</p>
            <p>Support: {support}</p>
            <p>Comments: {comments}</p>

            {/* https://www.w3schools.com/html/html_forms.asp */}
            <form onSubmit={this.handleSubmit}>
              <Grid container justify="center">
                <Box m={3}>
                  <Button
                    onClick={this.handleBackClick}
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<KeyboardArrowLeft />}
                  >
                    Back
                  </Button>
                </Box>
                <Box m={3}>
                  {this.props.isPosting ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={<KeyboardArrowRight />}
                    >
                      Submit
                    </Button>
                  )}
                </Box>
              </Grid>
            </form>
          </div>
        ) : (
          // If the feedback was posted successfully
          <div>
            <h1>Thanks for your feedback!</h1>
            <Box m={3}>
              <Grid container justify="center">
                <Button
                  onClick={this.handleHomeClick}
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<KeyboardArrowRight />}
                >
                  Back Home
                </Button>
              </Grid>
            </Box>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { feedback, isPosting, didPostSuccessfully } = state.currentFeedback;
  return { feedback, isPosting, didPostSuccessfully };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postFeedback: postFeedbackFunction(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
