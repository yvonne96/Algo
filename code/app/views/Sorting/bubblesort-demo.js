import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';



const mapStateToProps = connect(state => {
    return (state);
});

class BubbleSortDemo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = 'BubbleSortDemo'>
                <div className="content">
                    <div className="separator"></div>
                    <div className='contain'>
                        <div className='col-md-4 jumbotron'>
                            <h1>Animation</h1>
                            <p>animation goes here</p>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="separator"></div>
                    <div className='contain'>
                        <div className='col-md-4 jumbotron'>
                            <h1>New Session:</h1>
                            <p><b>Input:</b><input type='text'/></p>
                            <button>Run</button>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="separator"></div>
                    <div className='contain'>
                        <div className='col-md-4 jumbotron'>
                            <h1>Current Session:</h1>
                            <p><b>Input:</b> [1,4,9,3,2]</p>
                            <p><b>Output:</b>[1,2,3,4,9]</p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default mapStateToProps(withRouter(BubbleSortDemo));