import React, { Component } from "react";
import { connect } from "react-redux";
import * as convex from "./ConvexFunctions";
import * as d3 from "d3";
import { Glyphicon } from "react-bootstrap";

const mapStateToProps = connect(state => {
  return state;
});

export class ConvexQ3 extends Component {
  constructor(props) {
    super(props);
    this.height = 330;
    this.width = 1000;
    this.nums = [];
    this.checked = false;
    this.correct = false;
    this.refresh = this.refresh.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  checkAnswer() {
    this.checked = true;
    let [upperHull, lowerHull] = convex.upperLowerHull(this.nums);
    convex.drawHull(this.svgContainerQ, upperHull, lowerHull, this.height);
    if (3 == upperHull.length) {
      this.correct = true;
    } else {
      this.correct = false;
    }
    this.forceUpdate();
  }

  refresh() {
    this.checked = false;
    this.correct = false;
    this.nums = [];
    d3.select("#Q").remove();
    this.svgContainerQ = d3
      .select("div.ConvexQ")
      .append("svg")
      .attr("id", "Q")
      .attr("width", this.width)
      .attr("height", this.height)
      .on("click", () => {
        convex.placePoint(
          this.svgContainerQ,
          this.nums,
          d3.mouse(this.svgContainerQ.node()),
          this.height
        );
      });

    convex.drawBorder(this.svgContainerQ, this.height, this.width);
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <p>Place points so there are 3 points on the Upper Hull</p>
        <div className="ConvexQ" />
        <br />
        {this.checked &&
          this.correct && <p style={{ color: "green" }}>Correct!</p>}
        {this.checked &&
          !this.correct && (
            <p style={{ color: "red" }}>Incorrect please try again</p>
          )}
        <button
          id="refreshBtn"
          className="button refreshBtn"
          onClick={() => {
            this.refresh();
          }}
        >
          <Glyphicon glyph="refresh">Refresh</Glyphicon>
        </button>
        <button
          id="submitBtn"
          className="button playBtn"
          onClick={() => {
            this.checkAnswer();
          }}
        >
          <Glyphicon glyph="save">Submit</Glyphicon>
        </button>
      </div>
    );
  }
}

export default mapStateToProps(ConvexQ3);
