import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";

import Page1 from "./computGeometryHtml/About.html";
import Page2 from "./computGeometryHtml/Types.html";

var About = { __html: Page1 };
var Types = { __html: Page2 };

const mapStateToProps = connect(state => {
  return state;
});

export class ComputGeometryHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col>
              <div className="content" dangerouslySetInnerHTML={About} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="content" dangerouslySetInnerHTML={Types} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default mapStateToProps(withRouter(ComputGeometryHome));
