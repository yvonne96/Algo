import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
var d3 = require('d3');

const mapStateToProps = connect(state => {
    return (state);
});

let delay = (t) => {
    return new Promise((res, rej) => {
        setTimeout(res, t)
    })
};

class BubbleSortHome extends Component {
    constructor(props) {
        super(props);
        this.pause = false;
    }

    createRectangles() {
        var nums = document.getElementById('nums').value.split(/\D+/);
        this.numbers = [];
        d3.select("svg").remove();
        var svgContainer = d3.select("div.bubble").append("svg")
            .attr("width", 1200)
            .attr("height", 100);
        for (var i = 0; i < nums.length; i++){
            this.numbers.push([svgContainer.append("rect")
                .attr("width", 50)
                .attr("height", 50)
                .attr("x", (i*60) + 40)
                .attr("y", 0)
                .style("fill", "white")
                .style("stroke", "black")
                .attr("number", nums[i]),
                svgContainer.append("text")
                    .attr("x", (i*60) + 55)
                    .attr("y", 25)
                    .attr("dy", ".35em")
                    .style("font-size","34px")
                    .text(nums[i])]);
        }
        {this.bubbleSort()};
    }

    swap(box1, box2) {
        box1
            .transition()
            .attr("x", box2.attr("x"))
            .duration(1000);

        box2
            .transition()
            .attr("x", box1.attr("x"))
            .duration(1000);
    }

    fill(box1, colour) {
        box1
            .transition()
            .style("fill", colour)
            .duration(500);
    }

    async bubbleSort(){
        this.pause = true;
        var numbers = this.numbers
        var tmp = true;
        while (tmp) {
            tmp = false;
            for (var i = 0; i < numbers.length - 1; i++) {
                while (this.pause){
                    await delay(1000);}
                this.fill(numbers[i][0], "grey");
                this.fill(numbers[i + 1][0], "grey");
                await delay(500);
                if (Number(numbers[i][0].attr("number")) > Number(numbers[i + 1][0].attr("number"))) {
                    this.swap(numbers[i][0], numbers[i + 1][0]);
                    this.swap(numbers[i][1], numbers[i + 1][1]);
                    await delay(1000);
                    var num1 = numbers[i][0];
                    numbers[i][0] = numbers[i + 1][0];
                    numbers[i + 1][0] = num1;
                    var num2 = numbers[i][1];
                    numbers[i][1] = numbers[i + 1][1];
                    numbers[i + 1][1] = num2;
                    tmp = true;
                }
                this.fill(numbers[i][0], "white");
                this.fill(numbers[i + 1][0], "white");
                await delay(1000);
            }
        }
    }

    render() {
        return (
            <div className = 'BubbleSortHome'>
                <div className="content button-center">
                    <div className="separator"></div>
                    <form>
                        Please enter up to 10 numbers to be sorted:
                        <input type="text" id="nums" />
                    </form>
                    <div className="separator"></div>
                    <div className="bubble"></div>
                    <button className="button" onClick={() => {this.createRectangles()}}>Create List</button>
                    <button className="button" onClick={() => {this.pause = false}}>Sort</button>
                    <button className="button  " onClick={() => {this.pause = true}}>Pause</button>
                    <div className="separator"></div>
                </div>
                <div className="content">
                    <div className="separator"></div>
                    <div className='contain'>
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
                        </div>
                    </div>
                    <div className="content">
                        <div className="separator"></div>
                        <div className='contain'>
                            <h1>Quick Facts</h1>
                            <p><b>Class:</b> Sorting Algorithm</p>
                            <p><b>Worst Case Performance:</b>O(n<sup>2</sup>)</p>
                            <p><b>Best Case Performance:</b>O(n)</p>
                            <p><b>Average Case Performance:</b>O(n<sup>2</sup>)</p>
                        </div>
                    </div>
                <div className="content">
                    <div className="separator"></div>
                    <div className='contain'>
                            <h1>Step by Step Example</h1>
                            <p>Let us take the array of numbers "5 1 4 2 8",
                                and sort the array from lowest number to greatest number using bubble sort.
                                In each step, elements written in bold are being compared.
                                Three passes will be required.</p>
                            <p><b>First Pass:</b></p>
                            <p>( 5 1 4 2 8 ) -> ( 1 5 4 2 8 ),
                                Here, algorithm compares the first two elements, and swaps since 5 > 1.</p>
                            <p>( 1 5 4 2 8 ) -> ( 1 4 5 2 8 ), Swap since 5 > 4</p>
                            <p>( 1 4 5 2 8 ) -> ( 1 4 2 5 8 ), Swap since 5 > 2</p>
                            <p>( 1 4 2 5 8 ) -> ( 1 4 2 5 8 ),
                                Now, since these elements are already in order (8 > 5),
                                algorithm does not swap them.</p>
                            <p>( 1 4 2 5 8 ) -> ( 1 4 2 5 8 ),
                                Now, since these elements are already in order (8 > 5), algorithm does not swap them.</p>
                            <p><b>Second Pass:</b></p>
                            <p>( 1 4 2 5 8 ) ->  ( 1 4 2 5 8 )</p>
                            <p>( 1 4 2 5 8 ) ->  ( 1 2 4 5 8 ), Swap since 4 > 2</p>
                            <p>(1 2 4 5 8 ) ->  ( 1 2 4 5 8 )</p>
                            <p>Now, the array is already sorted, but the algorithm does not know if it is completed.
                                The algorithm needs one whole pass without any swap to know it is sorted.
                            </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default mapStateToProps(withRouter(BubbleSortHome));