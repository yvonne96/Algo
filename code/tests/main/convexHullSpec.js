import React from "react";
import { mount, shallow } from "enzyme";
import { renderIntoDocument } from "react-addons-test-utils";
import { findDOMNode } from "react-dom";

import { ConvexTutorial } from "../../app/views/Divide&Conquer/ConvexHull/convexHullTutorial";

describe("Convex Hull Page, ", () => {
  it("renders", () => {
    shallow(<ConvexTutorial />);
  });

  it("check that refresh button calls refresh()", () => {
    const spy = spyOn(ConvexTutorial.prototype, "refresh");
    const wrapper = mount(<ConvexTutorial />);
    wrapper.find("#refreshButton").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("check that startClock button calls startClock()", () => {
    const spy = spyOn(ConvexTutorial.prototype, "startClock");
    const wrapper = mount(<ConvexTutorial />);
    wrapper.find("#playButton").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("check that stopClock button calls stopClock()", () => {
    const spy = spyOn(ConvexTutorial.prototype, "stopClock");
    const wrapper = mount(<ConvexTutorial />);
    wrapper.find("#pauseButton").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("check that fast button calls fast()", () => {
    const spy = spyOn(ConvexTutorial.prototype, "fast");
    const wrapper = mount(<ConvexTutorial />);
    wrapper.find("#fastButton").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("check that slow button calls slow()", () => {
    const spy = spyOn(ConvexTutorial.prototype, "slow");
    const wrapper = mount(<ConvexTutorial />);
    wrapper.find("#slowButton").simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});
