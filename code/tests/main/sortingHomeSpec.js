import React from "react";
//import Page from "react-page-object";
import { mount, shallow } from "enzyme";
import TestUtils from "react-addons-test-utils";
import { renderIntoDocument } from "react-addons-test-utils";
import { findDOMNode } from "react-dom";

import { SortingHome } from "../../app/views/Sorting/Sorting-home";

describe("Sorting Home Page", () => {
  it("renders", () => {
    shallow(<SortingHome />);
  });
  describe("html page's renders", () => {
    let sorting, node;
    beforeEach(() => {
      sorting = renderIntoDocument(<SortingHome />);
      node = findDOMNode(sorting);
    });

    it("About html page", () => {
      expect(node.textContent).toContain("Comparing Similar Algorithm's");
    });

    it("AlgorithmImportance html page", () => {
      expect(node.textContent).toContain("Sorting Home");
    });

    it("Features html page", () => {
      expect(node.textContent).toContain("Types of Sorting Algorithms");
    });
  });
});
