import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";

import Page1 from "./SortingHomeHtml/SortingAbout.html";
import Page2 from "./SortingHomeHtml/Types.html";
import Page3 from "./SortingHomeHtml/ComparingAlgorithms.html";

var sortAbout = { __html: Page1 };
var types = { __html: Page2 };
var comparingAlgo = { __html: Page3 };

const mapStateToProps = connect(state => {
  return state;
});

export class SortingHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="SortingHome">
        <Grid>
          <Row>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={sortAbout} />
            </Col>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={types} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                className="content"
                dangerouslySetInnerHTML={comparingAlgo}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default mapStateToProps(withRouter(SortingHome));
