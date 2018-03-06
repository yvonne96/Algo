import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";

import BipartiteTutorial from "./BipartiteMatching/BipartiteTutorial";

const mapStateToProps = connect(state => {
  return state;
});

class BipartiteMatching extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="BipartiteMatching">
        <Grid>
          <Row>
            <Col>
              <BipartiteTutorial />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(BipartiteMatching));
