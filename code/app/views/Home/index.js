import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";
var ReactDOM = require("react-dom");

import Page1 from "./About.html";
import Page2 from "./AlgorithmImportance.html";
import Page3 from "./Features.html";

var About = { __html: Page1 };
var algoImportance = { __html: Page2 };
var features = { __html: Page3 };

//import d3 from 'd3';
//import ReactFauxDOM from 'react-faux-dom'

const mapStateToProps = connect(state => {
  return state;
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Home">
        <Grid>
          <Row className="show-grid">
            <Col md={8}>
              <div className="content" dangerouslySetInnerHTML={About} />
              <div
                className="content"
                dangerouslySetInnerHTML={algoImportance}
              />
            </Col>
            <Col md={4}>
              <div className="content" dangerouslySetInnerHTML={features} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(Home));
