import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCompletedFeedbackFunction,
  deleteFeedbackFunction,
  toggleFlagFunction,
} from "../store/actions";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@material-ui/core";
import { Flag, Delete } from "@material-ui/icons";

class Admin extends Component {
  componentDidMount() {
    this.props.getCompletedFeedback();
  }
  render() {
    return (
      <div>
        <h1>Admin</h1>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Feeling</TableCell>
                <TableCell>Understanding</TableCell>
                <TableCell>Support</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.feeling}</TableCell>
                  <TableCell>{row.understanding}</TableCell>
                  <TableCell>{row.support}</TableCell>
                  <TableCell>{row.comments}</TableCell>
                  <TableCell>
                    {this.props.isFetching ? (
                      <CircularProgress />
                    ) : (
                      <Flag
                        color={row.flagged ? "secondary" : "disabled"}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          this.props.toggleFlag(row.id);
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {this.props.isFetching ? (
                      <CircularProgress />
                    ) : (
                      <Delete
                        style={{ cursor: "pointer" }}
                        id={row.id}
                        onClick={() => {
                          this.props.deleteFeedback(row.id);
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { rows } = state.completedFeedback;
  const { isFetching } = state.completedFeedback;
  return { rows, isFetching };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompletedFeedback: getCompletedFeedbackFunction(dispatch),
    deleteFeedback: deleteFeedbackFunction(dispatch),
    toggleFlag: toggleFlagFunction(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
