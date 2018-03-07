import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";
import { Glyphicon } from "react-bootstrap";

import BipartiteTutorial from "./BipartiteMatching/BipartiteTutorial";

import Page1 from "./BipartiteMatching/bipartiteMatchingHtml/About.html";
import Page2 from "./BipartiteMatching/bipartiteMatchingHtml/Quick_Facts.html";
import Page3 from "./BipartiteMatching/bipartiteMatchingHtml/AnimationKey.html";
import Page4 from "./BipartiteMatching/bipartiteMatchingHtml/code.html";
import Page5 from "./BipartiteMatching/bipartiteMatchingHtml/Useful.html";

import BipartiteQ1 from "./BipartiteMatching/BipartiteQuestions/BipartiteQ1";

var About = { __html: Page1 };
var Facts = { __html: Page2 };
var Key = { __html: Page3 };
var Code = { __html: Page4 };
var Useful = { __html: Page5 };

const mapStateToProps = connect(state => {
  return state;
});

class BipartiteMatching extends Component {
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
      <div className="BipartiteMatching">
        <Grid>
          <Row>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={About} />
              <div className="content" dangerouslySetInnerHTML={Key} />
            </Col>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={Facts} />
              <div className="content" dangerouslySetInnerHTML={Useful} />
            </Col>
          </Row>
          <Row>
            <Col>
              <BipartiteTutorial />
            </Col>
          </Row>
          <div className="content" dangerouslySetInnerHTML={Code} />
          <Row>
            <Col>
              <div className="content button-center">
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
                {this.question == 0 && <BipartiteQ1 className="Questions" />}
                {this.question == 1 && <BipartiteQ1 className="Questions" />}
                {this.question == 2 && <BipartiteQ1 className="Questions" />}
                {this.question == 3 && <BipartiteQ1 className="Questions" />}
                <br />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(BipartiteMatching));
