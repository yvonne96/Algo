import React from "react";
import { mount, shallow } from "enzyme";

import { InsertionSortTutorial } from "../../app/views/Sorting/InsertionSort/InsertionSortTutorial";

describe("Insertion Sort animation, ", () => {
  it("renders", () => {
    shallow(<InsertionSortTutorial />);
  });

  it("play button calls startClock and createRectangles", () => {
    const createSpy = spyOn(
      InsertionSortTutorial.prototype,
      "createRectangles"
    );
    const startSpy = spyOn(InsertionSortTutorial.prototype, "startClock");
    const wrapper = mount(<InsertionSortTutorial />);
    wrapper.find("#playBtn").simulate("click");
    expect(createSpy).toHaveBeenCalled();
    expect(startSpy).toHaveBeenCalled();
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
