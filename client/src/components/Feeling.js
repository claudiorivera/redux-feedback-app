import React, { Component } from "react";
import { submitFeeling } from "../store/actions";
import { connect } from "react-redux";
import { Button, Select, MenuItem, Grid } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";

class Feeling extends Component {
  // Default value to hold in component state
  state = {
    value: 3,
  };

  // If there's a value in the store, set the state to it
  componentDidMount() {
    const { feeling } = this.props.feedback;
    if (feeling) {
      this.setState({ value: feeling });
    }
  }

  // Update component state when a new option is selected
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  // Dispatch submitFeeling from the redux store
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitFeeling(this.state.value);
    this.props.history.push("/understanding");
  };

  render() {
    return (
      <div>
        <h1>How are you feeling today?</h1>
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<KeyboardArrowRight />}
            >
              Continue
            </Button>
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
export default connect(mapStateToProps, { submitFeeling })(Feeling);
