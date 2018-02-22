import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as d3 from "d3";
import { Col, Grid, Row } from "react-bootstrap";

import Page1 from "./convexHullHtml/About.html";
import Page2 from "./convexHullHtml/Quick Facts.html";
import Page3 from "./convexHullHtml/Example.html";
import Page4 from "./convexHullHtml/Optimize.html";
import Page5 from "./convexHullHtml/Useful.html";

var About = { __html: Page1 };
var Facts = { __html: Page2 };
var Example = { __html: Page3 };
var Optimize = { __html: Page4 };
var Useful = { __html: Page5 };

const mapStateToProps = connect(state => {
  return state;
});

const delay = t =>
  new Promise((res, rej) => {
    setTimeout(res, t);
  });

class ConvexHull extends Component {
  initialState() {
    return {
      vars: {
        nums: [],
        upperHull: [],
        lowerHull: [],
        lines: [],
        i: 2
      },
      programState: [
        {
          text: <p>points = sorted(points)</p>,
          command: () => {
            this.sortnums();
          },
          active: false
        },
        {
          text: <p>upperHull = [points[1], points[0]]</p>,
          command: () => {
            this.assignHull(1, "upper");
          },
          active: false
        },
        {
          text: <p>for i in range(2, len(points)):</p>,
          command: () => {
            this.checkForLoopUpperHull();
          },
          active: false
        },
        {
          text: (
            <p style={{ marginLeft: 30 }}>upperHull.insert(0, points[i])</p>
          ),
          command: () => {
            this.pushNewLine(3, "upperHull");
          },
          active: false
        },
        {
          text: (
            <p style={{ marginLeft: 30 }}>
              while len(upperHull) > 2 and not clockwise(upperHull[:3]):
            </p>
          ),
          command: () => {
            this.checkWhileLoop(4, "upperHull", [5, 6, 4], [2], 1);
          },
          active: false
        },
        {
          text: (
            <p style={{ marginLeft: 60 }}>upperHull.remove(upperHull[1])</p>
          ),
          command: () => {
            this.colorPreviousLines(5);
          },
          active: false
        },
        {
          command: () => {
            this.removePreviousLines(5, "upperHull");
          },
          active: false
        },
        {
          text: <p>lowerHull = [points[-2], points[-1]]</p>,
          command: () => {
            this.assignHull(7, "lower");
          },
          active: false
        },
        {
          text: <p>for i in range(len(points) - 2, -1, -1):</p>,
          command: () => {
            this.checkForLoopLowerHull();
          },
          active: false
        },
        {
          text: (
            <p style={{ marginLeft: 30 }}>lowerHull.insert(0, points[i])</p>
          ),
          command: () => {
            this.pushNewLine(9, "lowerHull");
          },
          active: false
        },
        {
          text: (
            <p style={{ marginLeft: 30 }}>
              while len(lowerHull) > 2 and not clockwise(lowerHull[:3]):
            </p>
          ),
          command: () => {
            this.checkWhileLoop(10, "lowerHull", [11, 12, 10], [8], -1);
          },
          active: false
        },
        {
          text: (
            <p style={{ marginLeft: 60 }}>lowerHull.remove(lowerHull[1])</p>
          ),
          command: () => {
            this.colorPreviousLines(11);
          },
          active: false
        },
        {
          command: () => {
            this.removePreviousLines(11, "lowerHull");
          },
          active: false
        },
        {
          command: () => {
            this.updateActiveProgram(-1);
          },
          active: false
        }
      ],
      queue: [0, 1, 2]
    };
  }

  constructor(props) {
    super(props);
    this.height = 330;
    this.width = 600;
    this.tick = 1000;
    this.state = Object.assign({}, this.initialState());
  }

  updateActiveProgram(line) {
    let oldProgramState = Object.assign({}, this.state).programState;
    oldProgramState = oldProgramState.map(line => {
      line.active = false;
      return line;
    });

    if (line >= 0) {
      oldProgramState[line].active = true;
    }

    this.setState({ programState: oldProgramState });
  }

  updateQueue(item) {
    let { queue } = Object.assign({ queue: [] }, this.state);
    queue = queue.concat(item);
    this.setState({ queue });
  }

  startClock() {
    this.clock = setInterval(async () => {
      let { queue } = Object.assign({ queue: [] }, this.state);
      const taskName = queue.shift();
      const task = this.state.programState[taskName];
      if (typeof task === "undefined") {
        this.setState({ queue });
        return;
      }
      const command = task.hasOwnProperty("command") ? task.command : () => {};
      this.setState({ queue }, () => {
        command();
      });
    }, this.tick);
  }

  stopClock() {
    clearInterval(this.clock);
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    this.state.vars.nums.forEach(point => {
      this.svgContainer
        .append("circle")
        .attr("cx", point[0])
        .attr("cy", this.height - point[1])
        .attr("r", 5);
    });
  }

  clockwise(p1, p2, p3) {
    let [x1, y1] = p1,
      [x2, y2] = p2,
      [x3, y3] = p3;
    return (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) > 0;
  }

  placeLine(p1, p2, colour = "black") {
    let [x1, y1] = p1,
      [x2, y2] = p2;
    return this.svgContainer
      .append("line")
      .attr("x1", x1)
      .attr("y1", this.height - y1)
      .attr("x2", x2)
      .attr("y2", this.height - y2)
      .attr("stroke", colour)
      .attr("stroke-width", 3);
  }

