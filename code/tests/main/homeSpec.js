import React from "react";
import { mount, shallow } from "enzyme";
import { renderIntoDocument } from "react-addons-test-utils";
import { findDOMNode } from "react-dom";

import { Home } from "../../app/views/Home/index";

describe("Sorting Home Page", () => {
  it("renders", () => {
    shallow(<Home />);
  });

  describe("html page render", () => {
    let home, node;
    beforeEach(() => {
      home = renderIntoDocument(<Home />);
      node = findDOMNode(home);
    });

    it("About html page", () => {
      expect(node.textContent).toContain("Home");
    });

    it("AlgorithmImportance html page", () => {
      expect(node.textContent).toContain("Why are algorithms important?");
    });

    it("Features html page", () => {
      expect(node.textContent).toContain("Features");
    });
  });
});
