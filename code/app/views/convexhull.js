import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as d3 from "d3";

const mapStateToProps = connect(state => {
  return state;
});

const delay = t =>
  new Promise((res, rej) => {
    setTimeout(res, t);
  });

class ConvexHull extends Component {
  static intialState() {
    return {
      vars: {
        nums: []
      },
      programState: [
        {
          text: "points = sorted(points)",
          command: () => {},
          active: false
        },
        {
          text: "lowerHull = [points[0], points[1]]",
          active: false
        },
        {
          text: "upperHull = [points[-1], points[-2]]",
          active: false
        }
      ],
      queue: [0, 1, 1, 2, 3]
    };
  }
  constructor(props) {
    super(props);
    this.height = 500;
    this.width = 800;

    this.state = Object.assign({}, ConvexHull.intialState());
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

  startClock() {
    this.clock = setInterval(() => {
      // Proc this.queue item
    }, 1000);
  }

  stopClock() {
    clearInterval(this.clock);
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    console.log(this.state);

    this.state.vars.nums.forEach(point => {
      this.svgContainer
        .append("circle")
        .attr("cx", point[0])
        .attr("cy", point[1])
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

  async convexHull() {
    let nums = this.state.vars.nums.map(point => {
      return [point[0], this.height - point[1]];
    });
    nums.sort((a, b) => a[0] - b[0]);
    this.updateActiveProgram(0);
    await delay(4000);
    var upperHull = [nums[1], nums[0]];
    var lowerHull = [nums[nums.length - 2], nums[nums.length - 1]];
    var lines = [];

    lines.push(this.placeLine(upperHull[0], upperHull[1]));
    for (var i = 2; i < nums.length; i++) {
      upperHull.unshift(nums[i]);
      lines.push(this.placeLine(upperHull[0], upperHull[1]));
      lines[lines.length - 1].attr("stroke", "#1ee51b");
      await delay(1000);
      lines[lines.length - 1].attr("stroke", "black");
      while (
        upperHull.length > 2 &&
        !this.clockwise(upperHull[0], upperHull[1], upperHull[2])
      ) {
        upperHull.splice(1, 1);
        lines[lines.length - 1].attr("stroke", "red");
        lines[lines.length - 2].attr("stroke", "red");
        await delay(500);
        lines[lines.length - 1].remove();
        lines.pop();
        await delay(500);
        lines[lines.length - 1].remove();
        lines.pop();
        await delay(500);
        lines.push(this.placeLine(upperHull[0], upperHull[1]));
        lines[lines.length - 1].attr("stroke", "#1ee51b");
        await delay(1000);
        lines[lines.length - 1].attr("stroke", "black");
      }
    }
    lines = [];
    lines.push(this.placeLine(lowerHull[0], lowerHull[1]));
    for (var i = nums.length - 3; i >= 0; i--) {
      lowerHull.unshift(nums[i]);
      lines.push(this.placeLine(lowerHull[0], lowerHull[1]));
      lines[lines.length - 1].attr("stroke", "#1ee51b");
      await delay(1000);
      lines[lines.length - 1].attr("stroke", "black");
      while (
        lowerHull.length > 2 &&
        !this.clockwise(lowerHull[0], lowerHull[1], lowerHull[2])
      ) {
        lowerHull.splice(1, 1);
        lines[lines.length - 1].attr("stroke", "red");
        lines[lines.length - 2].attr("stroke", "red");
        await delay(500);
        lines[lines.length - 1].remove();
        lines.pop();
        await delay(500);
        lines[lines.length - 1].remove();
        lines.pop();
        await delay(500);
        lines.push(this.placeLine(lowerHull[0], lowerHull[1]));
        lines[lines.length - 1].attr("stroke", "#1ee51b");
        await delay(1000);
        lines[lines.length - 1].attr("stroke", "black");
      }
    }
  }

  addText(line, indent, n) {
    return this.textContainer
      .append("div")
      .attr("dy", ".35em")
      .style("font-size", "20px")
      .text(line);
  }

  refresh() {
    this.setState(ConvexHull.intialState());
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

    vars.nums.push([point[0], point[1]]);

    this.setState({ vars });
  }

  render() {
    return (
      <div className="ConvexHull">
        <div className="content button-center">
          <div className="separator" />
          <p>Please place coordinates inside box</p>
          <div className="separator" />
          <div className="box">
            <div className="convex" />
            <div className="text">
              {this.state.programState.map(line => {
                return (
                  <div
                    style={{
                      backgroundColor: line.active ? "#1ee51b" : "transparent"
                    }}
                  >
                    {line.text}
                  </div>
                );
              })}
            </div>
          </div>
          <button
            className="button"
            onClick={() => {
              this.refresh();
            }}
          >
            Refresh
          </button>
          <button
            className="button"
            onClick={() => {
              this.convexHull();
            }}
          >
            Run
          </button>
          <button
            className="button  "
            onClick={() => {
              this.pause = true;
            }}
          >
            Pause
          </button>
          <div className="separator" />
        </div>
      </div>
    );
  }
}

export default mapStateToProps(withRouter(ConvexHull));
