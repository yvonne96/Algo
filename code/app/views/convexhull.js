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

class ConvexHull extends Component {
    constructor(props) {
        super(props);
        this.pause = false;
        this.height = 300;
        this.width = 1200;
        this.svgContainer = [];
    }

    clockwise(p1, p2, p3) {
        let [x1, y1] = p1,
            [x2, y2] = p2,
            [x3, y3] = p3;
        if ((x2 - x1)*(y3 - y1) - (y2 - y1)*(x3 - x1) > 0) {
            return true;
        }
        return false;
    }

    placeLine(p1, p2, colour="black") {
        let [x1, y1] = p1,
            [x2, y2] = p2;
        return this.svgContainer.append("line")
            .attr("x1", x1)
            .attr("y1", this.height - y1)
            .attr("x2", x2)
            .attr("y2", this.height - y2)
            .attr("stroke", colour)
            .attr("stroke-width", 3);
    }

    async convexHull(nums) {
        nums.sort();
        var upperHull = [nums[1], nums[0]];
        var lowerHull = [nums[nums.length - 2], nums[nums.length - 1]];
        var lines = [];

        lines.push(this.placeLine(upperHull[0], upperHull[1]));
        for (var i = 2; i < nums.length; i++) {
            upperHull.unshift(nums[i]);
            lines.push(this.placeLine(upperHull[0], upperHull[1]));
            lines[lines.length - 1].attr("stroke", "#1ee51b");
            await delay(1000);
            lines[lines.length - 1].attr("stroke", "black");
            while ((upperHull.length > 2) && !(this.clockwise(upperHull[0], upperHull[1], upperHull[2]))) {
                upperHull.splice(1, 1);
                lines[lines.length - 1].attr("stroke", "red");
                lines[lines.length - 2].attr("stroke", "red");
                await delay(500);
                lines[lines.length-1].remove();
                lines.pop();
                await delay(500);
                lines[lines.length-1].remove();
                lines.pop();
                await delay(500);
                lines.push(this.placeLine(upperHull[0], upperHull[1]));
                lines[lines.length - 1].attr("stroke", "#1ee51b");
                await delay(1000);
                lines[lines.length - 1].attr("stroke", "black");
            }
        }
        lines = [];
        lines.push(this.placeLine(lowerHull[0], lowerHull[1]));
        for (var i = nums.length - 3; i >= 0; i--) {
            lowerHull.unshift(nums[i]);
            lines.push(this.placeLine(lowerHull[0], lowerHull[1]));
            lines[lines.length - 1].attr("stroke", "#1ee51b");
            await delay(1000);
            lines[lines.length - 1].attr("stroke", "black");
            while ((lowerHull.length > 2) && !(this.clockwise(lowerHull[0], lowerHull[1], lowerHull[2]))) {
                lowerHull.splice(1, 1);
                lines[lines.length - 1].attr("stroke", "red");
                lines[lines.length - 2].attr("stroke", "red");
                await delay(500);
                lines[lines.length-1].remove();
                lines.pop();
                await delay(500);
                lines[lines.length-1].remove();
                lines.pop();
                await delay(500);
                lines.push(this.placeLine(lowerHull[0], lowerHull[1]));
                lines[lines.length - 1].attr("stroke", "#1ee51b");
                await delay(1000);
                lines[lines.length - 1].attr("stroke", "black");
            }
        }

    }

    placePoints() {
        var nums = [[100, 20], [100, 200], [500, 200], [608, 120], [530, 135], [230, 150], [240, 170], [350, 80], [340, 170], [200, 30], [400, 45]];
        this.numbers = [];
        d3.select("svg").remove();
        this.svgContainer = d3.select("div.convex").append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
        for (var i = 0; i < nums.length; i++){
            this.numbers.push([this.svgContainer.append("circle")
                .attr("cx", nums[i][0])
                .attr("cy", this.height - nums[i][1])
                .attr("r", 5)]);
        }
        this.convexHull(nums);

    }

    render() {
        return (
            <div className = 'ConvexHull'>
                <div className="content button-center">
                    <div className="separator"></div>
                    <form>
                        Please enter up to 10 coordinates:
                        <input type="text" id="nums" />
                    </form>
                    <div className="separator"></div>
                    <div className="convex"></div>
                    <button className="button" onClick={() => {this.placePoints()}}>Place points</button>
                    <button className="button  " onClick={() => {this.pause = true}}>Pause</button>
                    <div className="separator"></div>
                </div>

            </div>
        );
    }
}

export default mapStateToProps(withRouter(ConvexHull));