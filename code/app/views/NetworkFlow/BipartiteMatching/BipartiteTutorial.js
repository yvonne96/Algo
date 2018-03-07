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
          .attr("r", 8)
          .attr("matched", false)
      );
    }
    for (var i = 0; i < 5; i++) {
      this.points.push(
        this.svgContainer
          .append("circle")
          .attr("cx", 670)
          .attr("cy", i * 80 + 50)
          .attr("r", 8)
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
      [2, 8],
      [3, 6],
      [3, 9],
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

  async findFlow() {
    this.found = false;
    for (var i = 0; i < 5; i++) {
      if (this.points[i].attr("matched") == "false") {
        this.tmppath = [];
        this.points[i].style("fill", "#42f44b");
        await delay(1000);
        var current = i;
        var path = [current];
        var seen = [];
        var added = false;
        while (path.length != 0) {
          added = false;
          var current = path[path.length - 1];
          for (var j = 0; j < this.network[current].length; j++) {
            var edge = this.network[current][j];
            if (
              current < 5 &&
              edge.attr("matched") == "false" &&
              !seen.includes(edge) &&
              !added
            ) {
              this.network[current][j].attr("matched", true);
              this.tmppath.push([current, j]);
              seen.push(edge);
              this.network[current][j].style("stroke", "#42f44b");
              await delay(1000);
              path.push(Number(edge.attr("v")));
              added = true;
            }
            if (
              current > 4 &&
              edge.attr("matched") == "true" &&
              !seen.includes(edge) &&
              !added
            ) {
              this.network[current][j].attr("matched", false);
              seen.push(edge);
              this.tmppath.push([current, j]);
              this.network[current][j].style("stroke", "black");
              await delay(1000);
              path.push(Number(edge.attr("u")));
              added = true;
            }
          }

          if (!added && path.length > 1) {
            current = this.tmppath[this.tmppath.length - 1][0];
            j = this.tmppath[this.tmppath.length - 1][1];
            if (this.network[current][j].attr("matched") == "true") {
              this.network[current][j].attr("matched", false);
              this.network[current][j].style("stroke", "black");
              await delay(1000);
            } else {
              this.network[current][j].attr("matched", true);
              this.network[current][j].attr("stroke", "#42f44b");
              await delay(1000);
            }
            this.tmppath.pop();
          }
          if (!added) {
            path.pop();
          }

          if (
            path.length % 2 == 0 &&
            this.points[path[path.length - 1]].attr("matched") == "false"
          ) {
            this.points[path[path.length - 1]].attr("matched", true);
            this.points[path[path.length - 1]].style("fill", "#42f44b");
            this.found = true;
            await delay(1000);
            path = [];
          }
        }
        if (!this.found) {
          this.points[i].style("fill", "black");
        }
      }
    }
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
          className="button refreshBtn"
          onClick={() => {
            this.refresh();
          }}
        >
          <Glyphicon glyph="refresh" />
        </button>
        <button
          id="playButton"
          className="button playBtn"
          onClick={() => {
            this.findFlow();
          }}
        >
          <Glyphicon glyph="play" />
        </button>
        <br />
      </div>
    );
  }
}

export default mapStateToProps(BipartiteTutorial);
