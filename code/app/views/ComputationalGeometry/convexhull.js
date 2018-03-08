import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Glyphicon, Grid, Row } from "react-bootstrap";
import ConvexQ1 from "./ConvexHull/ConvexHullQuestions/ConvexQ1";
import ConvexQ2 from "./ConvexHull/ConvexHullQuestions/ConvexQ2";
import ConvexQ3 from "./ConvexHull/ConvexHullQuestions/ConvexQ3";
import ConvexQ4 from "./ConvexHull/ConvexHullQuestions/ConvexQ4";

import ConvexTutorial from "./ConvexHull/convexHullTutorial";

import Page1 from "./ConvexHull/convexHullHtml/About.html";
import Page2 from "./ConvexHull/convexHullHtml/Quick Facts.html";
import Page3 from "./ConvexHull/convexHullHtml/Useful.html";
import Page4 from "./ConvexHull/convexHullHtml/Code.html";

var About = { __html: Page1 };
var Facts = { __html: Page2 };
var Useful = { __html: Page3 };
var Code = { __html: Page4 };

const mapStateToProps = connect(state => {
  return state;
});

class ConvexHull extends Component {
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
      <div className="ConvexHull">
        <Grid>
          <Row>
            <Col md={7}>
              <div className="content" dangerouslySetInnerHTML={About} />
            </Col>
            <Col md={5}>
              <div className="content" dangerouslySetInnerHTML={Facts} />
            </Col>
          </Row>
          <Row>
            <Col>
              <ConvexTutorial />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="content" dangerouslySetInnerHTML={Useful} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="content" dangerouslySetInnerHTML={Code} />
            </Col>
          </Row>
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
                {this.question == 0 && <ConvexQ1 className="Questions" />}
                {this.question == 1 && <ConvexQ2 className="Questions" />}
                {this.question == 2 && <ConvexQ3 className="Questions" />}
                {this.question == 3 && <ConvexQ4 className="Questions" />}
                <br />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(ConvexHull));
