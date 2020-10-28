import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
} from "react-router-dom";
import { routes } from "../routes";
import { clearCurrentFeedback } from "../store/actions";

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
              <Typography variant="h6" style={{ marginRight: "1rem" }}>
                Feedback App
              </Typography>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Button variant="text" color="inherit">
                  Home
                </Button>
              </Link>
              <Link
                to="/admin"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="text" color="inherit">
                  Admin
                </Button>
              </Link>
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
