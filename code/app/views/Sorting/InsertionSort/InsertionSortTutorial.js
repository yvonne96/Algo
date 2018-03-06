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

export class InsertionSortTutorial extends Component {
  initialState() {
    return {
      vars: {
        i: 1,
        to_place: -1,
        pos: 0,
        numbers: []
      },
      programState: [
        {
          text: <p>for i in range(1, len(l)):</p>,
          command: () => {
            this.checkForLoop();
          },
          active: false
        },
        {
          text: <p style={{ marginLeft: 30 }}>to_place = l[i]</p>,
          command: () => {
            this.updateToPlace();
          },
          active: false
        },
        {
          text: <p style={{ marginLeft: 30 }}>pos = i - 1</p>,
          command: () => {
            this.updatePos();
          },
          active: false
        },
        {
          text: (
            <p style={{ marginLeft: 30 }}>
              while 0 &lt;= pos and l[pos] > to_place:
            </p>
          ),
          command: () => {
            this.checkWhileLoop();
          },
          active: false
        },
        {
          text: <p style={{ marginLeft: 60 }}>l[pos + 1] = l[pos]</p>,
          command: () => {
            this.updateList();
          },
          active: false
        },
        {
          text: <p style={{ marginLeft: 60 }}>pos -= 1</p>,
          command: () => {
            this.decreasePos();
          },
          active: false
        },
        {
          text: <p style={{ marginLeft: 30 }}>l[pos + 1] = to_place</p>,
          command: () => {
            this.fillPos();
          },
          active: false
        },
        {
          command: () => {
            this.moveLeft();
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
    this.width = 600;
    this.height = 100;
    this.wrongInput = false;
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
    this.state = Object.assign({}, this.initialState());
    this.updateActiveProgram(-1);
    let { vars } = Object.assign({}, this.state);
    var nums = document
      .getElementById("nums")
      .value.trim()
      .split(/\D+/);
    this.wrongInput = false;
    for (var i = 0; i < nums.length; i++) {
      if (nums[i].length > 2 || i > 7 || nums[i] == "") {
        this.wrongInput = true;
        this.forceUpdate();
        return;
      }
    }
    vars.numbers = [];
    d3.select("svg").remove();
    var svgContainer = d3
      .select("div.insertion")
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
          .style("font-size", "25px")
          .text(nums[i])
      ]);
    }
  }

  moveRight() {
    let { vars } = Object.assign({}, this.state);
    for (var i = vars.i; i < vars.numbers.length; i++) {
      vars.numbers[i][0]
        .transition()
        .attr("x", Number(vars.numbers[i][0].attr("x")) + 60)
        .duration(this.tick);
      vars.numbers[i][1]
        .transition()
        .attr("x", Number(vars.numbers[i][1].attr("x")) + 60)
        .duration(this.tick);
    }
    this.setState({ vars });
  }

  moveLeft() {
    this.updateActiveProgram(6);
    let { vars } = Object.assign({}, this.state);
    this.fill(vars.numbers[vars.pos + 1][0], "white");
    for (var i = vars.to_place + 1; i < vars.numbers.length; i++) {
      vars.numbers[i][0]
        .transition()
        .attr("x", Number(vars.numbers[i][0].attr("x")) - 60)
        .duration(this.tick);
      vars.numbers[i][1]
        .transition()
        .attr("x", Number(vars.numbers[i][1].attr("x")) - 60)
        .duration(this.tick);
    }
    this.updateQueue([0]);
    this.setState({ vars });
  }

  checkForLoop() {
    this.updateActiveProgram(0);
    let { vars } = Object.assign({}, this.state);
    if (vars.i < vars.numbers.length) {
      this.updateQueue([1]);
      this.moveRight();
    } else {
      this.updateQueue([-1]);
      this.updateActiveProgram(-1);
    }
    this.setState({ vars });
  }

  updateToPlace() {
    this.updateActiveProgram(1);
    let { vars } = Object.assign({}, this.state);
    this.fill(vars.numbers[vars.i][0], "red");
    vars.to_place = vars.i;
    this.setState({ vars });
    this.updateQueue([2]);
  }

  updatePos() {
    this.updateActiveProgram(2);
    let { vars } = Object.assign({}, this.state);
    vars.pos = vars.i - 1;
    vars.i++;
    this.setState({ vars });
    this.updateQueue([3]);
  }

  checkWhileLoop() {
    this.updateActiveProgram(3);
    let { vars } = Object.assign({}, this.state);

    if (
      0 <= vars.pos &&
      Number(vars.numbers[vars.pos][0].attr("number")) >
        Number(vars.numbers[vars.to_place][0].attr("number"))
    ) {
      this.updateQueue([4]);
    } else {
      this.updateQueue([6]);
    }
  }

  updateList() {
    this.updateActiveProgram(4);
    let { vars } = Object.assign({}, this.state);
    vars.numbers[vars.pos][0]
      .transition()
      .attr("x", Number(vars.numbers[vars.pos][0].attr("x")) + 60)
      .duration(this.tick);
    vars.numbers[vars.pos][1]
      .transition()
      .attr("x", Number(vars.numbers[vars.pos][1].attr("x")) + 60)
      .duration(this.tick);
    this.setState({ vars });
    this.updateQueue([5]);
  }

  decreasePos() {
    this.updateActiveProgram(5);
    let { vars } = Object.assign({}, this.state);
    vars.pos--;
    this.setState({ vars });
    this.updateQueue([3]);
  }

  fillPos() {
    this.updateActiveProgram(6);
    let { vars } = Object.assign({}, this.state);
    vars.numbers.splice(vars.pos + 1, 0, vars.numbers[vars.to_place]);
    vars.numbers.splice(vars.to_place + 1, 1);
    vars.numbers[vars.pos + 1][0]
      .transition()
      .attr("x", (vars.pos + 1) * 60 + 40)
      .duration(this.tick);
    vars.numbers[vars.pos + 1][1]
      .transition()
      .attr("x", (vars.pos + 1) * 60 + 55)
      .duration(this.tick);
    this.updateQueue([7]);
    this.setState({ vars });
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
      .select("div.insertion")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
  }

  startClock() {
    this.stopClock();
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
        {this.wrongInput && (
          <p style={{ color: "red" }}>Please enter valid input</p>
        )}
        <form>
          Please enter up to 8 numbers between 1 and 99:
          <input type="text" id="nums" />
        </form>
        <div className="box">
          <div className="insertion" />
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

export default mapStateToProps(InsertionSortTutorial);
