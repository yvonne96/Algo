import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Col,Row} from "react-bootstrap";



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
                    <Row>
                        <Col md={{size:'6',offset:'1'}}>
                            <h1>About</h1>
                            <p>Bubble sort, sometimes referred to as sinking sort,
                                is a simple sorting algorithm that repeatedly steps
                                through the list to be sorted,
                                compares each pair of adjacent items and
                                swaps them if they are in the wrong order.
                                The pass through the list is repeated until no swaps are needed,
                                which indicates that the list is sorted.
                                The algorithm, which is a comparison sort,
                                is named for the way smaller or
                                larger elements "bubble" to the top of the list.
                                Although the algorithm is simple,
                                it is too slow and impractical for most problems even when
                                compared to insertion sort.
                                It can be practical if the input is usually in sorted order but
                                may occasionally have some out-of-order elements nearly in position.
                            </p>
                        </Col>
                        <Col md={{size:'4',offset:'1'}}>
                            <h1>Quick Facts</h1>
                            <p><b>Class:</b> Sorting Algorithm</p>
                            <p><b>Worst Case Performance:</b>O(n<sup>2</sup>)</p>
                            <p><b>Best Case Performance:</b>O(n)</p>
                            <p><b>Average Case Performance:</b>O(n<sup>2</sup>)</p>
                        </Col>

                {/*<h1>Step by Step Example</h1>*/}
                {/*<button><Link to='/bubble/bubbleDemo'>Bubble Sort Demo</Link></button>*/}
                {/*<p>Let us take the array of numbers "5 1 4 2 8",*/}
                    {/*and sort the array from lowest number to greatest number using bubble sort.*/}
                    {/*In each step, elements written in bold are being compared.*/}
                    {/*Three passes will be required.</p>*/}
                {/*<p><b>First Pass:</b></p>*/}
                {/*<p>( 5 1 4 2 8 ) -> ( 1 5 4 2 8 ),*/}
                    {/*Here, algorithm compares the first two elements, and swaps since 5 > 1.</p>*/}
                {/*<p>( 1 5 4 2 8 ) -> ( 1 4 5 2 8 ), Swap since 5 > 4</p>*/}
                {/*<p>( 1 4 5 2 8 ) -> ( 1 4 2 5 8 ), Swap since 5 > 2</p>*/}
                {/*<p>( 1 4 2 5 8 ) -> ( 1 4 2 5 8 ),*/}
                    {/*Now, since these elements are already in order (8 > 5),*/}
                    {/*algorithm does not swap them.</p>*/}
                {/*<p>( 1 4 2 5 8 ) -> ( 1 4 2 5 8 ),*/}
                    {/*Now, since these elements are already in order (8 > 5), algorithm does not swap them.</p>*/}
                {/*<p><b>Second Pass:</b></p>*/}
                {/*<p>( 1 4 2 5 8 ) ->  ( 1 4 2 5 8 )</p>*/}
                {/*<p>( 1 4 2 5 8 ) ->  ( 1 2 4 5 8 ), Swap since 4 > 2</p>*/}
                {/*<p>(1 2 4 5 8 ) ->  ( 1 2 4 5 8 )</p>*/}
                {/*<p>Now, the array is already sorted, but the algorithm does not know if it is completed.*/}
                    {/*The algorithm needs one whole pass without any swap to know it is sorted.*/}
                {/*</p>*/}
                </Row>
            </div>

        );
    }
}

export default mapStateToProps(withRouter(BubbleSortHome));