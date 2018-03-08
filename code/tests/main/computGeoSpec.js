import React from "react";
import { shallow } from "enzyme";
import { renderIntoDocument } from "react-addons-test-utils";
import { findDOMNode } from "react-dom";

import { ComputGeometryHome } from "../../app/views/ComputationalGeometry/computGeometryHome";

describe("Convex Hull Home Page", () => {
  it("renders", () => {
    shallow(<ComputGeometryHome />);
  });

  describe("html page render", () => {
    let convex, node;
    beforeEach(() => {
      convex = renderIntoDocument(<ComputGeometryHome />);
      node = findDOMNode(convex);
    });

    it("About html page", () => {
      expect(node.textContent).toContain("Home");
    });
    it("Type html page", () => {
      expect(node.textContent).toContain("Type");
    });
  });
});
