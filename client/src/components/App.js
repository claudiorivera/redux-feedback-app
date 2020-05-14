import React, { Component } from "react";
// https://stackoverflow.com/questions/42892488/react-router-v4-0-0-uncaught-typeerror-cannot-read-property-location-of-unde
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { clearCurrentFeedback } from "../store/actions";
import {
  Button,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";

// Router routes
import { routes } from "../routes";

class App extends Component {
  handleBeginClick = () => {
    this.props.clearCurrentFeedback();
  };
  render() {
    return (
      <Container maxWidth="md">
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Feedback App</Typography>
              {/* <Button color="inherit">Admin</Button> */}
              <NavLink to="/">
                <Button>Home</Button>
              </NavLink>
              <NavLink to="/admin">
                <Button>Admin</Button>
              </NavLink>
            </Toolbar>
          </AppBar>
          {/* Home page route */}
          <Route exact path="/">
            <NavLink to="/feeling">
              <Box m={3}>
                <Grid container justify="center">
                  <Button
                    onClick={this.handleBeginClick}
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<KeyboardArrowRight />}
                  >
                    Begin
                  </Button>
                </Grid>
              </Box>
            </NavLink>
          </Route>
          {/* Map through routes array, creating routes that pass props */}
          {routes.map(({ path, component: Component }, index) => (
            <Route
              path={path}
              key={index}
              render={(props) => <Component {...props} />}
            />
          ))}
        </Router>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { feedback, didPostSuccessfully } = state.currentFeedback;
  return { feedback, didPostSuccessfully };
};

export default connect(mapStateToProps, { clearCurrentFeedback })(App);
