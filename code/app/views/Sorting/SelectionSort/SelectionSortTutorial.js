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

export class SelectionSortTutorial extends Component {
  initialState() {
    return {
      vars: {
        i: 0,
        j: 1,
        numbers: [],
        min_found: -1
      },
      programState: [
        {
          text: <p>for i in range(len(l)):</p>,
          command: () => {
            this.checkForLoopi();
          },
          active: false
        },
        {
          text: <p style={{ marginLeft: 30 }}>min_found = i</p>,
          command: () => {
            this.updateMin(1, "i");
          },
          active: false
        },
        {
          text: <p style={{ marginLeft: 30 }}>for j in range(i+1, len(l)):</p>,
          command: () => {
            this.checkForLoopj();
          },
          active: false
        },
        {
          text: <p style={{ marginLeft: 60 }}>if l[j] &lt; l[min_found]:</p>,
          command: () => {
            this.compareMin();
          },
          active: false
        },
        {
          text: <p style={{ marginLeft: 90 }}>min_found = j</p>,
          command: () => {
            this.updateMin(4, "j");
          },
          active: false
        },
        {
          text: (
            <p style={{ marginLeft: 30 }}>
              l[min_found], l[i] = l[i], l[min_found]
            </p>
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
    this.tick = 1000;
    this.width = 500;
    this.height = 100;
    this.state = Object.assign({}, this.initialState());
    this.createRectangles = this.createRectangles.bind(this);
    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.slow = this.slow.bind(this);
    this.fast = this.fast.bind(this);
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
    this.state = Object.assign({}, this.initialState());
    this.updateActiveProgram(-1);
    let { vars } = Object.assign({}, this.state);
    var nums = document.getElementById("nums").value.split(/\D+/);
    vars.numbers = [];
    d3.select("svg").remove();
    var svgContainer = d3
      .select("div.selection")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
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

  checkForLoopi() {
    this.updateActiveProgram(0);
    let { vars } = Object.assign({}, this.state);
    if (vars.i > 0) {
      this.fill(vars.numbers[vars.i - 1][0], "white");
    }
    if (vars.i < vars.numbers.length) {
      this.updateQueue([1]);
    } else {
      this.updateQueue([-1]);
      this.updateActiveProgram(-1);
    }
    vars.j = vars.i + 1;
    this.setState({ vars });
  }

  checkForLoopj() {
    this.updateActiveProgram(2);
    let { vars } = Object.assign({}, this.state);
    if (vars.j - 1 != vars.min_found) {
      this.fill(vars.numbers[vars.j - 1][0], "white");
    }
    if (vars.j < vars.numbers.length) {
      this.fill(vars.numbers[vars.j][0], "grey");
      this.updateQueue([3]);
    } else {
      this.updateQueue([5]);
    }
    this.setState({ vars });
  }

  updateMin(active, ij) {
    this.updateActiveProgram(active);
    let { vars } = Object.assign({}, this.state);
    if (vars.min_found > -1) {
      this.fill(vars.numbers[vars.min_found][0], "white");
    }
    if (ij == "i") {
      vars.min_found = vars.i;
    } else {
      vars.min_found = vars.j - 1;
    }
    this.fill(vars.numbers[vars.min_found][0], "red");
    this.updateQueue([2]);
  }

  compareMin() {
    this.updateActiveProgram(3);
    let { vars } = Object.assign({}, this.state);
    if (
      Number(vars.numbers[vars.j][0].attr("number")) <
      Number(vars.numbers[vars.min_found][0].attr("number"))
    ) {
      this.updateQueue([4]);
    } else {
      this.updateQueue([2]);
    }
    vars.j++;
    this.setState({ vars });
  }

  swapNumbers() {
    this.updateActiveProgram(5);
    let { vars } = Object.assign({}, this.state);
    this.swap(vars.numbers[vars.i][0], vars.numbers[vars.min_found][0]);
    this.swap(vars.numbers[vars.i][1], vars.numbers[vars.min_found][1]);
    var num1 = vars.numbers[vars.i][0];
    vars.numbers[vars.i][0] = vars.numbers[vars.min_found][0];
    vars.numbers[vars.min_found][0] = num1;
    var num2 = vars.numbers[vars.i][1];
    vars.numbers[vars.i][1] = vars.numbers[vars.min_found][1];
    vars.numbers[vars.min_found][1] = num2;
    vars.i++;
    this.setState({ vars });
    this.updateQueue([0]);
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
      .select("div.selection")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
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
          <div className="selection" />
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
          id="createBtn"
          className="button createBtn"
          onClick={() => {
            this.createRectangles();
          }}
        >
          <Glyphicon glyph="pencil" />
        </button>
        <button
          id="playBtn"
          className="button playBtn"
          onClick={() => {
            this.startClock();
          }}
        >
          <Glyphicon glyph="play" />
        </button>
        <button
          id="pauseBtn"
          className="button pauseBtn"
          onClick={() => {
            this.stopClock();
          }}
        >
          <Glyphicon glyph="pause" />
        </button>
        <button
          id="slowBtn"
          className="button fastSlowBtn"
          onClick={() => {
            this.slow();
          }}
        >
          <Glyphicon glyph="fast-backward" />
        </button>
        <button
          id="fastBtn"
          className="button fastSlowBtn"
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

export default mapStateToProps(SelectionSortTutorial);
