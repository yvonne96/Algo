import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

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
                <div className="content">
                    <div className="separator"></div>
                        <div className='contain'>
                        <div className='jumbotron'>
                            <h1>About</h1>
                            <p>Our aim is to help you understand algorithms and how they work.</p>
                            <p>We have interactive demos of some algorithms such as:</p>
                            <ul className='list'>
                                <li>Binary Search Tree</li>
                                <li>Bubble Sort</li>
                                <li>Dijkstra's Algorithm etc.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default mapStateToProps(withRouter(Home));