  updatePreviousLine() {
    let vars = Object.assign({}, this.state).vars;
    vars.lines[vars.lines.length - 1].attr("stroke", "black");
    this.setState({ vars });
  }

  sortnums() {
    this.updateActiveProgram(0);
    let vars = Object.assign({}, this.state).vars;
    vars.nums.sort((a, b) => a[0] - b[0]);
    this.setState({ vars });
  }

  assignHull(active, upperlower) {
    this.updateActiveProgram(active);
    let nums = this.state.vars.nums;
    let { vars } = Object.assign({}, this.state);

    if (upperlower == "upper") {
      vars.upperHull = [nums[1], nums[0]];
      vars.lines.push(
        this.placeLine(vars.upperHull[0], vars.upperHull[1], "#1ee51b")
      );
    } else {
      vars.lowerHull = [nums[nums.length - 2], nums[nums.length - 1]];
      vars.lines.push(
        this.placeLine(vars.lowerHull[0], vars.lowerHull[1], "#1ee51b")
      );
    }
    this.setState({ vars });
  }

  checkForLoopUpperHull() {
    this.updateActiveProgram(2);
    this.updatePreviousLine();
    let { vars } = Object.assign({}, this.state);
    if (vars.i < vars.nums.length) {
      this.updateQueue([3, 4]);
    } else {
      vars.i = vars.nums.length - 3;
      this.updateQueue([7, 8]);
      this.setState({ vars });
    }
  }

  checkForLoopLowerHull() {
    this.updateActiveProgram(8);
    this.updatePreviousLine();
    let i = this.state.vars.i;
    if (i >= 0) {
      this.updateQueue([9, 10]);
    } else {
      this.updateQueue([13]);
    }
  }

  pushNewLine(active, key) {
    this.updateActiveProgram(active);
    let { vars } = Object.assign({}, this.state);
    let nums = vars.nums;
    let i = vars.i;

    vars[key].unshift(nums[i]);
    vars.lines.push(this.placeLine(vars[key][0], vars[key][1], "#1ee51b"));

    this.setState({ vars });
  }

  checkWhileLoop(active, key, next1, next2, j) {
    this.updateActiveProgram(active);
    this.updatePreviousLine();
    let { vars } = Object.assign({}, this.state);
    if (
      vars[key].length > 2 &&
      !this.clockwise(vars[key][0], vars[key][1], vars[key][2])
    ) {
      this.updateQueue(next1);
    } else {
      vars.i += j;
      this.updateQueue(next2);
    }

    this.setState({ vars });
  }

  colorPreviousLines(active) {
    this.updateActiveProgram(active);
    let { vars } = Object.assign({}, this.state);
    vars.lines[vars.lines.length - 1].attr("stroke", "red");
    vars.lines[vars.lines.length - 2].attr("stroke", "red");
    this.setState({ vars });
  }

  removePreviousLines(active, key) {
    this.updateActiveProgram(active);
    let { vars } = Object.assign({}, this.state);

    vars[key].splice(1, 1);
    vars.lines[vars.lines.length - 1].remove();
    vars.lines.pop();
    vars.lines[vars.lines.length - 1].remove();
    vars.lines.pop();
    vars.lines.push(this.placeLine(vars[key][0], vars[key][1], "#1ee51b"));

    this.setState({ vars });
  }

  refresh() {
    this.stopClock();
    this.setState(this.initialState());
    this.tick = 1000;

    d3.select("svg").remove();
    this.svgContainer = d3
      .select("div.convex")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .on("click", () => {
        this.placePoint(d3.mouse(this.svgContainer.node()));
      });

    this.placeLine([0, 0], [0, this.height]);
    this.placeLine([0, 0], [this.width, 0]);
    this.placeLine([0, this.height], [this.width, this.height]);
    this.placeLine([this.width, 0], [this.width, this.height]);
  }

  placePoint(point) {
    var vars = Object.assign({}, this.state.vars);

    vars.nums.push([point[0], this.height - point[1]]);

    this.setState({ vars });
  }

  slow() {
    this.tick *= 2;
    this.stopClock();
    this.startClock();
  }

  fast() {
    this.tick /= 2;
    this.stopClock();
    this.startClock();
  }

  render() {
    return (
      <div className="ConvexHull">
        <Grid>
          <Row>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={About} />
            </Col>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={Facts} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="content button-center">
                <br />
                <p>Please place coordinates inside box</p>
                <br />
                <div className="box">
                  <div className="convex" />
                  <div className="text">
                    {this.state.programState.map((line, i) => {
                      return (
                        <div
                          key={i}
                          style={{
                            backgroundColor: line.active
                              ? "#1ee51b"
                              : "transparent"
                          }}
                        >
                          {line.text}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <br />
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
                    this.startClock();
                  }}
                >
                  Run
                </button>
                <button
                  className="button  "
                  onClick={() => {
                    this.stopClock();
                  }}
                >
                  Pause
                </button>
                <button
                  className="button  "
                  onClick={() => {
                    this.fast();
                  }}
                >
                  Faster
                </button>
                <button
                  className="button  "
                  onClick={() => {
                    this.slow();
                  }}
                >
                  Slower
                </button>
                <br />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={Example} />
            </Col>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={Optimize} />
            </Col>
            <Col md={6}>
              <div className="content" dangerouslySetInnerHTML={Useful} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(ConvexHull));
