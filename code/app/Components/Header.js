import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";

const mapStateToProps = connect(state => {
  return state;
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="Header">
        <nav>
          <ul>
            <li>
              <Link to="/">Algo</Link>
            </li>
            <li>
              <Link to="/bubble">Sorting</Link>
            </li>
            <li>
              <Link to="/convexhull">Convex Hull</Link>
            </li>
            <li>
              <Link to="/binarySearchTree">Trees</Link>
            </li>
            <li>
              <Link to="/bfs">Graph</Link>
            </li>
            <li>
              <Link to="/something">Data Structures</Link>
            </li>
          </ul>
        </nav>
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
