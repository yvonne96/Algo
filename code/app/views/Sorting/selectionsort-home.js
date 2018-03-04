import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";

import SelectionSortTutorial from "./SelectionSort/SelectionSortTutorial";

const mapStateToProps = connect(state => {
  return state;
});

class SelectionSortHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="SelectionSortHome">
        <Grid>
          <Row>
            <Col>
              <SelectionSortTutorial />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(SelectionSortHome));
