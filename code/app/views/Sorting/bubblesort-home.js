import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";
var d3 = require("d3");

import Page1 from "./bubbleHtml/bubbleAbout.html";
import Page2 from "./bubbleHtml/bubbleQuickFacts.html";
import Page3 from "./bubbleHtml/bubbleExample.html";
import Page4 from "./bubbleHtml/bubbleOptimize.html";
import Page5 from "./bubbleHtml/bubbleUseful.html";

var About = { __html: Page1 };
var QuickFacts = { __html: Page2 };
var Example = { __html: Page3 };
var Optimize = { __html: Page4 };
var Useful = { __html: Page5 };

const mapStateToProps = connect(state => {
  return state;
});

let delay = t => {
  return new Promise((res, rej) => {
    setTimeout(res, t);
  });
};

class BubbleSortHome extends Component {
  constructor(props) {
    super(props);
    this.pause = false;
  }

  createRectangles() {
    var nums = document.getElementById("nums").value.split(/\D+/);
    this.numbers = [];
    d3.select("svg").remove();
    var svgContainer = d3
      .select("div.bubble")
      .append("svg")
      .attr("width", 1200)
      .attr("height", 100);
    for (var i = 0; i < nums.length; i++) {
      this.numbers.push([
        svgContainer
          .append("rect")
          .attr("width", 50)
          .attr("height", 50)
          .attr("x", i * 60 + 40)
          .attr("y", 0)
          .style("fill", "white")
          .style("stroke", "black")
          .attr("number", nums[i]),
        svgContainer
          .append("text")
          .attr("x", i * 60 + 55)
          .attr("y", 25)
          .attr("dy", ".35em")
          .style("font-size", "34px")
          .text(nums[i])
      ]);
    }
    {
      this.bubbleSort();
    }
  }

  swap(box1, box2) {
    box1
      .transition()
      .attr("x", box2.attr("x"))
      .duration(1000);

    box2
      .transition()
      .attr("x", box1.attr("x"))
      .duration(1000);
  }

  fill(box1, colour) {
    box1
      .transition()
      .style("fill", colour)
      .duration(500);
  }

  async bubbleSort() {
    this.pause = true;
    var numbers = this.numbers;
    var tmp = true;
    while (tmp) {
      tmp = false;
      for (var i = 0; i < numbers.length - 1; i++) {
        while (this.pause) {
          await delay(1000);
        }
        this.fill(numbers[i][0], "grey");
        this.fill(numbers[i + 1][0], "grey");
        await delay(500);
        if (
          Number(numbers[i][0].attr("number")) >
          Number(numbers[i + 1][0].attr("number"))
        ) {
          this.swap(numbers[i][0], numbers[i + 1][0]);
          this.swap(numbers[i][1], numbers[i + 1][1]);
          await delay(1000);
          var num1 = numbers[i][0];
          numbers[i][0] = numbers[i + 1][0];
          numbers[i + 1][0] = num1;
          var num2 = numbers[i][1];
          numbers[i][1] = numbers[i + 1][1];
          numbers[i + 1][1] = num2;
          tmp = true;
        }
        this.fill(numbers[i][0], "white");
        this.fill(numbers[i + 1][0], "white");
        await delay(1000);
      }
    }
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
              <div className="content button-center">
                <h2>Try It Yourself</h2>
                <br />
                <form>
                  Please enter up to 10 numbers to be sorted:
                  <input type="text" id="nums" />
                </form>
                <br />
                <div className="bubble" />
                <button
                  className="button"
                  onClick={() => {
                    this.createRectangles();
                  }}
                >
                  Create List
                </button>
                <button
                  className="button"
                  onClick={() => {
                    this.pause = false;
                  }}
                >
                  Sort
                </button>
                <button
                  className="button  "
                  onClick={() => {
                    this.pause = true;
                  }}
                >
                  Pause
                </button>
                <br />
              </div>
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
        </Grid>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(BubbleSortHome));
