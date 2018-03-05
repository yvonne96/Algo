import React from "react";
import { mount, shallow } from "enzyme";
import { renderIntoDocument } from "react-addons-test-utils";
import { findDOMNode } from "react-dom";

import { SelectionSortTutorial } from "../../app/views/Sorting/SelectionSort/SelectionSortTutorial";

describe("Selection Sort animation, ", () => {
  it("renders", () => {
    shallow(<SelectionSortTutorial />);
  });
  it("create button calls createRectangles", () => {
    const spy = spyOn(SelectionSortTutorial.prototype, "createRectangles");
    const wrapper = mount(<SelectionSortTutorial />);
    wrapper.find("#createBtn").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("play button calls startClock", () => {
    const spy = spyOn(SelectionSortTutorial.prototype, "startClock");
    const wrapper = mount(<SelectionSortTutorial />);
    wrapper.find("#playBtn").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("pause button calls stopClock", () => {
    const spy = spyOn(SelectionSortTutorial.prototype, "stopClock");
    const wrapper = mount(<SelectionSortTutorial />);
    wrapper.find("#pauseBtn").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("slow button calls slow", () => {
    const spy = spyOn(SelectionSortTutorial.prototype, "slow");
    const wrapper = mount(<SelectionSortTutorial />);
    wrapper.find("#slowBtn").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("fast button calls fast", () => {
    const spy = spyOn(SelectionSortTutorial.prototype, "fast");
    const wrapper = mount(<SelectionSortTutorial />);
    wrapper.find("#fastBtn").simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});
