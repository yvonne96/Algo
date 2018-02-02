import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapStateToProps = connect(state => {
    return (state);
});

class BubbleSortHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = 'BubbleSortHome'>
                <div className="content">
                    <div className="separator"></div>
                    <div className='contain'>
                        <div className='col-md-4 col-md-offset-12 jumbotron'>
                            <h1>THis is bubble sort home page</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default mapStateToProps(withRouter(BubbleSortHome));