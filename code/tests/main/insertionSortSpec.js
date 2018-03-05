import React from "react";
import { mount, shallow } from "enzyme";

import { InsertionSortTutorial } from "../../app/views/Sorting/InsertionSort/InsertionSortTutorial";

describe("Insertion Sort animation, ", () => {
  it("renders", () => {
    shallow(<InsertionSortTutorial />);
  });

  it("create button calls createRectangles", () => {
    const spy = spyOn(InsertionSortTutorial.prototype, "createRectangles");
    const wrapper = mount(<InsertionSortTutorial />);
    wrapper.find("#createBtn").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("play button calls startClock", () => {
    const spy = spyOn(InsertionSortTutorial.prototype, "startClock");
    const wrapper = mount(<InsertionSortTutorial />);
    wrapper.find("#playBtn").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("pause button calls stopClock", () => {
    const spy = spyOn(InsertionSortTutorial.prototype, "stopClock");
    const wrapper = mount(<InsertionSortTutorial />);
    wrapper.find("#pauseBtn").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("slow button calls slow", () => {
    const spy = spyOn(InsertionSortTutorial.prototype, "slow");
    const wrapper = mount(<InsertionSortTutorial />);
    wrapper.find("#slowBtn").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("fast button calls fast", () => {
    const spy = spyOn(InsertionSortTutorial.prototype, "fast");
    const wrapper = mount(<InsertionSortTutorial />);
    wrapper.find("#fastBtn").simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});
