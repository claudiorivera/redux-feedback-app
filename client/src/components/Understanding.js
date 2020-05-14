import React, { Component } from "react";
import { submitUnderstanding } from "../store/actions";
import { connect } from "react-redux";
import { Button, Grid, Select, MenuItem, Box } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

class Understanding extends Component {
  // Default value to hold in component state
  state = {
    value: 3,
  };

  // If there's a value in the store, set the state to it
  componentDidMount() {
    const { understanding } = this.props.feedback;
    if (understanding) {
      this.setState({ value: understanding });
    }
  }

  // Update component state when a new option is selected
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  // Dispatch submitUnderstanding from the redux store
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitUnderstanding(this.state.value);
    this.props.history.push("/support");
  };

  handleBackClick = () => {
    this.props.submitUnderstanding(this.state.value);
    this.props.history.push("/feeling");
  };
  render() {
    return (
      <div>
        <h1>How well are you understanding the content?</h1>
        {/* https://www.w3schools.com/html/html_forms.asp */}
        <form onSubmit={this.handleSubmit}>
          <Select value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
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

export default connect(mapStateToProps, { submitUnderstanding })(Understanding);
