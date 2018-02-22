import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";

import Page1 from "./divideConquerHtml/About.html";
import Page2 from "./divideConquerHtml/Advantages.html";
import Page3 from "./divideConquerHtml/comparisons.html";

var About = { __html: Page1 };
var Advantages = { __html: Page2 };
var comparingAlgo = { __html: Page3 };

const mapStateToProps = connect(state => {
  return state;
});

class DivideConquerHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="SortingHome">
        <Grid>
          <Row>
            <Col md={4}>
              <div className="content" dangerouslySetInnerHTML={About} />
            </Col>
            <Col md={8}>
              <div className="content" dangerouslySetInnerHTML={Advantages} />
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
export default mapStateToProps(withRouter(DivideConquerHome));
