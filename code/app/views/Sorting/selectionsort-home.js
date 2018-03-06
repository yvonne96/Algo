import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";
import { Glyphicon } from "react-bootstrap";

import SelectionSortTutorial from "./SelectionSort/SelectionSortTutorial";

import Page1 from "./SelectionSort/selectionSortHtml/About.html";
import Page2 from "./SelectionSort/selectionSortHtml/QuickFacts.html";
import Page3 from "./SelectionSort/selectionSortHtml/Example.html";
import Page4 from "./SelectionSort/selectionSortHtml/AnimationKey.html";
import Page5 from "./SelectionSort/selectionSortHtml/Useful.html";

import SelectionQ1 from "./SelectionSort/SelectionQuestions/SelectionQ1";

var About = { __html: Page1 };
var QuickFacts = { __html: Page2 };
var Example = { __html: Page3 };
var Key = { __html: Page4 };
var Useful = { __html: Page5 };

const mapStateToProps = connect(state => {
  return state;
});

class SelectionSortHome extends Component {
  constructor(props) {
    super(props);
    this.question = 0;
  }

  updateQuestion(n) {
    this.question += n;
    this.forceUpdate();
  }

  render() {
    return (
      <div className="SelectionSortHome">
        <Grid>
          <Row>
            <Col md={8}>
              <div className="content" dangerouslySetInnerHTML={About} />
              <div className="content" dangerouslySetInnerHTML={Key} />
            </Col>
            <Col md={4}>
              <div className="content" dangerouslySetInnerHTML={QuickFacts} />
            </Col>
          </Row>
          <Row>
            <Col>
              <SelectionSortTutorial />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={Example} />
            </Col>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={Useful} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="content button-center">
                <h2>Questions</h2>
                <br />
                {this.question > 0 && (
                  <button
                    className="button fastSlowBtn"
                    onClick={() => {
                      this.updateQuestion(-1);
                    }}
                  >
                    <Glyphicon glyph="step-backward">Prev</Glyphicon>
                  </button>
                )}
                {this.question < 3 && (
                  <button
                    id="nextBtn"
                    className="button fastSlowBtn"
                    onClick={() => {
                      this.updateQuestion(1);
                    }}
                  >
                    <Glyphicon glyph="step-forward">Next</Glyphicon>
                  </button>
                )}
                <br />
                {this.question == 0 && <SelectionQ1 className="Questions" />}
                {this.question == 1 && <SelectionQ1 className="Questions" />}
                {this.question == 2 && <SelectionQ1 className="Questions" />}
                {this.question == 3 && <SelectionQ1 className="Questions" />}
                <br />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(SelectionSortHome));
