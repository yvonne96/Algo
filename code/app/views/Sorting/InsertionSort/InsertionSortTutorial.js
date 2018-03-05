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

class InsertionSortTutorial extends Component {
  initialState() {
    return {
      vars: {
        i: 1,
        to_place: 0,
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
          .style("font-size", "34px")
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
    console.log(vars.pos);
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
      .select("div.insertion")
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

export default mapStateToProps(InsertionSortTutorial);
