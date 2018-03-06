import React, { Component } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
import Glyphicon from "react-bootstrap/es/Glyphicon";

let delay = t => {
  return new Promise((res, rej) => {
    setTimeout(res, t);
  });
};

const mapStateToProps = connect(state => {
  return state;
});

export class BipartiteTutorial extends Component {
  constructor(props) {
    super(props);
    this.edges = [];
    this.points = [];
    this.found = false;
    this.seen = [];
    this.tmppath = [];
    this.network = {};
    this.height = 400;
    this.width = 1000;
    this.tick = 1000;
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.tick = 1000;
    d3.select("#Tutorial").remove();
    this.svgContainer = d3
      .select("div.bipartite")
      .append("svg")
      .attr("id", "Tutorial")
      .attr("width", this.width)
      .attr("height", this.height);
    this.placePoints();
    this.placeEdges();
  }

  placePoints() {
    for (var i = 0; i < 5; i++) {
      this.points.push(
        this.svgContainer
          .append("circle")
          .attr("cx", 420)
          .attr("cy", i * 80 + 50)
          .attr("r", 5)
          .attr("matched", false)
      );
    }
    for (var i = 0; i < 5; i++) {
      this.points.push(
        this.svgContainer
          .append("circle")
          .attr("cx", 620)
          .attr("cy", i * 80 + 50)
          .attr("r", 5)
          .attr("matched", false)
      );
    }
  }

  placeEdges() {
    var edges = [
      [0, 5],
      [0, 7],
      [1, 5],
      [2, 6],
      [2, 7],
      [3, 6],
      [3, 9],
      [4, 8],
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
      var tmp = this.svgContainer
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

  async findPath(current) {
    if (this.found) {
      return;
    }
    if (current > 4 && this.points[current].attr("matched") == "false") {
      this.points[current].attr("matched", true);
      this.points[current].style("fill", "#42f44b");
      this.found = true;
      await delay(1000);
      return;
    }

    for (var i = 0; i < this.network[current].length; i++) {
      var edge = this.network[current][i];
      if (this.found) {
        return;
      }

      if (
        current < 5 &&
        edge.attr("matched") == "false" &&
        !this.seen.includes(edge)
      ) {
        this.network[current][i].attr("matched", true);
        this.tmppath.push(edge);
        this.seen.push(edge);
        this.network[current][i].style("stroke", "#42f44b");
        await delay(1000);
        this.findPath(Number(edge.attr("v")));
        await delay(2000);
      }
      if (
        current > 4 &&
        edge.attr("matched") == "true" &&
        !this.seen.includes(edge)
      ) {
        this.network[current][i].attr("matched", false);
        this.seen.push(edge);
        this.tmppath.push(edge);
        this.network[current][i].style("stroke", "black");
        await delay(1000);
        this.findPath(Number(edge.attr("u")));
        await delay(2000);
      }
      if (!this.found && this.tmppath.length > 0) {
        if (this.tmppath[this.tmppath.length - 1].attr("matched") == "true") {
          this.tmppath[this.tmppath.length - 1].attr("matched", false);
          this.tmppath[this.tmppath.length - 1].style("stroke", "black");
          await delay(1000);
        } else {
          this.tmppath[this.tmppath.length - 1].attr("matched", true);
          this.tmppath[this.tmppath.length - 1].attr("matched", "#42f44b");
          await delay(1000);
        }
        this.tmppath.pop();
      }
    }
  }

  async findFlow() {
    this.found = false;
    for (var i = 0; i < 5; i++) {
      if (this.points[i].attr("matched") == "false") {
        this.seen = [];
        this.tmppath = [];
        this.points[i].style("fill", "#42f44b");
        await delay(1000);
        this.findPath(i);
        await delay(10000);
        if (this.found) {
          this.points[i].attr("matched", true);
          break;
        } else {
          this.points[i].style("fill", "black");
        }
      }
    }
    if (this.found) {
      this.findFlow();
    }
  }

  colourPoint(point) {
    point.style("fill", "#42f44b");
  }

  colourEdge(edge) {
    if (edge.attr("matched") == "true") {
      edge.attr("matched", false);
      edge.style("stroke", "black");
    } else {
      edge.attr("matched", true);
      edge.style("stroke", "#42f44b");
    }
  }

  async drawFlow() {
    this.colourPoint(this.points[0]);
    await delay(1000);
    this.colourEdge(this.network[0][0]);
    await delay(1000);
    this.colourPoint(this.points[5]);
    await delay(1000);
    this.colourPoint(this.points[1]);
    await delay(1000);
    this.colourEdge(this.network[1][0]);
    await delay(1000);
    this.colourEdge(this.network[0][0]);
    await delay(1000);
    this.colourEdge(this.network[0][1]);
    await delay(1000);
    this.colourPoint(this.points[7]);
    await delay(1000);
    this.colourPoint(this.points[2]);
    await delay(1000);
    this.colourEdge(this.network[2][0]);
    await delay(1000);
    this.colourPoint(this.points[6]);
    await delay(1000);
    this.colourPoint(this.points[3]);
    await delay(1000);
    this.colourEdge(this.network[3][0]);
    await delay(1000);
    this.colourEdge(this.network[2][0]);
    await delay(1000);
    this.colourEdge(this.network[2][1]);
    await delay(1000);
    this.colourEdge(this.network[0][1]);
    await delay(1000);
    this.colourEdge(this.network[0][0]);
    await delay(1000);
    this.colourEdge(this.network[1][0]);
    await delay(1000);
    this.colourEdge(this.network[1][0]);
    await delay(1000);
    this.colourEdge(this.network[0][0]);
    await delay(1000);
    this.colourEdge(this.network[0][1]);
    await delay(1000);
    this.colourEdge(this.network[2][1]);
    await delay(1000);
    this.colourEdge(this.network[2][0]);
    await delay(1000);
    this.colourEdge(this.network[3][0]);
    await delay(1000);
    this.colourEdge(this.network[3][1]);
    await delay(1000);
    this.colourPoint(this.points[9]);
    await delay(1000);
    this.colourPoint(this.points[4]);
    await delay(1000);
    this.colourEdge(this.network[4][0]);
    await delay(1000);
    this.colourPoint(this.points[8]);
    await delay(1000);
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
        <br />
        <h2>Try it Yourself</h2>
        <br />
        <div className="box">
          <div className="bipartite" />
        </div>
        <br />
        <button
          id="refreshButton"
          className="button"
          onClick={() => {
            this.refresh();
          }}
        >
          <Glyphicon glyph="refresh" />
        </button>
        <button
          id="playButton"
          className="button"
          onClick={() => {
            this.drawFlow();
          }}
        >
          <Glyphicon glyph="play" />
        </button>
        <button
          id="pauseButton"
          className="button  "
          onClick={() => {
            this.stopClock();
          }}
        >
          <Glyphicon glyph="pause" />
        </button>
        <button
          id="slowButton"
          className="button  "
          onClick={() => {
            this.slow();
          }}
        >
          <Glyphicon glyph="fast-backward" />
        </button>
        <button
          id="fastButton"
          className="button"
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

export default mapStateToProps(BipartiteTutorial);
