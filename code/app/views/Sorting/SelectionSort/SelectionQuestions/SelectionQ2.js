import React, { Component } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
import { Glyphicon } from "react-bootstrap";

const mapStateToProps = connect(state => {
  return state;
});

export class SelectionQ2 extends Component {
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

  createRectangles() {
    var nums = ["10", "11", "34", "25", "17", "90", "89"];
    d3.select("#Q").remove();
    this.svgContainerQ = d3
      .select("div.SelectionQ")
      .append("svg")
      .attr("id", "Q")
      .attr("width", this.width)
      .attr("height", this.height);
    for (var i = 0; i < nums.length; i++) {
      this.numbers.push([
        this.svgContainerQ
          .append("rect")
          .attr("width", 50)
          .attr("height", 50)
          .attr("x", i * 60 + 40)
          .attr("y", 0)
          .style("fill", "white")
          .style("stroke", "black")
          .attr("number", nums[i]),
        this.svgContainerQ
          .append("text")
          .attr("x", i * 60 + 50)
          .attr("y", 25)
          .attr("dy", ".35em")
          .style("font-size", "25px")
          .text(nums[i])
      ]);
    }
  }

  checkAnswer() {
    this.checked = true;
    var nums = document
      .getElementById("answer")
      .value.trim()
      .split(/\D+/);
    if (
      (nums[0] == "34" && nums[1] == "17") ||
      (nums[0] == "17" && nums[1] == "34")
    ) {
      this.correct = true;
    } else {
      this.correct = false;
    }
    this.forceUpdate();
  }

  refresh() {
    this.checked = false;
    this.correct = false;
    this.numbers = [];
    this.createRectangles();
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <p>Which 2 numbers will be swapped first?</p>
        <div className="SelectionQ" />
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

export default mapStateToProps(SelectionQ2);
