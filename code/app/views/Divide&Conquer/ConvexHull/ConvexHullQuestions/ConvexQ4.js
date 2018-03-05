import React, { Component } from "react";
import { connect } from "react-redux";
import * as convex from "./ConvexFunctions";
import * as d3 from "d3";

const mapStateToProps = connect(state => {
  return state;
});

class ConvexQ1 extends Component {
  constructor(props) {
    super(props);
    this.height = 330;
    this.width = 1000;
    this.nums = [];
    this.checked = false;
    this.correct = false;
  }

  componentDidMount() {
    this.refresh();
  }

  checkAnswer() {
    this.checked = true;
    if (document.getElementById("nums").value == "5") {
      this.correct = true;
    }
    this.forceUpdate();
  }

  placeLine(p1, p2, colour = "black") {
    let [x1, y1] = p1,
      [x2, y2] = p2;
    this.svgContainerQ
      .append("line")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("stroke", colour)
      .attr("stroke-width", 3);
  }

  drawPolygon() {
    let p1 = [400, 100],
      p2 = [450, 200],
      p3 = [600, 50],
      p4 = [250, 220],
      p5 = [470, 170],
      svg = this.svgContainerQ,
      nums = this.nums,
      height = this.height;
    convex.placePoint(svg, nums, p1, height);
    svg
      .append("text")
      .attr("x", 245)
      .attr("y", 240)
      .attr("dy", ".35em")
      .style("font-size", "20px")
      .text("1");
    svg
      .append("text")
      .attr("x", 395)
      .attr("y", 120)
      .attr("dy", ".35em")
      .style("font-size", "20px")
      .text("2");
    svg
      .append("text")
      .attr("x", 595)
      .attr("y", 70)
      .attr("dy", ".35em")
      .style("font-size", "20px")
      .text("3");
    svg
      .append("text")
      .attr("x", 455)
      .attr("y", 220)
      .attr("dy", ".35em")
      .style("font-size", "20px")
      .text("4");
    svg
      .append("text")
      .attr("x", 465)
      .attr("y", 195)
      .attr("dy", ".35em")
      .style("font-size", "20px")
      .text("5");
    convex.placePoint(svg, nums, p2, height);
    convex.placePoint(svg, nums, p3, height);
    convex.placePoint(svg, nums, p4, height);
    convex.placePoint(svg, nums, p5, height);
    this.placeLine(p4, p1);
    this.placeLine(p1, p3);
    this.placeLine(p4, p2);
    this.placeLine(p5, p2);
    this.placeLine(p3, p5);
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
      .attr("height", this.height);
    this.drawPolygon();
    convex.drawBorder(this.svgContainerQ, this.height, this.width);
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <p>Which point should not be included in the hull?</p>
        <div className="ConvexQ" />
        <br />
        {this.checked &&
          this.correct && <p style={{ color: "green" }}>Correct!</p>}
        {this.checked &&
          !this.correct && (
            <p style={{ color: "red" }}>Incorrect please try again</p>
          )}
        <form>
          Please enter your answer:
          <input type="text" id="nums" />
        </form>
        <button
          className="button"
          onClick={() => {
            this.refresh();
          }}
        >
          Reset
        </button>
        <button
          className="button"
          onClick={() => {
            this.checkAnswer();
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default mapStateToProps(ConvexQ1);
