import React, { Component } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
import * as bipartite from "./BipartiteFunctions";
import { Glyphicon } from "react-bootstrap";

const mapStateToProps = connect(state => {
  return state;
});

export class BipartiteQ4 extends Component {
  constructor(props) {
    super(props);
    this.height = 400;
    this.width = 1100;
    this.points = [];
    this.checked = false;
    this.correct = false;
  }

  componentDidMount() {
    this.refresh();
  }

  checkAnswer() {
    this.checked = true;
    if (document.getElementById("answer").value == "4") {
      this.correct = true;
    } else {
      this.correct = false;
    }
    this.forceUpdate();
  }

  refresh() {
    this.checked = false;
    this.correct = false;
    var edges = [
      [0, 5],
      [0, 7],
      [1, 5],
      [2, 6],
      [2, 7],
      [3, 6],
      [3, 9],
      [4, 9]
    ];
    d3.select("#Q").remove();
    this.svgQ = d3
      .select("div.BipartiteQ")
      .append("svg")
      .attr("id", "Q")
      .attr("width", this.width)
      .attr("height", this.height);
    var points = bipartite.placePoints(this.svgQ);
    bipartite.placeEdges(points, edges, this.svgQ);
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <p>What is the maximum matching on this graph?</p>
        <div className="BipartiteQ" />
        <br />
        {this.checked &&
          this.correct && <p style={{ color: "green" }}>Correct!</p>}
        {this.checked &&
          !this.correct && (
            <p style={{ color: "red" }}>Incorrect please try again</p>
          )}
        <form>
          Please enter your answer:
          <input type="text" id="answer" />
        </form>
        <button
          id="refreshBtn"
          className="button refreshBtn"
          onClick={() => {
            this.refresh();
          }}
        >
          <Glyphicon glyph="refresh">Reset</Glyphicon>
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

export default mapStateToProps(BipartiteQ4);
