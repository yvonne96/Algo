import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MenuItem, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

const mapStateToProps = connect(state => {
  return state;
});

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Header">
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">
                <span className="navBrandItem"> Algo</span>
              </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown eventKey={3} title="Sorting" id="basic-nav-dropdown">
              <MenuItem href="/sortingHome">Home</MenuItem>
              <MenuItem eventKey={3.1} href="/bubble">
                Bubble Sort
              </MenuItem>
              <MenuItem eventKey={3.2} href="/selection">
                Selection Sort
              </MenuItem>
              <MenuItem eventKey={3.2} href="/insertion">
                Insertion Sort
              </MenuItem>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="Computational Geometry" id="basic-nav-dropdown">
              <MenuItem href="/computGeometry">Home</MenuItem>
              <MenuItem eventKey={3.1} href="/convexhull">
                Convex Hull
              </MenuItem>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="Network Flow" id="basic-nav-dropdown">
              <MenuItem href="/networkflow">Home</MenuItem>
              <MenuItem eventKey={3.1} href="/bipartitematching">
                Bipartite Matching
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  postReducer: PropTypes.object,
  toggleOpen: PropTypes.func
};

export default mapStateToProps(withRouter(Header));
