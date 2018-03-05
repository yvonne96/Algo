import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";

import SelectionSortTutorial from "./SelectionSort/SelectionSortTutorial";

import Page1 from "./SelectionSort/selectionSortHtml/About.html";
import Page2 from "./SelectionSort/selectionSortHtml/QuickFacts.html";
import Page3 from "./SelectionSort/selectionSortHtml/Example.html";
import Page4 from "./SelectionSort/selectionSortHtml/Optimize.html";
import Page5 from "./SelectionSort/selectionSortHtml/Useful.html";

var About = { __html: Page1 };
var QuickFacts = { __html: Page2 };
var Example = { __html: Page3 };
var Optimize = { __html: Page4 };
var Useful = { __html: Page5 };

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
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={About} />
            </Col>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={QuickFacts} />
            </Col>
          </Row>
          <Row>
            <Col>
              <SelectionSortTutorial />
            </Col>
          </Row>
          <Row>
            <Col md={7}>
              <div className="content" dangerouslySetInnerHTML={Optimize} />
            </Col>
            <Col md={5}>
              <div className="content" dangerouslySetInnerHTML={Useful} />
            </Col>
            <Col md={5}>
              <div className="content" dangerouslySetInnerHTML={Example} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(SelectionSortHome));
