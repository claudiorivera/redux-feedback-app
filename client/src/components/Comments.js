import React, { Component } from "react";
import { submitComments } from "../store/actions";
import { connect } from "react-redux";
import { Button, Grid, TextField, Box } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

class Comments extends Component {
  // Default value to hold in component state
  state = {
    value: "",
  };

  // If there's a value in the store, set the state to it
  componentDidMount() {
    const { comments } = this.props.feedback;
    if (comments !== "") {
      this.setState({ value: comments });
    }
  }

  // Update component state when text field is changed
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  // Dispatch submitComments from the redux store
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitComments(this.state.value);
    this.props.history.push("/review");
  };
  handleBackClick = () => {
    this.props.submitComments(this.state.value);
    this.props.history.push("/support");
  };
  render() {
    return (
      <div>
        <h1>Any comments you want to leave?</h1>
        {/* https://www.w3schools.com/html/html_forms.asp */}
        <form onSubmit={this.handleSubmit}>
          <TextField
            fullWidth
            // https://stackoverflow.com/questions/47012169/a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-erro
            value={this.state.value || ""}
            onChange={this.handleChange}
            label="Comments"
          />
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<KeyboardArrowRight />}
              >
                Continue
              </Button>
            </Box>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { feedback } = state.currentFeedback;
  return { feedback };
};

export default connect(mapStateToProps, { submitComments })(Comments);
