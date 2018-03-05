import React, { Component } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
import Glyphicon from "react-bootstrap/es/Glyphicon";

const mapStateToProps = connect(state => {
  return state;
});

let delay = t => {
  return new Promise((res, rej) => {
    setTimeout(res, t);
  });
};

class BubbleSortTutorial extends Component {
  initialState() {
    return {
      vars: {
        sorted: true,
        i: 0,
        numbers: []
      },
      programState: [
        {
          text: <p>while not sorted:</p>,
          command: () => {
            this.checkSorted();
          },
          active: false
        },
        {
          text: <p style={{ marginLeft: 30 }}>for i in range(len(l) - 1):</p>,
          command: () => {
            this.checkForLoop();
          },
          active: false
        },
        {
          text: <p style={{ marginLeft: 60 }}>if l[i] > l[i + 1]:</p>,
          command: () => {
            this.compareNumbers();
          },
          active: false
        },
        {
          text: (
            <p style={{ marginLeft: 90 }}>l[i], l[i + 1] = l[i + 1], l[i]</p>
          ),
          command: () => {
            this.swapNumbers();
          },
          active: false
        }
      ],
      queue: [0]
    };
  }

  constructor(props) {
    super(props);
    this.pause = false;
    this.tick = 1000;
    this.state = Object.assign({}, this.initialState());
  }

  updateQueue(item) {
    let { queue } = Object.assign({ queue: [] }, this.state);
    queue = queue.concat(item);
    this.setState({ queue });
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

  createRectangles() {
    this.stopClock();
    this.updateActiveProgram(-1);
    this.state = Object.assign({}, this.initialState());
    let { vars } = Object.assign({}, this.state);
    var nums = document.getElementById("nums").value.split(/\D+/);
    vars.numbers = [];
    d3.select("svg").remove();
    var svgContainer = d3
      .select("div.bubble")
      .append("svg")
      .attr("width", 600)
      .attr("height", 100);
    for (var i = 0; i < nums.length; i++) {
      vars.numbers.push([
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
  }

  checkSorted() {
    this.updateActiveProgram(0);
    let { vars } = Object.assign({}, this.state);
    if (this.state.vars.sorted) {
      this.updateQueue([1]);
      vars.sorted = false;
    } else {
      this.updateQueue([-1]);
      this.updateActiveProgram(-1);
    }
    vars.i = 0;
    this.setState({ vars });
  }

  checkForLoop() {
    this.updateActiveProgram(1);
    let { vars } = Object.assign({}, this.state);
    if (vars.i > 0) {
      this.fill(vars.numbers[vars.i - 1][0], "white");
      this.fill(vars.numbers[vars.i][0], "white");
    }
    if (vars.i < vars.numbers.length - 1) {
      this.updateQueue([2]);
    } else {
      vars.i = 0;
      this.updateQueue([0]);
    }
    this.setState({ vars });
  }

  compareNumbers() {
    this.updateActiveProgram(2);
    let { vars } = Object.assign({}, this.state);
    this.fill(vars.numbers[vars.i][0], "grey");
    this.fill(vars.numbers[vars.i + 1][0], "grey");
    if (
      Number(vars.numbers[vars.i][0].attr("number")) >
      Number(vars.numbers[vars.i + 1][0].attr("number"))
    ) {
      this.updateQueue([3]);
    } else {
      this.updateQueue([1]);
      vars.i++;
    }
    this.setState({ vars });
  }

  swapNumbers() {
    this.updateActiveProgram(3);
    let { vars } = Object.assign({}, this.state);
    this.swap(vars.numbers[vars.i][0], vars.numbers[vars.i + 1][0]);
    this.swap(vars.numbers[vars.i][1], vars.numbers[vars.i + 1][1]);
    var num1 = vars.numbers[vars.i][0];
    vars.numbers[vars.i][0] = vars.numbers[vars.i + 1][0];
    vars.numbers[vars.i + 1][0] = num1;
    var num2 = vars.numbers[vars.i][1];
    vars.numbers[vars.i][1] = vars.numbers[vars.i + 1][1];
    vars.numbers[vars.i + 1][1] = num2;
    vars.sorted = true;
    vars.i++;
    this.setState({ vars });
    this.updateQueue([1]);
  }

  swap(box1, box2) {
    box1
      .transition()
      .attr("x", box2.attr("x"))
      .duration(this.tick);

    box2
      .transition()
      .attr("x", box1.attr("x"))
      .duration(this.tick);
  }

  fill(box1, colour) {
    box1
      .transition()
      .style("fill", colour)
      .duration(this.tick / 2);
  }

  componentDidMount() {
    d3.select("svg").remove();
    var svgContainer = d3
      .select("div.bubble")
      .append("svg")
      .attr("width", 600)
      .attr("height", 100);
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
      <div className="content button-center">
        <h2>Try It Yourself</h2>
        <br />
        <form>
          Please enter up to 10 numbers to be sorted:
          <input type="text" id="nums" />
        </form>
        <div className="box">
          <div className="bubble" />
          <div className="text">
            {this.state.programState.map((line, i) => {
              return (
                <div
                  key={i}
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
            this.createRectangles();
          }}
        >
          <Glyphicon glyph="pencil" />
        </button>
        <button
          className="button"
          onClick={() => {
            this.startClock();
          }}
        >
          <Glyphicon glyph="play" />
        </button>
        <button
          className="button  "
          onClick={() => {
            this.stopClock();
          }}
        >
          <Glyphicon glyph="pause" />
        </button>
        <button
          className="button  "
          onClick={() => {
            this.slow();
          }}
        >
          <Glyphicon glyph="fast-backward" />
        </button>
        <button
          className="button  "
          onClick={() => {
            this.fast();
          }}
        >
          <Glyphicon glyph="fast-forward" />
        </button>
        <br />
      </div>
    );
  }
}

export default mapStateToProps(BubbleSortTutorial);
