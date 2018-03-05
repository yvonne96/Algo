import React from "react";
import { mount, shallow } from "enzyme";
import { renderIntoDocument } from "react-addons-test-utils";
import { findDOMNode } from "react-dom";

import { DivideConquerHome } from "../../app/views/Divide&Conquer/divideConquerHome";

describe("Convex Hull Home Page", () => {
  it("renders", () => {
    shallow(<DivideConquerHome />);
  });

  describe("html page render", () => {
    let convex, node;
    beforeEach(() => {
      convex = renderIntoDocument(<DivideConquerHome />);
      node = findDOMNode(convex);
    });

    it("About html page", () => {
      expect(node.textContent).toContain("Home");
    });
  });
});
