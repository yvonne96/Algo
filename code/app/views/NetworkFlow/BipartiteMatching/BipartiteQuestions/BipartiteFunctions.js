import React from "react";

export function placePoints(svg) {
  var points = [];
  for (var i = 0; i < 5; i++) {
    points.push(
      svg
        .append("circle")
        .attr("cx", 420)
        .attr("cy", i * 80 + 50)
        .attr("r", 8)
        .attr("matched", false)
    );
  }
  for (var i = 0; i < 5; i++) {
    points.push(
      svg
        .append("circle")
        .attr("cx", 670)
        .attr("cy", i * 80 + 50)
        .attr("r", 8)
        .attr("matched", false)
    );
  }
  return points;
}

export function placeEdges(points, edges, svg) {
  for (var i = 0; i < edges.length; i++) {
    var x1 = points[edges[i][0]].attr("cx");
    var y1 = points[edges[i][0]].attr("cy");
    var x2 = points[edges[i][1]].attr("cx");
    var y2 = points[edges[i][1]].attr("cy");
    var tmp = svg
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
  }
}
