import React, { Component } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
import { Glyphicon } from "react-bootstrap";

const mapStateToProps = connect(state => {
  return state;
});

export class BipartiteQ1 extends Component {
  constructor(props) {
    super(props);
    this.height = 70;
    this.width = 500;
    this.numbers = [];
    this.checked = false;
    this.correct = false;
  }

  componentDidMount() {
    this.refresh();
  }

  placePoints() {
    for (var i = 0; i < 5; i++) {
      this.svgQ
        .append("circle")
        .attr("cx", 420)
        .attr("cy", i * 80 + 50)
        .attr("r", 8)
        .attr("matched", false);
    }
    for (var i = 0; i < 5; i++) {
      this.svgQ
        .append("circle")
        .attr("cx", 670)
        .attr("cy", i * 80 + 50)
        .attr("r", 8)
        .attr("matched", false);
    }
  }

  placeEdges() {
    var edges = [
      [0, 5],
      [0, 7],
      [1, 5],
      [2, 6],
      [2, 8],
      [3, 6],
      [3, 9],
      [4, 9]
    ];
    for (var i = 0; i < 10; i++) {
      this.network[i] = [];
    }
    for (var i = 0; i < edges.length; i++) {
      var x1 = this.points[edges[i][0]].attr("cx");
      var y1 = this.points[edges[i][0]].attr("cy");
      var x2 = this.points[edges[i][1]].attr("cx");
      var y2 = this.points[edges[i][1]].attr("cy");
      var tmp = this.svgQ
        .append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("u", edges[i][0])
        .attr("v", edges[i][1])
        .attr("matched", false);
      this.edges.push(tmp);
      this.network[edges[i][0]].push(tmp);
      this.network[edges[i][1]].push(tmp);
    }
  }

  checkAnswer() {
    this.checked = true;
    if (document.getElementById("answer").value == "5") {
      this.correct = true;
    }
    this.forceUpdate();
  }

  refresh() {
    this.checked = false;
    this.correct = false;
    d3.select("#Q").remove();
    this.svgQ = d3
      .select("div.BipartiteQ")
      .append("svg")
      .attr("id", "Q")
      .attr("width", this.width)
      .attr("height", this.height);
    this.placePoints();
    this.placeEdges();
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

export default mapStateToProps(BipartiteQ1);
