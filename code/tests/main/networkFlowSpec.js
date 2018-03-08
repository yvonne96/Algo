import React from "react";
import { shallow } from "enzyme";
import { renderIntoDocument } from "react-addons-test-utils";
import { findDOMNode } from "react-dom";

import { NetworkFlowHome } from "../../app/views/NetworkFlow/networkFlowHome";

describe("Network Flow Home Page", () => {
  it("renders", () => {
    shallow(<NetworkFlowHome />);
  });

  describe("html page render", () => {
    let home, node;
    beforeEach(() => {
      home = renderIntoDocument(<NetworkFlowHome />);
      node = findDOMNode(home);
    });

    it("About html page", () => {
      expect(node.textContent).toContain("Home");
    });

    it("Type html page", () => {
      expect(node.textContent).toContain("Types");
    });
  });
});
