import React from "react";
import { mount, shallow } from "enzyme";
import { renderIntoDocument } from "react-addons-test-utils";
import { findDOMNode } from "react-dom";

import { BubbleSortTutorial } from "../../app/views/Sorting/BubbleSort/BubbleSortTutorial";

describe("Bubble animation, ", () => {
  it("renders", () => {
    shallow(<BubbleSortTutorial />);
  });

  it("create button calls createRectangles", () => {
    const spy = spyOn(BubbleSortTutorial.prototype, "createRectangles");
    const wrapper = mount(<BubbleSortTutorial />);
    wrapper.find("#createButton").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("play button calls startClock", () => {
    const spy = spyOn(BubbleSortTutorial.prototype, "startClock");
    const wrapper = mount(<BubbleSortTutorial />);
    wrapper.find("#playButton").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("pause button calls stopClock", () => {
    const spy = spyOn(BubbleSortTutorial.prototype, "stopClock");
    const wrapper = mount(<BubbleSortTutorial />);
    wrapper.find("#pauseButton").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("slow button calls slow", () => {
    const spy = spyOn(BubbleSortTutorial.prototype, "slow");
    const wrapper = mount(<BubbleSortTutorial />);
    wrapper.find("#slowButton").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("fast button calls fast", () => {
    const spy = spyOn(BubbleSortTutorial.prototype, "fast");
    const wrapper = mount(<BubbleSortTutorial />);
    wrapper.find("#fastButton").simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});
