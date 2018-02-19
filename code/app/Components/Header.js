import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MenuItem, Nav, Navbar, NavDropdown} from "react-bootstrap";
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
            <div className='Header'>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Algo</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavDropdown eventKey={3} title="Sorting" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} href="/bubble">Bubble Sort</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown eventKey={3} title="Convex Hull" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} href="/convexhull">Convex Hull</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown eventKey={3} title="Data-Structures" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Something</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown eventKey={3} title="Trees" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Binary Search Tree</MenuItem>
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
