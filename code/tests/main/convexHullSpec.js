import React from "react";
import { mount, shallow } from "enzyme";
import { renderIntoDocument } from "react-addons-test-utils";
import { findDOMNode } from "react-dom";

import { ConvexTutorial } from "../../app/views/Divide&Conquer/ConvexHull/convexHullTutorial";
import { ConvexQ1 } from "../../app/views/Divide&Conquer/ConvexHull/ConvexHullQuestions/ConvexQ1";
import { ConvexQ2 } from "../../app/views/Divide&Conquer/ConvexHull/ConvexHullQuestions/ConvexQ2";
import { ConvexQ3 } from "../../app/views/Divide&Conquer/ConvexHull/ConvexHullQuestions/ConvexQ3";
import { ConvexQ4 } from "../../app/views/Divide&Conquer/ConvexHull/ConvexHullQuestions/ConvexQ4";

describe("Convex Hull Page, ", () => {
  it("renders", () => {
    shallow(<ConvexTutorial />);
  });

  describe("animation functions,", () => {
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

  describe("quiz functions, ", () => {
    describe("quiz1, ", () => {
      it("refresh button calls refresh", () => {
        const spy = spyOn(ConvexQ1.prototype, "refresh");
        const wrapper = mount(<ConvexQ1 />);
        wrapper.find("#refreshBtn").simulate("click");
        expect(spy).toHaveBeenCalled();
      });

      it("submit button calls refresh", () => {
        const spy = spyOn(ConvexQ1.prototype, "checkAnswer");
        const wrapper = mount(<ConvexQ1 />);
        wrapper.find("#submitBtn").simulate("click");
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("quiz2, ", () => {
      it("refresh button calls refresh", () => {
        const spy = spyOn(ConvexQ2.prototype, "refresh");
        const wrapper = mount(<ConvexQ2 />);
        wrapper.find("#refreshBtn").simulate("click");
        expect(spy).toHaveBeenCalled();
      });

      it("submit button calls refresh", () => {
        const spy = spyOn(ConvexQ2.prototype, "checkAnswer");
        const wrapper = mount(<ConvexQ2 />);
        wrapper.find("#submitBtn").simulate("click");
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("quiz3, ", () => {
      it("refresh button calls refresh", () => {
        const spy = spyOn(ConvexQ3.prototype, "refresh");
        const wrapper = mount(<ConvexQ3 />);
        wrapper.find("#refreshBtn").simulate("click");
        expect(spy).toHaveBeenCalled();
      });

      it("submit button calls refresh", () => {
        const spy = spyOn(ConvexQ3.prototype, "checkAnswer");
        const wrapper = mount(<ConvexQ3 />);
        wrapper.find("#submitBtn").simulate("click");
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("quiz4, ", () => {
      it("refresh button calls refresh", () => {
        const spy = spyOn(ConvexQ4.prototype, "refresh");
        const wrapper = mount(<ConvexQ4 />);
        wrapper.find("#refreshBtn").simulate("click");
        expect(spy).toHaveBeenCalled();
      });

      it("submit button calls refresh", () => {
        const spy = spyOn(ConvexQ4.prototype, "checkAnswer");
        const wrapper = mount(<ConvexQ4 />);
        wrapper.find("#submitBtn").simulate("click");
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
