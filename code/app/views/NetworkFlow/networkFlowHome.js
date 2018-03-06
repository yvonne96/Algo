import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";

const mapStateToProps = connect(state => {
  return state;
});

export class NetworkFlowHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>Network Flow</p>
      </div>
    );
  }
}
export default mapStateToProps(withRouter(NetworkFlowHome));
