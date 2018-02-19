import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Col, Grid, Row} from "react-bootstrap";
var ReactDOM = require('react-dom')
//import d3 from 'd3';
//import ReactFauxDOM from 'react-faux-dom'

const mapStateToProps = connect(state => {
    return (state);
});

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = 'Home'>
                <Grid>
                    <Row className='show-grid'>
                        <Col>
                            <div className="content">
                            <h1>About</h1>
                            <p>Our aim is to help you understand algorithms and how they work.</p>
                            <p>We have interactive demos of some algorithms such as:</p>
                            <ul className='list'>
                                <li>Binary Search Tree</li>
                                <li>Bubble Sort</li>
                                <li>Dijkstra's Algorithm etc.</li>
                            </ul>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default mapStateToProps(withRouter(Home));