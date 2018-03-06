import React from "react";

export function clockwise(p1, p2, p3) {
  let [x1, y1] = p1,
    [x2, y2] = p2,
    [x3, y3] = p3;
  if ((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) > 0) {
    return true;
  }
  return false;
}

export function placeLine(svg, p1, p2, height, colour = "black") {
  let [x1, y1] = p1,
    [x2, y2] = p2;
  svg
    .append("line")
    .attr("x1", x1)
    .attr("y1", height - y1)
    .attr("x2", x2)
    .attr("y2", height - y2)
    .attr("stroke", colour)
    .attr("stroke-width", 3);
}

export function placePoint(svg, nums, point, height) {
  let [x, y] = point;
  svg
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 5);
  nums.push([x, height - y]);
}

export function drawHull(svg, upperHull, lowerHull, height) {
  for (var i = 0; i < upperHull.length - 1; i++) {
    placeLine(svg, upperHull[i], upperHull[i + 1], height);
  }
  for (var i = 0; i < lowerHull.length - 1; i++) {
    placeLine(svg, lowerHull[i], lowerHull[i + 1], height);
  }
}

export function upperLowerHull(nums) {
  nums.sort((a, b) => a[0] - b[0]);
  var upperHull = [nums[1], nums[0]];
  var lowerHull = [nums[nums.length - 2], nums[nums.length - 1]];
  for (var i = 2; i < nums.length; i++) {
    upperHull.unshift(nums[i]);
    while (
      upperHull.length > 2 &&
      !clockwise(upperHull[0], upperHull[1], upperHull[2])
    ) {
      upperHull.splice(1, 1);
    }
  }
  for (var i = nums.length - 3; i >= 0; i--) {
    lowerHull.unshift(nums[i]);
    while (
      lowerHull.length > 2 &&
      !clockwise(lowerHull[0], lowerHull[1], lowerHull[2])
    ) {
      lowerHull.splice(1, 1);
    }
  }
  return [upperHull, lowerHull];
}

export function drawBorder(svg, height, width) {
  placeLine(svg, [0, 0], [0, height], height);
  placeLine(svg, [0, 0], [width, 0], height);
  placeLine(svg, [0, height], [width, height], height);
  placeLine(svg, [width, 0], [width, height], height);
}
