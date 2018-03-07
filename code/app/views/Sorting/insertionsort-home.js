import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";
import { Glyphicon } from "react-bootstrap";

import InsertionSortTutorial from "./InsertionSort/InsertionSortTutorial";

import Page1 from "./InsertionSort/InsertionSortHtml/About.html";
import Page2 from "./InsertionSort/InsertionSortHtml/QuickFacts.html";
import Page3 from "./InsertionSort/InsertionSortHtml/Example.html";
import Page4 from "./InsertionSort/InsertionSortHtml/Optimize.html";
import Page5 from "./InsertionSort/InsertionSortHtml/Useful.html";
import Page6 from "./InsertionSort/InsertionSortHtml/Key.html";

import InsertionQ1 from "./InsertionSort/InsertionSortQuestions/InsertionQ1";
import InsertionQ2 from "./InsertionSort/InsertionSortQuestions/InsertionQ2";
import InsertionQ3 from "./InsertionSort/InsertionSortQuestions/InsertionQ3";
import InsertionQ4 from "./InsertionSort/InsertionSortQuestions/InsertionQ4";

var About = { __html: Page1 };
var QuickFacts = { __html: Page2 };
var Example = { __html: Page3 };
var Optimize = { __html: Page4 };
var Useful = { __html: Page5 };
var Key = { __html: Page6 };

const mapStateToProps = connect(state => {
  return state;
});

class InsertionSortHome extends Component {
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
      <div className="InsertionSortHome">
        <Grid>
          <Row>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={About} />
              <div className="content" dangerouslySetInnerHTML={Key} />
            </Col>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={QuickFacts} />
            </Col>
          </Row>
          <Row>
            <Col>
              <InsertionSortTutorial />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={Example} />
            </Col>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={Useful} />
            </Col>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={Optimize} />
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
                {this.question == 0 && <InsertionQ1 className="Questions" />}
                {this.question == 1 && <InsertionQ2 className="Questions" />}
                {this.question == 2 && <InsertionQ3 className="Questions" />}
                {this.question == 3 && <InsertionQ4 className="Questions" />}
                <br />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(InsertionSortHome));
