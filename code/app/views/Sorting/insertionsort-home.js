import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";

import InsertionSortTutorial from "./InsertionSort/InsertionSortTutorial";

const mapStateToProps = connect(state => {
  return state;
});

class InsertionSortHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="InsertionSortHome">
        <Grid>
          <Row>
            <Col>
              <InsertionSortTutorial />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(InsertionSortHome));
