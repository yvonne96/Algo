import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";
import { Glyphicon } from "react-bootstrap";

import BubbleSortTutorial from "./BubbleSort/BubbleSortTutorial";

import Page1 from "./BubbleSort/bubbleHtml/bubbleAbout.html";
import Page2 from "./BubbleSort/bubbleHtml/bubbleQuickFacts.html";
import Page3 from "./BubbleSort/bubbleHtml/bubbleExample.html";
import Page4 from "./BubbleSort/bubbleHtml/bubbleOptimize.html";
import Page5 from "./BubbleSort/bubbleHtml/bubbleUseful.html";

import BubbleQ1 from "./BubbleSort/BubbleSortQuestions/BubbleQ1";
import BubbleQ2 from "./BubbleSort/BubbleSortQuestions/BubbleQ2";
import BubbleQ3 from "./BubbleSort/BubbleSortQuestions/BubbleQ3";
import BubbleQ4 from "./BubbleSort/BubbleSortQuestions/BubbleQ4";

var About = { __html: Page1 };
var QuickFacts = { __html: Page2 };
var Example = { __html: Page3 };
var Optimize = { __html: Page4 };
var Useful = { __html: Page5 };

const mapStateToProps = connect(state => {
  return state;
});

export class BubbleSortHome extends Component {
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
      <div className="BubbleSortHome">
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
              <BubbleSortTutorial />
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
                {this.question == 0 && <BubbleQ1 className="Questions" />}
                {this.question == 1 && <BubbleQ2 className="Questions" />}
                {this.question == 2 && <BubbleQ3 className="Questions" />}
                {this.question == 3 && <BubbleQ4 className="Questions" />}
                <br />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(BubbleSortHome));
